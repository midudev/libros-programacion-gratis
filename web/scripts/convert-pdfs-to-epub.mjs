import { spawn } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const booksDir = path.join(webRoot, 'public/books');
const manifestPath = path.join(webRoot, 'src/data/epubManifest.json');

const MAX_EPUB_BYTES = 20 * 1024 * 1024;

const findBinary = () => {
	const candidates = [
		process.env.EBOOK_CONVERT_BIN,
		'/opt/homebrew/bin/ebook-convert',
		'/usr/local/bin/ebook-convert',
		'/Applications/calibre.app/Contents/MacOS/ebook-convert',
		'ebook-convert',
	].filter(Boolean);

	for (const candidate of candidates) {
		if (candidate === 'ebook-convert') return candidate;
		if (existsSync(candidate)) return candidate;
	}

	throw new Error(
		'No se encontró `ebook-convert`. Instala Calibre (`brew install --cask calibre`) o define EBOOK_CONVERT_BIN.',
	);
};

const run = (command, args, { timeoutMs } = {}) =>
	new Promise((resolve, reject) => {
		const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'inherit'] });
		let timer;

		if (timeoutMs) {
			timer = setTimeout(() => {
				child.kill('SIGKILL');
				reject(new Error(`timeout tras ${Math.round(timeoutMs / 1000)}s`));
			}, timeoutMs);
		}

		child.once('error', (error) => {
			if (timer) clearTimeout(timer);
			reject(error);
		});
		child.once('exit', (code, signal) => {
			if (timer) clearTimeout(timer);
			if (signal === 'SIGKILL') return;
			if (code === 0) resolve();
			else reject(new Error(`${command} terminó con código ${code}`));
		});
	});

const formatBytes = (bytes) => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const selected = process.argv.slice(2);
const force = selected.includes('--force');
const onlySpecific = selected.filter((arg) => !arg.startsWith('--'));

const binary = findBinary();
const allFiles = await readdir(booksDir);
const pdfFiles = allFiles
	.filter((file) => file.toLowerCase().endsWith('.pdf'))
	.filter((file) => onlySpecific.length === 0 || onlySpecific.includes(file))
	.sort();

console.log(`Encontrados ${pdfFiles.length} PDF en ${booksDir}`);

let converted = 0;
let skipped = 0;
let failed = 0;

for (const [index, pdfFile] of pdfFiles.entries()) {
	const pdfPath = path.join(booksDir, pdfFile);
	const epubFile = pdfFile.replace(/\.pdf$/i, '.epub');
	const epubPath = path.join(booksDir, epubFile);
	const progress = `[${index + 1}/${pdfFiles.length}]`;

	if (!force && existsSync(epubPath)) {
		console.log(`${progress} SKIP ${epubFile} (ya existe)`);
		skipped += 1;
		continue;
	}

	const pdfSize = statSync(pdfPath).size;
	console.log(`${progress} Convirtiendo ${pdfFile} (${formatBytes(pdfSize)})...`);

	const baseArgs = [
		pdfPath,
		epubPath,
		'--no-default-epub-cover',
		'--preserve-cover-aspect-ratio',
		'--language', 'es',
		'--output-profile', 'tablet',
		'--disable-font-rescaling',
		'--epub-max-image-size', '1280x1600',
	];

	const convertWith = (args, timeoutMs) => run(binary, [...baseArgs, ...args], { timeoutMs });

	try {
		try {
			await convertWith([], 8 * 60 * 1000);
		} catch (error) {
			console.warn(`${progress} retry sin im\u00e1genes (${error.message})`);
			if (existsSync(epubPath)) await unlink(epubPath);
			await convertWith(['--no-images'], 8 * 60 * 1000);
		}

		if (!existsSync(epubPath)) {
			throw new Error('La conversi\u00f3n termin\u00f3 sin generar el EPUB esperado.');
		}

		let epubSize = statSync(epubPath).size;

		if (epubSize > MAX_EPUB_BYTES) {
			console.warn(
				`${progress} EPUB demasiado grande (${formatBytes(epubSize)}); regenerando sin im\u00e1genes`,
			);
			await unlink(epubPath);
			await convertWith(['--no-images'], 8 * 60 * 1000);

			if (!existsSync(epubPath)) {
				throw new Error('La conversi\u00f3n sin im\u00e1genes no gener\u00f3 el EPUB esperado.');
			}

			epubSize = statSync(epubPath).size;
		}

		console.log(`${progress} OK   ${epubFile} (${formatBytes(epubSize)})`);
		converted += 1;
	} catch (error) {
		console.error(`${progress} FAIL ${epubFile}: ${error.message}`);
		failed += 1;
	}
}

console.log('');
console.log(`Resumen: ${converted} convertidos · ${skipped} omitidos · ${failed} fallidos`);

const manifestFiles = (await readdir(booksDir))
	.filter((file) => file.toLowerCase().endsWith('.epub'))
	.sort();

await writeFile(
	manifestPath,
	`${JSON.stringify(manifestFiles, null, 2)}\n`,
	'utf8',
);

console.log(`Manifiesto actualizado: ${manifestPath} (${manifestFiles.length} EPUB)`);

if (failed > 0) {
	process.exitCode = 1;
}
