// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// Fuentes autoalojadas: woff2 variables, subset latin y ejes recortados a los pesos que usa el diseño.
const fontsDir = './src/assets/fonts';

// https://astro.build/config
export default defineConfig({
  site: 'https://librosgratis.dev',
  adapter: cloudflare(),
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { src: [`${fontsDir}/newsreader-latin-opsz-wght.woff2`], weight: '400 600', style: 'normal', display: 'swap' },
          { src: [`${fontsDir}/newsreader-latin-opsz-wght-italic.woff2`], weight: '400 500', style: 'italic', display: 'swap' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-geist',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [{ src: [`${fontsDir}/geist-latin-wght.woff2`], weight: '400 600', style: 'normal', display: 'swap' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [{ src: [`${fontsDir}/geist-mono-latin-wght.woff2`], weight: '400 500', style: 'normal', display: 'swap' }],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
