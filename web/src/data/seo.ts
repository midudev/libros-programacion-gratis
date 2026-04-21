import { allBooks, getLocalPdfBook, librarySections, totalBooks, type LibraryBook, type LibrarySection } from './library';

export const siteConfig = {
  name: 'librosgratis.dev',
  url: 'https://librosgratis.dev',
  locale: 'es_ES',
  language: 'es',
  defaultImage: '/og-preview.svg',
};

type SectionSeoOverride = {
  pathSlug?: string;
  displayName?: string;
  intro?: string;
  focusKeywords?: string[];
};

export type SectionPageEntry = {
  section: LibrarySection;
  pathSlug: string;
  displayName: string;
  intro: string;
  focusKeywords: string[];
};

const sectionSeoOverrides: Record<string, SectionSeoOverride> = {
  'html-css': {
    pathSlug: 'css',
    displayName: 'CSS y HTML',
    intro:
      'Una selección de libros gratis de CSS y HTML para aprender maquetación, estilos, semántica web e interfaces modernas desde cero.',
    focusKeywords: ['libros gratis de CSS', 'libros CSS español', 'libros HTML gratis'],
  },
  cplusplus: {
    pathSlug: 'cpp',
    displayName: 'C++',
    focusKeywords: ['libros gratis de C++', 'libros C++ español', 'programación C++ PDF'],
  },
  csharp: {
    pathSlug: 'c-sharp',
    displayName: 'C#',
    focusKeywords: ['libros gratis de C#', 'libros C# español', 'programación .NET gratis'],
  },
  golang: {
    pathSlug: 'go',
    displayName: 'Go',
    focusKeywords: ['libros gratis de Go', 'libros Golang español', 'programación Go gratis'],
  },
  nodejs: {
    pathSlug: 'nodejs',
    displayName: 'Node.js',
    focusKeywords: ['libros gratis de Node.js', 'Node.js español', 'backend JavaScript gratis'],
  },
  ia: {
    pathSlug: 'inteligencia-artificial',
    displayName: 'Inteligencia Artificial',
    focusKeywords: ['libros gratis de inteligencia artificial', 'IA español', 'machine learning gratis'],
  },
  metodologias: {
    pathSlug: 'metodologias-desarrollo',
    displayName: 'metodologías de desarrollo',
    focusKeywords: ['libros gratis de metodologías ágiles', 'Scrum gratis', 'XP desarrollo software'],
  },
  'sistemas-operativos': {
    displayName: 'sistemas operativos',
    focusKeywords: ['libros gratis de sistemas operativos', 'sistemas operativos español', 'SO PDF'],
  },
};

const compactText = (text: string) => text.replace(/\s+/g, ' ').trim();

const truncateAtWord = (text: string, maxLength = 158) => {
  const normalized = compactText(text);

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const clipped = normalized.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(' ');

  return `${clipped.slice(0, Math.max(lastSpace, 80)).trim()}…`;
};

const normalizeDisplayName = (section: LibrarySection) =>
  sectionSeoOverrides[section.slug]?.displayName ?? section.title;

const normalizePathSlug = (section: LibrarySection) =>
  sectionSeoOverrides[section.slug]?.pathSlug ?? section.slug;

export const getSectionPageEntry = (section: LibrarySection): SectionPageEntry => {
  const override = sectionSeoOverrides[section.slug] ?? {};
  const displayName = normalizeDisplayName(section);

  return {
    section,
    pathSlug: normalizePathSlug(section),
    displayName,
    intro:
      override.intro ??
      `Una selección de libros gratis de ${displayName} en español para aprender con recursos abiertos, prácticos y fáciles de consultar.`,
    focusKeywords: [
      `libros gratis de ${displayName}`,
      `libros de ${displayName} en español`,
      `${displayName} gratis`,
      ...(override.focusKeywords ?? []),
    ],
  };
};

export const sectionPageEntries = librarySections.map(getSectionPageEntry);

export const getSectionPagePath = (entry: SectionPageEntry) => `/libros/${entry.pathSlug}/`;

export const getSectionCanonicalUrl = (entry: SectionPageEntry) =>
  new URL(getSectionPagePath(entry), siteConfig.url).toString();

export const getSectionPageTitle = (entry: SectionPageEntry) =>
  `Libros gratis de ${entry.displayName} en español`;

export const getSectionMetaTitle = (entry: SectionPageEntry) =>
  `${getSectionPageTitle(entry)} | ${siteConfig.name}`;

export const getSectionMetaDescription = (entry: SectionPageEntry) =>
  truncateAtWord(
    `Descubre ${entry.section.books.length} libros gratis de ${entry.displayName} en español. Recursos seleccionados en PDF y HTML para aprender con guías prácticas y gratuitas.`,
  );

export const toAbsoluteUrl = (href: string) => new URL(href, siteConfig.url).toString();

const getEncodingFormat = (format: string) => {
  const normalized = format.toLowerCase();

  if (normalized === 'pdf') return 'application/pdf';
  if (normalized === 'html') return 'text/html';
  if (normalized === 'epub' || normalized === 'ebook') return 'application/epub+zip';

  return format;
};

const bookStructuredData = (book: LibraryBook) => ({
  '@type': 'Book',
  name: book.title,
  ...(book.author && { author: { '@type': 'Person', name: book.author } }),
  url: toAbsoluteUrl(getLocalPdfBook(book)?.readerPath ?? book.href),
  inLanguage: siteConfig.language,
  isAccessibleForFree: true,
  ...(book.formats?.length && { encodingFormat: book.formats.map(getEncodingFormat) }),
});

export const createHomeStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: siteConfig.language,
    },
    {
      '@type': 'CollectionPage',
      name: 'Libros gratis de programación en español',
      description:
        'Biblioteca curada de libros y guías gratuitas de programación en español, organizada por lenguajes, frameworks, herramientas y fundamentos.',
      inLanguage: siteConfig.language,
      url: siteConfig.url,
      hasPart: sectionPageEntries.map((entry) => ({
        '@type': 'CollectionPage',
        name: getSectionPageTitle(entry),
        url: getSectionCanonicalUrl(entry),
      })),
      mainEntity: {
        '@type': 'ItemList',
        name: 'Biblioteca de libros de programación gratis en español',
        numberOfItems: totalBooks,
        itemListElement: allBooks.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: bookStructuredData(book),
        })),
      },
    },
  ],
});

export const createSectionStructuredData = (entry: SectionPageEntry) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Libros gratis de programación',
          item: siteConfig.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: getSectionPageTitle(entry),
          item: getSectionCanonicalUrl(entry),
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      name: getSectionPageTitle(entry),
      description: getSectionMetaDescription(entry),
      inLanguage: siteConfig.language,
      url: getSectionCanonicalUrl(entry),
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      mainEntity: {
        '@type': 'ItemList',
        name: `Libros gratis de ${entry.displayName}`,
        numberOfItems: entry.section.books.length,
        itemListElement: entry.section.books.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: bookStructuredData(book),
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `¿Dónde encontrar libros gratis de ${entry.displayName} en español?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `En ${siteConfig.name} tienes una selección curada de ${entry.section.books.length} libros gratis de ${entry.displayName} en español, con enlaces directos a recursos PDF y HTML cuando están disponibles.`,
          },
        },
        {
          '@type': 'Question',
          name: `¿Estos libros de ${entry.displayName} son gratis?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. La colección apunta a recursos gratuitos, abiertos o publicados por sus autores para consulta libre.',
          },
        },
      ],
    },
  ],
});
