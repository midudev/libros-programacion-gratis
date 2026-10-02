const sectionLogos: Record<string, string | string[]> = {
  generales: '/logos/code.svg',
  algoritmos: '/logos/algorithms.svg',
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
  dart: '/logos/dart.svg',
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
  'sistemas-operativos': '/logos/operating-system.svg',
  ia: '/logos/ai.svg',
  metodologias: '/logos/agile.svg',
  ensamblador: '/logos/assembly.svg',
  erlang: '/logos/erlang.svg',
  latex: '/logos/latex.svg',
  lisp: '/logos/lisp.svg',
  matematicas: '/logos/math.svg',
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

/** Logos monocromos / genéricos: en dark mode se aclaran para mantener el contraste. */
const monochromeLogoFiles = new Set([
  '/logos/assembly.svg',
  '/logos/lisp.svg',
  '/logos/math.svg',
  '/logos/sql.svg',
]);

export const isMonochromeLogo = (src: string) => monochromeLogoFiles.has(src.split('?')[0] ?? src);
