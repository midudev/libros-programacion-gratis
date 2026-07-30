import type { APIRoute } from 'astro';
import { localPdfBooks } from '../data/library';
import { programmer97ThingsAdvice } from '../data/programmer97Things';
import { sectionPageEntries, siteConfig } from '../data/seo';

export const prerender = true;

type SitemapUrl = {
  loc: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod?: string;
};

const lastmod = siteConfig.contentLastModified;

const urls: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  ...sectionPageEntries.map((entry) => ({
    loc: `/libros/${entry.pathSlug}/`,
    changefreq: 'weekly' as const,
    priority: entry.section.group === 'Lenguajes' ? '0.9' : '0.8',
  })),
  ...localPdfBooks.map((book) => ({
    loc: book.readerPath,
    changefreq: 'monthly' as const,
    priority: '0.75',
  })),
  {
    loc: '/97-cosas-programador/',
    changefreq: 'monthly',
    priority: '0.85',
  },
  ...programmer97ThingsAdvice.map((advice) => ({
    loc: `/97-cosas-programador/${advice.slug}/`,
    changefreq: 'yearly' as const,
    priority: '0.65',
  })),
  {
    loc: '/contribuir/',
    changefreq: 'monthly',
    priority: '0.4',
  },
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const renderUrl = (url: SitemapUrl, origin: string) => {
  const loc = new URL(url.loc, origin).toString();
  const modified = url.lastmod ?? lastmod;

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${modified}</lastmod>`,
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
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
