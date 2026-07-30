import {
  allBooks,
  getLocalPdfBook,
  librarySections,
  localPdfBooks,
  sourceRepository,
  totalBooks,
  totalSections,
  type LibraryBook,
  type LibrarySection,
  type LocalPdfBook,
} from './library';

export const siteConfig = {
  name: 'librosgratis.dev',
  url: 'https://librosgratis.dev',
  locale: 'es_ES',
  language: 'es',
  languageTag: 'es-ES',
  defaultImage: '/og-preview.png',
  defaultImageAlt: 'Libros gratis de programación en español — librosgratis.dev',
  /** Fecha de revisión del contenido (sitemap + schema). Actualizar al publicar cambios. */
  contentLastModified: '2026-07-30',
  publisher: {
    name: 'librosgratis.dev',
    logo: '/favicon.svg',
  },
  sameAs: [sourceRepository.href],
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

export type FaqItem = {
  question: string;
  answer: string;
};

const sectionSeoOverrides: Record<string, SectionSeoOverride> = {
  'html-css': {
    pathSlug: 'css',
    displayName: 'CSS y HTML',
    intro:
      'Una selección de libros gratis de CSS y HTML para aprender maquetación, estilos, semántica web e interfaces modernas desde cero.',
    focusKeywords: ['libros gratis de CSS', 'libros CSS español', 'libros HTML gratis', 'CSS PDF gratis'],
  },
  cplusplus: {
    pathSlug: 'cpp',
    displayName: 'C++',
    focusKeywords: ['libros gratis de C++', 'libros C++ español', 'programación C++ PDF', 'C++ gratis PDF'],
  },
  csharp: {
    pathSlug: 'c-sharp',
    displayName: 'C#',
    focusKeywords: ['libros gratis de C#', 'libros C# español', 'programación .NET gratis', 'C# PDF gratis'],
  },
  golang: {
    pathSlug: 'go',
    displayName: 'Go',
    focusKeywords: ['libros gratis de Go', 'libros Golang español', 'programación Go gratis', 'Golang PDF'],
  },
  nodejs: {
    pathSlug: 'nodejs',
    displayName: 'Node.js',
    focusKeywords: ['libros gratis de Node.js', 'Node.js español', 'backend JavaScript gratis', 'Node.js PDF'],
  },
  ia: {
    pathSlug: 'inteligencia-artificial',
    displayName: 'Inteligencia Artificial',
    focusKeywords: [
      'libros gratis de inteligencia artificial',
      'IA español',
      'machine learning gratis',
      'libros IA PDF español',
    ],
  },
  metodologias: {
    pathSlug: 'metodologias-desarrollo',
    displayName: 'metodologías de desarrollo',
    focusKeywords: ['libros gratis de metodologías ágiles', 'Scrum gratis', 'XP desarrollo software', 'guía Scrum PDF'],
  },
  'sistemas-operativos': {
    displayName: 'sistemas operativos',
    focusKeywords: ['libros gratis de sistemas operativos', 'sistemas operativos español', 'SO PDF'],
  },
  javascript: {
    focusKeywords: [
      'libros gratis de JavaScript',
      'JavaScript español PDF',
      'aprender JavaScript gratis',
      'libros JS gratis',
    ],
  },
  typescript: {
    focusKeywords: [
      'libros gratis de TypeScript',
      'TypeScript español PDF',
      'aprender TypeScript gratis',
    ],
  },
  python: {
    focusKeywords: [
      'libros gratis de Python',
      'Python español PDF',
      'aprender Python gratis',
      'libros Python principiantes',
    ],
  },
  react: {
    focusKeywords: ['libros gratis de React', 'React español PDF', 'aprender React gratis'],
  },
  rust: {
    focusKeywords: ['libros gratis de Rust', 'Rust español PDF', 'aprender Rust gratis'],
  },
  java: {
    focusKeywords: ['libros gratis de Java', 'Java español PDF', 'aprender Java gratis'],
  },
  git: {
    focusKeywords: ['libros gratis de Git', 'Git Pro español', 'aprender Git gratis'],
  },
  sql: {
    focusKeywords: ['libros gratis de SQL', 'SQL español PDF', 'bases de datos gratis'],
  },
  docker: {
    focusKeywords: ['libros gratis de Docker', 'Docker español PDF', 'aprender Docker gratis'],
  },
  ensamblador: {
    focusKeywords: ['libros gratis de ensamblador', 'ensamblador español PDF', 'assembly x86 español'],
  },
  erlang: {
    focusKeywords: ['libros gratis de Erlang', 'Erlang español', 'programación Erlang gratis'],
  },
  latex: {
    pathSlug: 'latex',
    displayName: 'LaTeX',
    focusKeywords: ['libros gratis de LaTeX', 'LaTeX español PDF', 'manual LaTeX gratis'],
  },
  lisp: {
    focusKeywords: ['libros gratis de Lisp', 'Emacs Lisp español', 'programación Lisp gratis'],
  },
  matematicas: {
    pathSlug: 'matematicas',
    displayName: 'Matemáticas',
    focusKeywords: ['matemáticas para programación', 'Sage matemáticas gratis', 'libros matemáticas programación'],
  },
  perl: {
    focusKeywords: ['libros gratis de Perl', 'Perl español PDF', 'tutorial Perl gratis'],
  },
  raku: {
    pathSlug: 'raku',
    displayName: 'Raku',
    focusKeywords: ['libros gratis de Raku', 'Perl 6 español', 'Raku programación gratis'],
  },
  scala: {
    focusKeywords: ['libros gratis de Scala', 'Scala español PDF', 'aprender Scala gratis'],
  },
  scratch: {
    focusKeywords: ['libros gratis de Scratch', 'Scratch español', 'programación visual niños'],
  },
  subversion: {
    focusKeywords: ['libros gratis de Subversion', 'SVN español', 'control de versiones Subversion'],
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
      ...new Set([
        `libros gratis de ${displayName}`,
        `libros de ${displayName} en español`,
        `${displayName} PDF gratis`,
        `aprender ${displayName} gratis`,
        ...(override.focusKeywords ?? []),
      ]),
    ],
  };
};

export const sectionPageEntries = librarySections.map(getSectionPageEntry);

export const getSectionPagePath = (entry: SectionPageEntry) => `/libros/${entry.pathSlug}/`;

export const getSectionCanonicalUrl = (entry: SectionPageEntry) =>
  new URL(getSectionPagePath(entry), siteConfig.url).toString();

export const getSectionPageTitle = (entry: SectionPageEntry) =>
  `Libros gratis de ${entry.displayName} en español`;

export const getSectionMetaTitle = (entry: SectionPageEntry) => {
  const base = getSectionPageTitle(entry);
  const withBrand = `${base} | ${siteConfig.name}`;

  if (withBrand.length <= 60) return withBrand;
  if (base.length <= 60) return base;
  return truncateAtWord(base, 60);
};

export const getSectionMetaDescription = (entry: SectionPageEntry) =>
  truncateAtWord(
    `Descubre ${entry.section.books.length} libros gratis de ${entry.displayName} en español. PDF, HTML y guías para aprender ${entry.displayName} sin pagar. Lectura online y descarga en ${siteConfig.name}.`,
  );

export const homeMeta = {
  title: 'Libros gratis de programación en español | librosgratis.dev',
  description: truncateAtWord(
    `Biblioteca con ${totalBooks} libros y guías gratis de programación en español: JavaScript, Python, TypeScript, React, Rust, Git, SQL y más. Lee online o descarga PDF.`,
  ),
  keywords: [
    'libros de programación gratis',
    'libros gratis programación español',
    'ebooks programación español',
    'libros programación PDF gratis',
    'aprender a programar gratis español',
    'javascript gratis',
    'python gratis',
    'typescript gratis',
    'libros desarrollo web gratis',
    'guías programación español',
  ],
};

export const homeFaqs: FaqItem[] = [
  {
    question: '¿Dónde encontrar libros gratis de programación en español?',
    answer: `En ${siteConfig.name} hay una biblioteca curada con ${totalBooks} libros y guías gratuitas de programación en español, organizadas en ${totalSections} temas: lenguajes, frameworks, herramientas y fundamentos. Puedes leer online o descargar PDF cuando está disponible.`,
  },
  {
    question: '¿Los libros de esta web son realmente gratis?',
    answer:
      'Sí. Solo se incluyen recursos gratuitos, abiertos o publicados por sus autores para consulta libre. No hay paywalls ni freemium disfrazado: si un enlace deja de ser gratis, se revisa o se retira.',
  },
  {
    question: '¿Puedo descargar los libros en PDF o EPUB?',
    answer: `Muchos títulos incluyen PDF y, cuando está disponible, EPUB. En las fichas verás botones para leer online, descargar PDF o EPUB. Hay ${localPdfBooks.length} libros con lector PDF integrado en el sitio.`,
  },
  {
    question: '¿Qué lenguajes y temas cubre la biblioteca?',
    answer:
      'JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP, Kotlin, React, Node.js, Git, Docker, SQL, Linux, metodologías ágiles y más. Cada tema tiene su página propia para localizar recursos más rápido.',
  },
  {
    question: '¿Cómo se actualiza el catálogo?',
    answer: `El contenido se mantiene desde el repositorio abierto ${sourceRepository.name}. Cualquiera puede proponer un libro gratuito en español desde la página de contribuir, sin necesidad de programar.`,
  },
];

export const getSectionFaqs = (entry: SectionPageEntry): FaqItem[] => {
  const { displayName, section } = entry;
  const formats = Array.from(new Set(section.books.flatMap((book) => book.formats ?? [])));
  const formatsLabel = formats.length > 0 ? formats.join(', ') : 'web, PDF o HTML';
  const sampleTitles = section.books
    .slice(0, 3)
    .map((book) => book.title)
    .join(', ');

  return [
    {
      question: `¿Dónde encontrar libros gratis de ${displayName} en español?`,
      answer: `En ${siteConfig.name} tienes una selección curada de ${section.books.length} libros gratis de ${displayName} en español, con enlaces a ${formatsLabel}. Entra en cada ficha para leer online o descargar cuando haya PDF o EPUB.`,
    },
    {
      question: `¿Estos libros de ${displayName} son realmente gratis?`,
      answer:
        'Sí. La colección apunta solo a recursos gratuitos, abiertos o publicados por sus autores para consulta libre. No se listan cursos de pago ni contenido detrás de suscripción.',
    },
    {
      question: `¿Hay libros de ${displayName} en PDF para descargar?`,
      answer: `Varios recursos de ${displayName} incluyen PDF u otros formatos descargables (${formatsLabel}). Si un libro tiene versión local, verás botones de lectura online y descarga en su ficha.`,
    },
    {
      question: `¿Por dónde empezar con ${displayName}?`,
      answer:
        sampleTitles.length > 0
          ? `Puedes empezar por ${sampleTitles}${section.books.length > 3 ? ' y el resto de la lista de esta página' : ''}. Elige el nivel que te encaje y combina lectura online con práctica.`
          : `Explora la lista de esta página y elige el recurso de ${displayName} que mejor encaje con tu nivel.`,
    },
  ];
};

export const toAbsoluteUrl = (href: string) => new URL(href, siteConfig.url).toString();

const organizationNode = () => ({
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.publisher.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: toAbsoluteUrl(siteConfig.publisher.logo),
  },
  sameAs: siteConfig.sameAs,
});

const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.language,
  description: homeMeta.description,
  publisher: { '@id': `${siteConfig.url}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

const faqPageNode = (faqs: FaqItem[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

const breadcrumbNode = (items: { name: string; item: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: entry.name,
    item: entry.item,
  })),
});

const getEncodingFormat = (format: string) => {
  const normalized = format.toLowerCase();

  if (normalized === 'pdf') return 'application/pdf';
  if (normalized === 'html') return 'text/html';
  if (normalized === 'epub' || normalized === 'ebook') return 'application/epub+zip';

  return format;
};

const bookStructuredData = (book: LibraryBook) => {
  const pdfBook = getLocalPdfBook(book);
  const primaryHref = pdfBook && pdfBook.href === pdfBook.pdfHref ? pdfBook.readerPath : book.href;

  return {
    '@type': 'Book',
    name: book.title,
    ...(book.author && { author: { '@type': 'Person', name: book.author } }),
    url: toAbsoluteUrl(primaryHref),
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    ...(book.formats?.length && { encodingFormat: book.formats.map(getEncodingFormat) }),
  };
};

export const createHomeStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationNode(),
    websiteNode(),
    {
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}/#homepage`,
      name: 'Libros gratis de programación en español',
      description: homeMeta.description,
      inLanguage: siteConfig.language,
      url: siteConfig.url,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: {
        '@type': 'Thing',
        name: 'Programación y desarrollo de software',
      },
      dateModified: siteConfig.contentLastModified,
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
    faqPageNode(homeFaqs),
  ],
});

export const createSectionStructuredData = (entry: SectionPageEntry) => {
  const faqs = getSectionFaqs(entry);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      breadcrumbNode([
        {
          name: 'Libros gratis de programación',
          item: siteConfig.url,
        },
        {
          name: getSectionPageTitle(entry),
          item: getSectionCanonicalUrl(entry),
        },
      ]),
      {
        '@type': 'CollectionPage',
        '@id': `${getSectionCanonicalUrl(entry)}#page`,
        name: getSectionPageTitle(entry),
        description: getSectionMetaDescription(entry),
        inLanguage: siteConfig.language,
        url: getSectionCanonicalUrl(entry),
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        dateModified: siteConfig.contentLastModified,
        keywords: entry.focusKeywords.join(', '),
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
      faqPageNode(faqs),
    ],
  };
};

export const createReaderStructuredData = (book: LocalPdfBook, sectionEntry: SectionPageEntry) => {
  const pageUrl = toAbsoluteUrl(book.readerPath);
  const downloadUrl = toAbsoluteUrl(book.downloadPath);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      breadcrumbNode([
        {
          name: 'Libros gratis de programación',
          item: siteConfig.url,
        },
        {
          name: getSectionPageTitle(sectionEntry),
          item: getSectionCanonicalUrl(sectionEntry),
        },
        {
          name: book.title,
          item: pageUrl,
        },
      ]),
      {
        '@type': 'Book',
        '@id': `${pageUrl}#book`,
        name: book.title,
        ...(book.author && { author: { '@type': 'Person', name: book.author } }),
        url: pageUrl,
        inLanguage: siteConfig.language,
        isAccessibleForFree: true,
        bookFormat: 'https://schema.org/EBook',
        encodingFormat: ['application/pdf', ...(book.epubHref ? ['application/epub+zip'] : [])],
        image: toAbsoluteUrl(siteConfig.defaultImage),
        publisher: { '@id': `${siteConfig.url}/#organization` },
        isPartOf: {
          '@type': 'CollectionPage',
          name: getSectionPageTitle(sectionEntry),
          url: getSectionCanonicalUrl(sectionEntry),
        },
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: pageUrl,
          },
          {
            '@type': 'DownloadAction',
            target: downloadUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name: `${book.title} — leer PDF online`,
        description: getReaderMetaDescription(book),
        url: pageUrl,
        inLanguage: siteConfig.language,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        mainEntity: { '@id': `${pageUrl}#book` },
        dateModified: siteConfig.contentLastModified,
      },
    ],
  };
};

export const getReaderMetaTitle = (book: LocalPdfBook) => {
  const full = `${book.title} — leer PDF gratis online | ${siteConfig.name}`;
  if (full.length <= 60) return full;

  const mid = `${book.title} — PDF gratis | ${siteConfig.name}`;
  if (mid.length <= 60) return mid;

  return truncateAtWord(`${book.title} PDF gratis`, 60);
};

export const getReaderMetaDescription = (book: LocalPdfBook) =>
  truncateAtWord(
    `Lee gratis «${book.title}»${book.author ? ` de ${book.author}` : ''} en PDF online. Libro de ${book.section.title} en español, sin registro. Descarga PDF${book.epubHref ? ' y EPUB' : ''} en ${siteConfig.name}.`,
  );

export const getReaderKeywords = (book: LocalPdfBook, sectionEntry: SectionPageEntry) => [
  book.title,
  `${book.title} PDF`,
  `leer ${book.title}`,
  ...sectionEntry.focusKeywords.slice(0, 4),
  'libros programación gratis',
  'PDF programación español',
];
