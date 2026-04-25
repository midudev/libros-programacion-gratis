#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const defaultOptions = {
  concurrency: 8,
  dist: 'dist/client',
  report: null,
  retries: 1,
  timeout: 12_000,
};

const nonNavigableRelations = new Set(['dns-prefetch', 'preconnect']);
const retryableStatuses = new Set([429, 503, 504]);
const transientNetworkErrors = new Set([
  'EAI_AGAIN',
  'ECONNRESET',
  'ETIMEDOUT',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_SOCKET',
  'timeout',
]);

function parseArgs(argv) {
  const options = { ...defaultOptions };

  for (const arg of argv) {
    if (arg === '--') {
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    const [name, value] = arg.split('=');

    if (name === '--concurrency' && value) {
      options.concurrency = Number(value);
      continue;
    }

    if (name === '--dist' && value) {
      options.dist = value;
      continue;
    }

    if (name === '--report' && value) {
      options.report = value;
      continue;
    }

    if (name === '--retries' && value) {
      options.retries = Number(value);
      continue;
    }

    if (name === '--timeout' && value) {
      options.timeout = Number(value);
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isInteger(options.concurrency) || options.concurrency < 1) {
    throw new Error('--concurrency must be a positive integer');
  }

  if (!Number.isInteger(options.retries) || options.retries < 0) {
    throw new Error('--retries must be a non-negative integer');
  }

  if (!Number.isInteger(options.timeout) || options.timeout < 1_000) {
    throw new Error('--timeout must be at least 1000 ms');
  }

  return options;
}

function printHelp() {
  console.log(`Usage: node ./scripts/check-links.mjs [options]

Options:
  --dist=<path>          Directory with the built client files. Default: dist/client
  --report=<path>        Write a JSON report for CI automation.
  --retries=<count>      Retries for transient external failures. Default: 1
  --timeout=<ms>         HTTP timeout per request. Default: 12000
  --concurrency=<count>  External link checks in parallel. Default: 8
`);
}

function walkHtmlFiles(rootDir) {
  const files = [];

  function walk(currentDir) {
    for (const name of readdirSync(currentDir)) {
      const path = join(currentDir, name);
      const stats = statSync(path);

      if (stats.isDirectory()) {
        walk(path);
      } else if (path.endsWith('.html')) {
        files.push(path);
      }
    }
  }

  walk(rootDir);
  return files;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&#x26;/gi, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getLineNumber(content, index) {
  let line = 1;

  for (let cursor = 0; cursor < index; cursor += 1) {
    if (content.charCodeAt(cursor) === 10) {
      line += 1;
    }
  }

  return line;
}

function parseAttributes(rawAttributes = '') {
  const attributes = new Map();
  const attributePattern = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>`=]+))/g;
  let match;

  while ((match = attributePattern.exec(rawAttributes))) {
    attributes.set(match[1].toLowerCase(), decodeHtmlEntities(match[2] ?? match[3] ?? match[4] ?? ''));
  }

  return attributes;
}

function extractLinks(htmlFile, rootDir) {
  const html = readFileSync(htmlFile, 'utf8');
  const source = relative(rootDir, htmlFile);
  const links = [];
  const tagPattern = /<([a-z][\w:-]*)(\s[^<>]*?)?>/gi;
  let match;

  while ((match = tagPattern.exec(html))) {
    const tagName = match[1].toLowerCase();
    const attributes = parseAttributes(match[2]);
    const rel = new Set((attributes.get('rel') ?? '').toLowerCase().split(/\s+/).filter(Boolean));
    const line = getLineNumber(html, match.index);

    for (const attr of ['href', 'src', 'poster']) {
      const value = attributes.get(attr);

      if (!value) {
        continue;
      }

      links.push({
        attr,
        line,
        rel: [...rel],
        source,
        tag: tagName,
        url: value.trim(),
      });
    }

    const srcset = attributes.get('srcset');

    if (srcset) {
      for (const candidate of srcset.split(',')) {
        const [url] = candidate.trim().split(/\s+/);

        if (url) {
          links.push({
            attr: 'srcset',
            line,
            rel: [...rel],
            source,
            tag: tagName,
            url,
          });
        }
      }
    }
  }

  return links;
}

function isSkippableUrl(url) {
  return /^(data:|mailto:|tel:|javascript:|blob:)/i.test(url);
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url) || url.startsWith('//');
}

function normalizeExternalUrl(url) {
  return url.startsWith('//') ? `https:${url}` : url;
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function findLocalTarget(rootDir, pathname) {
  const decodedPath = safeDecodeURIComponent(pathname).replace(/\/+/g, '/');
  const withoutLeadingSlash = decodedPath.replace(/^\//, '');
  const candidates = [];

  if (decodedPath === '/' || decodedPath === '') {
    candidates.push(join(rootDir, 'index.html'));
  } else {
    candidates.push(join(rootDir, withoutLeadingSlash));
    candidates.push(join(rootDir, withoutLeadingSlash, 'index.html'));

    if (!withoutLeadingSlash.endsWith('/')) {
      candidates.push(join(rootDir, `${withoutLeadingSlash}.html`));
    }
  }

  for (const candidate of candidates) {
    if (!existsSync(candidate)) {
      continue;
    }

    const stats = statSync(candidate);

    if (stats.isDirectory()) {
      const indexFile = join(candidate, 'index.html');

      if (existsSync(indexFile)) {
        return { exists: true, path: indexFile, type: 'html' };
      }
    }

    if (stats.isFile()) {
      return {
        exists: true,
        path: candidate,
        type: candidate.endsWith('.html') ? 'html' : 'asset',
      };
    }
  }

  return { exists: false, path: candidates[0], type: null };
}

function getIds(htmlFile) {
  const html = readFileSync(htmlFile, 'utf8');
  const ids = new Set();
  const idPattern = /\sid\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
  let match;

  while ((match = idPattern.exec(html))) {
    ids.add(decodeHtmlEntities(match[1] ?? match[2] ?? match[3] ?? ''));
  }

  return ids;
}

function resolveInternalLink(link, rootDir) {
  const base = new URL(link.source, 'https://local.test/');
  const resolved = new URL(link.url, base);
  const target = findLocalTarget(rootDir, resolved.pathname);

  if (!target.exists) {
    return {
      ...link,
      ok: false,
      reason: 'missing-local-target',
      resolvedPath: resolved.pathname,
      type: 'internal',
    };
  }

  if (resolved.hash && target.type === 'html') {
    const fragment = safeDecodeURIComponent(resolved.hash.slice(1));
    const ids = getIds(target.path);

    if (!ids.has(fragment)) {
      return {
        ...link,
        ok: false,
        reason: 'missing-fragment',
        resolvedPath: resolved.pathname,
        target: relative(rootDir, target.path),
        type: 'internal',
      };
    }
  }

  return {
    ...link,
    ok: true,
    resolvedPath: resolved.pathname,
    target: relative(rootDir, target.path),
    type: 'internal',
  };
}

function isRetryableResult(result) {
  return retryableStatuses.has(result.status) || Boolean(result.error && transientNetworkErrors.has(result.error));
}

async function requestOnce(url, method, timeout) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      headers: {
        accept: method === 'HEAD' ? '*/*' : 'text/html,application/pdf,*/*;q=0.8',
        'user-agent': 'Mozilla/5.0 (compatible; librosgratis.dev link checker; +https://librosgratis.dev)',
        ...(method === 'GET' ? { range: 'bytes=0-1023' } : {}),
      },
      method,
      redirect: 'follow',
      signal: controller.signal,
    });

    return {
      finalUrl: response.url,
      ok: response.status >= 200 && response.status < 400,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      error: error.name === 'AbortError' ? 'timeout' : (error.cause?.code ?? error.code ?? error.message),
      ok: false,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function requestUrl(url, method, options) {
  let result;

  for (let attempt = 0; attempt <= options.retries; attempt += 1) {
    result = await requestOnce(url, method, options.timeout);

    if (!isRetryableResult(result) || attempt === options.retries) {
      return {
        ...result,
        attempts: attempt + 1,
      };
    }
  }

  return result;
}

function getSoftExternalFailure(result, url) {
  const hostname = new URL(url).hostname.toLowerCase();

  if (result.status === 429) {
    return 'external-rate-limited';
  }

  if (result.status === 403 && (hostname === 'nytimes.com' || hostname === 'www.nytimes.com')) {
    return 'external-bot-blocked';
  }

  if (hostname === 'web.archive.org' && result.error && transientNetworkErrors.has(result.error)) {
    return 'external-transient-network';
  }

  return null;
}

async function checkExternalLink(link, options) {
  const url = normalizeExternalUrl(link.url);
  const head = await requestUrl(url, 'HEAD', options);

  if (head.ok) {
    return {
      ...link,
      ...head,
      checkedUrl: url,
      method: 'HEAD',
      type: 'external',
    };
  }

  const get = await requestUrl(url, 'GET', options);
  const result = {
    ...link,
    ...get,
    checkedUrl: url,
    headAttempts: head.attempts,
    headError: head.error,
    headStatus: head.status,
    method: 'GET',
    type: 'external',
  };
  const softReason = getSoftExternalFailure(result, url);

  if (softReason) {
    return {
      ...result,
      ok: true,
      reason: softReason,
      warning: true,
    };
  }

  return result;
}

async function checkExternalLinks(links, options) {
  const results = [];
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < links.length) {
      const link = links[currentIndex];
      currentIndex += 1;
      results.push(await checkExternalLink(link, options));
    }
  }

  await Promise.all(Array.from({ length: Math.min(options.concurrency, links.length) }, worker));
  return results;
}

function dedupeLinks(links) {
  const seen = new Set();
  const unique = [];

  for (const link of links) {
    const key = [
      link.url,
      link.source,
      link.line,
      link.tag,
      link.attr,
      link.rel.join(' '),
    ].join('|');

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(link);
    }
  }

  return unique;
}

function formatBrokenLink(link) {
  const location = `${link.source}:${link.line}`;
  const status = link.status ? `${link.status} ${link.statusText ?? ''}`.trim() : link.error;
  return `- ${link.url} (${link.reason ?? status}) at ${location}`;
}

function formatWarningLink(link) {
  const location = `${link.source}:${link.line}`;
  return `- ${link.url} (${link.reason}) at ${location}`;
}

function writeReport(report, reportPath) {
  if (!reportPath) {
    return;
  }

  const absolutePath = resolve(reportPath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(report, null, 2)}\n`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const rootDir = resolve(options.dist);

  if (!existsSync(rootDir)) {
    throw new Error(`Build output not found: ${rootDir}. Run pnpm build first.`);
  }

  const htmlFiles = walkHtmlFiles(rootDir);
  const links = dedupeLinks(htmlFiles.flatMap((file) => extractLinks(file, rootDir)));
  const skippedLinks = links.filter((link) => {
    if (isSkippableUrl(link.url)) {
      return true;
    }

    return link.rel.some((rel) => nonNavigableRelations.has(rel)) && isExternalUrl(link.url);
  });
  const checkableLinks = links.filter((link) => !skippedLinks.includes(link));
  const internalLinks = checkableLinks.filter((link) => !isExternalUrl(link.url));
  const externalLinks = checkableLinks.filter((link) => isExternalUrl(link.url));
  const internalResults = internalLinks.map((link) => resolveInternalLink(link, rootDir));
  const externalResults = await checkExternalLinks(externalLinks, options);
  const results = [...internalResults, ...externalResults].sort((a, b) => {
    if (a.source !== b.source) {
      return a.source.localeCompare(b.source);
    }

    return a.line - b.line;
  });
  const brokenLinks = results.filter((result) => !result.ok);
  const warningLinks = results.filter((result) => result.warning);
  const report = {
    generatedAt: new Date().toISOString(),
    rootDir,
    summary: {
      broken: brokenLinks.length,
      checkedExternal: externalResults.length,
      checkedInternal: internalResults.length,
      htmlFiles: htmlFiles.length,
      skipped: skippedLinks.length,
      totalLinks: links.length,
      warnings: warningLinks.length,
    },
    brokenLinks,
    warningLinks,
  };

  writeReport(report, options.report);

  if (warningLinks.length > 0) {
    console.warn(`Found ${warningLinks.length} link warning(s):`);

    for (const link of warningLinks.slice(0, 30)) {
      console.warn(formatWarningLink(link));
    }

    if (warningLinks.length > 30) {
      console.warn(`...and ${warningLinks.length - 30} more.`);
    }
  }

  if (brokenLinks.length > 0) {
    console.error(`Found ${brokenLinks.length} broken link(s):`);

    for (const link of brokenLinks.slice(0, 30)) {
      console.error(formatBrokenLink(link));
    }

    if (brokenLinks.length > 30) {
      console.error(`...and ${brokenLinks.length - 30} more.`);
    }

    process.exitCode = 1;
    return;
  }

  console.log(
    `No broken links found. Checked ${internalResults.length} internal and ${externalResults.length} external link(s). Skipped ${skippedLinks.length} non-navigable link hint(s).`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
