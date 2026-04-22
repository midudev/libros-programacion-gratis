import { spawn } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputPath = path.join(
	webRoot,
	'public/books/97-cosas-que-todo-programador-deberia-saber.pdf',
);
const sourcePath = '/97-cosas-programador/imprimir/';
const preferredPort = Number(process.env.PDF_DEV_PORT ?? 4325);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getAvailablePort = (port) =>
	new Promise((resolve, reject) => {
		const server = net.createServer();

		server.once('error', (error) => {
			if (error.code === 'EADDRINUSE') {
				resolve(getAvailablePort(port + 1));
				return;
			}

			reject(error);
		});

		server.once('listening', () => {
			const address = server.address();
			server.close(() => {
				resolve(typeof address === 'object' && address ? address.port : port);
			});
		});

		server.listen(port, '127.0.0.1');
	});

const findChrome = () => {
	const candidates = [
		process.env.CHROME_BIN,
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser',
	].filter(Boolean);

	const chrome = candidates.find((candidate) => existsSync(candidate));

	if (!chrome) {
		throw new Error('No se encontró Chrome o Chromium. Define CHROME_BIN para generar el PDF.');
	}

	return chrome;
};

const waitForPage = async (url) => {
	for (let attempt = 0; attempt < 90; attempt += 1) {
		try {
			const response = await fetch(url);

			if (response.ok) {
				return;
			}
		} catch {
			// Astro puede tardar unos segundos en arrancar.
		}

		await delay(500);
	}

	throw new Error(`La página imprimible no respondió a tiempo: ${url}`);
};

const run = (command, args, options = {}) =>
	new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			stdio: 'inherit',
			...options,
		});

		child.once('error', reject);
		child.once('exit', (code) => {
			if (code === 0) {
				resolve();
				return;
			}

			reject(new Error(`${command} terminó con código ${code}`));
		});
	});

const port = await getAvailablePort(preferredPort);
const sourceUrl = `http://127.0.0.1:${port}${sourcePath}`;
const chrome = findChrome();

await mkdir(path.dirname(outputPath), { recursive: true });

const devServer = spawn('pnpm', ['exec', 'astro', 'dev', '--host', '127.0.0.1', '--port', String(port)], {
	cwd: webRoot,
	stdio: 'inherit',
});

try {
	await waitForPage(sourceUrl);

	await run(chrome, [
		'--headless=new',
		'--disable-gpu',
		'--no-sandbox',
		'--no-pdf-header-footer',
		'--print-to-pdf-no-header',
		'--run-all-compositor-stages-before-draw',
		'--virtual-time-budget=10000',
		`--print-to-pdf=${outputPath}`,
		sourceUrl,
	]);

	const size = statSync(outputPath).size;

	if (size < 100_000) {
		throw new Error(`El PDF generado parece demasiado pequeño (${size} bytes).`);
	}

	console.log(`PDF generado: ${outputPath}`);
} finally {
	devServer.kill('SIGTERM');
}
