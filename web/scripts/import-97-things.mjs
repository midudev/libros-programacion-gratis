import { writeFile } from 'node:fs/promises';

const indexUrl = 'https://97cosas.com/programador/';
const originalIndexUrl =
  'https://web.archive.org/web/20150107185650/http://programmer.97things.oreilly.com/wiki/index.php/Contributions_Appearing_in_the_Book';
const originalLicenseUrl = 'https://creativecommons.org/licenses/by/3.0/';
const outputPath = new URL('../src/data/programmer97Things.ts', import.meta.url);

const decodeEntities = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

const stripTags = (value) =>
  decodeEntities(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());

const truncateAtWord = (value, maxLength = 170) => {
  const text = stripTags(value);

  if (text.length <= maxLength) return text;

  const clipped = text.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(' ');

  return `${clipped.slice(0, Math.max(lastSpace, 90)).trim()}...`;
};

const normalizeHtml = (html, pageUrl, localAdvicePaths) =>
  html
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/\shref="([^"]+)"/g, (_, href) => {
      const absoluteHref = new URL(decodeEntities(href), pageUrl).toString();
      const localHref = localAdvicePaths.get(absoluteHref);

      if (localHref) {
        return ` href="${localHref}"`;
      }

      const isHttp = /^https?:\/\//.test(absoluteHref);
      const safeAttrs = isHttp ? ' target="_blank" rel="nofollow noreferrer"' : '';

      return ` href="${absoluteHref}"${safeAttrs}`;
    })
    .replace(/\ssrc="([^"]+)"/g, (_, src) => ` src="${new URL(decodeEntities(src), pageUrl).toString()}"`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const fetchText = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
};

const parseIndex = (html) => {
  const itemPattern = /<li><a href="([^"]+)">([\s\S]*?)<\/a>, por ([\s\S]*?)<\/li>/g;

  return [...html.matchAll(itemPattern)].map((match, index) => ({
    number: index + 1,
    slug: match[1].replace(/\.html$/, ''),
    sourcePath: match[1],
    title: stripTags(match[2]),
    author: stripTags(match[3]),
  }));
};

const parseAdvicePage = (html, pageUrl, localAdvicePaths) => {
  const headingPattern = /<h2>([\s\S]*?)<br>\s*<small>Autor:\s*([\s\S]*?)<\/small><\/h2>/;
  const heading = html.match(headingPattern);

  if (!heading?.index) {
    throw new Error(`Could not find advice heading in ${pageUrl}`);
  }

  const translationStart = html.indexOf('<p>\nTraducción:', heading.index);

  if (translationStart === -1) {
    throw new Error(`Could not find translator marker in ${pageUrl}`);
  }

  const rawContent = html.slice(heading.index + heading[0].length, translationStart);
  const rest = html.slice(translationStart);
  const translator = rest.match(/<p>\s*Traducción:\s*([^<]+?)\s*<\/p>/)?.[1]?.trim();
  const originalHref = rest.match(/<a href="([^"]+)">Leer contribución original<\/a>/)?.[1];

  return {
    title: stripTags(heading[1]),
    author: stripTags(heading[2]),
    translator: translator ? stripTags(translator) : undefined,
    originalHref: originalHref ? decodeEntities(originalHref) : undefined,
    contentHtml: normalizeHtml(rawContent, pageUrl, localAdvicePaths),
    excerpt: truncateAtWord(rawContent),
  };
};

const toTypeScript = (advices) => `export type ProgrammerAdvice = {
  number: number;
  slug: string;
  title: string;
  author: string;
  translator?: string;
  originalUrl?: string;
  excerpt: string;
  contentHtml: string;
};

export const programmer97ThingsMeta = {
  title: '97 cosas que todo programador debería saber',
  shortTitle: '97 cosas que todo programador debe saber',
  editor: 'Kevlin Henney',
  originalSourceUrl: ${JSON.stringify(originalIndexUrl)},
  originalLicenseNotice: 'This work is licensed under a Creative Commons Attribution 3',
  originalLicenseName: 'Creative Commons Attribution 3.0',
  originalLicenseUrl: ${JSON.stringify(originalLicenseUrl)},
} as const;

export const programmer97ThingsAdvice: ProgrammerAdvice[] = ${JSON.stringify(advices, null, 2)};

export const getProgrammerAdvice = (slug: string) =>
  programmer97ThingsAdvice.find((advice) => advice.slug === slug);
`;

const indexHtml = await fetchText(indexUrl);
const indexEntries = parseIndex(indexHtml);

if (indexEntries.length !== 97) {
  throw new Error(`Expected 97 advice pages, found ${indexEntries.length}`);
}

const advices = [];
const localAdvicePaths = new Map(
  indexEntries.map((entry) => [
    new URL(entry.sourcePath, indexUrl).toString(),
    `/97-cosas-programador/${entry.slug}/`,
  ]),
);

for (const entry of indexEntries) {
  const pageUrl = new URL(entry.sourcePath, indexUrl).toString();
  const html = await fetchText(pageUrl);
  const page = parseAdvicePage(html, pageUrl, localAdvicePaths);

  advices.push({
    number: entry.number,
    slug: entry.slug,
    title: page.title || entry.title,
    author: page.author || entry.author,
    ...(page.translator && { translator: page.translator }),
    ...(page.originalHref && { originalUrl: page.originalHref }),
    excerpt: page.excerpt,
    contentHtml: page.contentHtml,
  });
}

await writeFile(outputPath, toTypeScript(advices));

console.log(`Imported ${advices.length} translated advice pages to ${outputPath.pathname}`);
