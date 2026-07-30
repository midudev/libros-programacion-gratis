const tablerIcon = (paths: string, stroke = '%23777') =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${stroke}' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E${paths}%3C/svg%3E`;

const sectionLogos: Record<string, string | string[]> = {
  generales: tablerIcon(
    "%3Cpath d='M7 8l-4 4l4 4'/%3E%3Cpath d='M17 8l4 4l-4 4'/%3E%3Cpath d='M14 4l-4 16'/%3E",
  ),
  algoritmos: tablerIcon(
    "%3Cpath d='M5 4h4v4h-4z'/%3E%3Cpath d='M15 4h4v4h-4z'/%3E%3Cpath d='M5 16h4v4h-4z'/%3E%3Cpath d='M15 16h4v4h-4z'/%3E%3Cpath d='M9 6h6'/%3E%3Cpath d='M7 8v8'/%3E%3Cpath d='M17 8v8'/%3E%3Cpath d='M9 18h6'/%3E",
  ),
  'html-css': ['/logos/html.svg', '/logos/css.svg'],
  javascript: '/logos/javascript.svg',
  typescript: '/logos/typescript.svg',
  python: '/logos/python.svg',
  ruby: '/logos/ruby.svg',
  rust: '/logos/rust.svg',
  blockchain: '/logos/bitcoin.svg',
  php: '/logos/php.svg',
  haskell: '/logos/haskell.svg',
  golang: '/logos/golang.svg',
  kotlin: '/logos/kotlin.svg',
  android: '/logos/android.svg',
  c: '/logos/c.svg',
  cplusplus: '/logos/cplusplus.svg',
  csharp: '/logos/csharp.svg',
  java: '/logos/java.svg',
  r: '/logos/r.svg',
  react: '/logos/react.svg',
  qwik: '/logos/qwik.svg',
  nodejs: '/logos/nodejs.svg',
  angular: '/logos/angular.svg',
  django: '/logos/django.svg',
  git: '/logos/git.svg',
  docker: '/logos/docker.svg',
  linux: '/logos/linux.svg',
  sql: '/logos/sql.svg',
  nosql: ['/logos/mongodb.svg', '/logos/redis.svg'],
  'sistemas-operativos': tablerIcon(
    "%3Cpath d='M4 5h16v10h-16z'/%3E%3Cpath d='M8 21h8'/%3E%3Cpath d='M12 15v6'/%3E",
  ),
  ia: tablerIcon(
    "%3Cpath d='M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4'/%3E%3Cpath d='M12 2v2'/%3E%3Cpath d='M9 12v9'/%3E%3Cpath d='M15 12v9'/%3E%3Cpath d='M5 16l4 -2'/%3E%3Cpath d='M15 14l4 2'/%3E%3Cpath d='M9 18h6'/%3E%3Cpath d='M10 8v.01'/%3E%3Cpath d='M14 8v.01'/%3E",
  ),
  metodologias: tablerIcon(
    "%3Cpath d='M20 4h-9v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5a1 1 0 0 1 1 1v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5v-9'/%3E%3Cpath d='M15 8h-8v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5a1 1 0 0 1 1 1v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5v-8a1 1 0 0 0 -1 -1'/%3E%3Cpath d='M11 12h-8v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5a1 1 0 0 1 1 1v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5v-8a1 1 0 0 0 -1 -1'/%3E",
  ),
  ensamblador: '/logos/assembly.svg',
  erlang: '/logos/erlang.svg',
  latex: '/logos/latex.svg',
  lisp: '/logos/lisp.svg',
  matematicas: tablerIcon(
    "%3Cpath d='M19 5h-7l-4 14l-3 -6h-2'/%3E%3Cpath d='M14 13l6 6'/%3E%3Cpath d='M14 19l6 -6'/%3E",
  ),
  perl: '/logos/perl.svg',
  raku: '/logos/raku.svg',
  scala: '/logos/scala.svg',
  scratch: '/logos/scratch.svg',
  subversion: '/logos/svn.svg',
};

export const sectionLogoSources = (slug: string) => {
  const logos = sectionLogos[slug] ?? [];
  return Array.isArray(logos) ? logos : [logos];
};

/** Logos monocromos / genéricos: en dark mode se fuerzan a blanco. */
const monochromeLogoFiles = new Set([
  '/logos/assembly.svg',
  '/logos/lisp.svg',
  '/logos/sql.svg',
  '/logos/agile.svg',
  '/logos/ai.svg',
]);

export const isMonochromeLogo = (src: string) =>
  src.startsWith('data:image/svg+xml') || monochromeLogoFiles.has(src.split('?')[0] ?? src);
