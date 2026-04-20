const tablerIcon = (paths: string, stroke = '%23777') =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${stroke}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E${paths}%3C/svg%3E`;

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
  ia: '/logos/ai.svg',
  metodologias: '/logos/agile.svg',
};

export const sectionLogoSources = (slug: string) => {
  const logos = sectionLogos[slug] ?? [];
  return Array.isArray(logos) ? logos : [logos];
};
