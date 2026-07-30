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
      '# Páginas utilitarias (noindex): no gastar presupuesto de rastreo',
      'Disallow: /descargar/',
      'Disallow: /97-cosas-programador/imprimir/',
      '',
      '# Bots de IA (opcional: permitir indexación de conocimiento)',
      'User-agent: GPTBot',
      'Allow: /',
      '',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      `Sitemap: ${sitemapUrl.toString()}`,
      `Host: ${new URL(origin).host}`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    },
  );
};
