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
  blockchain: tablerIcon(
    "%3Cpath d='M6 6h8a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-8'/%3E%3Cpath d='M8 6v12'/%3E%3Cpath d='M8 12h6'/%3E%3Cpath d='M9 3v3'/%3E%3Cpath d='M13 3v3'/%3E%3Cpath d='M9 18v3'/%3E%3Cpath d='M13 18v3'/%3E"
  ),
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
  sql: tablerIcon(
    "%3Cpath d='M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0'/%3E%3Cpath d='M4 6v6a8 3 0 0 0 16 0v-6'/%3E%3Cpath d='M4 12v6a8 3 0 0 0 16 0v-6'/%3E",
  ),
  nosql: ['/logos/mongodb.svg', '/logos/redis.svg'],
  'sistemas-operativos': tablerIcon(
    "%3Cpath d='M4 5h16v10h-16z'/%3E%3Cpath d='M8 21h8'/%3E%3Cpath d='M12 15v6'/%3E",
  ),
  ia: tablerIcon(
    "%3Cpath d='M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4'/%3E%3Cpath d='M12 2v2'/%3E%3Cpath d='M9 12v9'/%3E%3Cpath d='M15 12v9'/%3E%3Cpath d='M5 16l4 -2'/%3E%3Cpath d='M15 14l4 2'/%3E%3Cpath d='M9 18h6'/%3E%3Cpath d='M10 8v.01'/%3E%3Cpath d='M14 8v.01'/%3E",
  ),
  metodologias: tablerIcon(
    "%3Cpath d='M13 20.693c-.905 .628 -2.36 .292 -2.675 -1.01a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.492 .362 1.716 2.219 .674 3.03'/%3E%3Cpath d='M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0'/%3E%3Cpath d='M17 22l5 -3l-5 -3l0 6'/%3E",
  ),
  ensamblador: tablerIcon(
    "%3Cpath d='M7 9l-3 3l3 3'/%3E%3Cpath d='M17 9l3 3l-3 3'/%3E%3Cpath d='M14 5l-4 14'/%3E",
  ),
  erlang: tablerIcon(
    "%3Cpath d='M12 3a9 9 0 1 0 9 9'/%3E%3Cpath d='M12 12l9 -3'/%3E%3Cpath d='M12 12v9'/%3E",
  ),
  latex: tablerIcon(
    "%3Cpath d='M14 3v4a1 1 0 0 0 1 1h4'/%3E%3Cpath d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z'/%3E%3Cpath d='M9 13h6'/%3E%3Cpath d='M9 17h3'/%3E",
  ),
  lisp: tablerIcon(
    "%3Cpath d='M7 8h10'/%3E%3Cpath d='M7 12h6'/%3E%3Cpath d='M7 16h8'/%3E%3Cpath d='M4 6v12'/%3E%3Cpath d='M20 6v12'/%3E",
  ),
  matematicas: tablerIcon(
    "%3Cpath d='M5 12h14'/%3E%3Cpath d='M12 5l7 7l-7 7'/%3E%3Cpath d='M5 5v14'/%3E",
  ),
  perl: tablerIcon(
    "%3Cpath d='M12 3c4.97 0 9 3.582 9 8c0 4.418 -4.03 8 -9 8c-1.2 0 -2.34 -.21 -3.38 -.59l-3.62 1.59l1.2 -3.4c-1.35 -1.26 -2.2 -2.95 -2.2 -4.85c0 -4.418 4.03 -8 9 -8z'/%3E",
  ),
  raku: tablerIcon(
    "%3Cpath d='M12 4l-1.5 4.5l-4.5 1.5l4.5 1.5l1.5 4.5l1.5 -4.5l4.5 -1.5l-4.5 -1.5z'/%3E%3Cpath d='M18 14l-.8 2.4l-2.4 .8l2.4 .8l.8 2.4l.8 -2.4l2.4 -.8l-2.4 -.8z'/%3E",
  ),
  scala: tablerIcon(
    "%3Cpath d='M4 6h16'/%3E%3Cpath d='M4 12h12'/%3E%3Cpath d='M4 18h8'/%3E%3Cpath d='M18 10v8'/%3E%3Cpath d='M15 15l3 3l3 -3'/%3E",
  ),
  scratch: tablerIcon(
    "%3Cpath d='M12 5a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1 -8 0v-1h-1a3 3 0 0 1 0 -6h1v-1a4 4 0 0 1 4 -4z'/%3E",
  ),
  subversion: tablerIcon(
    "%3Cpath d='M6 4v16'/%3E%3Cpath d='M18 4v16'/%3E%3Cpath d='M6 8h6a3 3 0 0 1 0 6h-6'/%3E%3Cpath d='M12 14l4 4'/%3E",
  ),
};

export const sectionLogoSources = (slug: string) => {
  const logos = sectionLogos[slug] ?? [];
  return Array.isArray(logos) ? logos : [logos];
};
