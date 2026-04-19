import type { APIRoute } from 'astro';
import { siteConfig } from '../data/seo';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString() ?? `${siteConfig.url}/`;
  const sitemapUrl = new URL('/sitemap.xml', origin);

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${sitemapUrl.toString()}`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
};
