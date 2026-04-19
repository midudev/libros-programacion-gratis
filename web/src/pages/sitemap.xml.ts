import type { APIRoute } from 'astro';
import { sectionPageEntries, siteConfig } from '../data/seo';

export const prerender = true;

const lastmod = '2026-04-19';

const urls = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  ...sectionPageEntries.map((entry) => ({
    loc: `/libros/${entry.pathSlug}/`,
    changefreq: 'weekly',
    priority: entry.section.group === 'Lenguajes' ? '0.9' : '0.8',
  })),
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const renderUrl = (url: (typeof urls)[number], origin: string) => {
  const loc = new URL(url.loc, origin).toString();

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${url.changefreq}</changefreq>`,
    `    <priority>${url.priority}</priority>`,
    '  </url>',
  ].join('\n');
};

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString() ?? `${siteConfig.url}/`;
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => renderUrl(url, origin)),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
