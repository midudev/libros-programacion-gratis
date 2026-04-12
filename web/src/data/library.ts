export type LibraryBook = {
  title: string;
  href: string;
  author?: string;
  formats?: string[];
  note?: string;
};

export type LibrarySection = {
  slug: string;
  title: string;
  icon: string;
  group: string;
  description: string;
  accent: string;
  books: LibraryBook[];
};

export const sourceRepository = {
  name: 'midudev/libros-programacion-gratis',
  href: 'https://github.com/midudev/libros-programacion-gratis',
};

export const librarySections: LibrarySection[] = [
  {
    slug: 'generales',
    title: 'Generales',
    icon: '👨‍💻',
    group: 'Fundamentos',
    description: 'Para abrir apetito, mejorar criterio y aprender a pensar mejor como programador.',
    accent: 'terracotta',
    books: [
      {
        title: '97 cosas que todo programador debe saber',
        href: 'https://97cosas.com/programador/',
        author: 'Kevlin Henney',
      },
      {
        title: 'Los apuntes de Majo',
        href: 'https://losapuntesdemajo.vercel.app/',
        author: 'Majo Ledesma',
      },
    ],
  },
  {
    slug: 'javascript',
    title: 'JavaScript',
    icon: '🟨',
    group: 'Lenguajes',
    description: 'La puerta de entrada a la web moderna, desde fundamentos hasta buenas prácticas.',
    accent: 'gold',
    books: [
      {
        title: 'Eloquent JavaScript',
        href: 'https://midu.link/eloquent',
        author: 'Marijn Haverbeke',
        formats: ['PDF', 'HTML', 'EPUB', 'MOBI'],
      },
      {
        title: 'JavaScript, ¡Inspírate!',
        href: 'https://leanpub.com/javascript-inspirate',
        author: 'Ulises Gascón',
        formats: ['eBook'],
      },
      {
        title: 'JavaScript Moderno',
        href: 'https://es.javascript.info/',
        author: 'Ilya Kantor',
        formats: ['HTML'],
      },
      {
        title: 'MDN: Guía de JavaScript',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'typescript',
    title: 'TypeScript',
    icon: '🟦',
    group: 'Lenguajes',
    description: 'Tipos, tooling y confianza para escalar aplicaciones front y back.',
    accent: 'blue',
    books: [
      {
        title: 'Introducción a TypeScript',
        href: 'https://khru.gitbooks.io/typescript/',
        author: 'Emmanuel Valverde Ramos',
        formats: ['HTML'],
      },
      {
        title: 'TypeScript en Profundidad',
        href: 'https://github.com/melissarofman/typescript-book',
        author: 'Basarat Ali Syed, traducido por Melissa Rofman',
        formats: ['HTML'],
      },
      {
        title: 'Introducción a TypeScript',
        href: 'https://mega.nz/file/TldlTZID#1A90Wn8xYloDvekX8rQewI3Yh8HMJXlufRUEWEcOzNU',
        author: 'Adictos al trabajo',
      },
      {
        title: 'TypeScript para Principantes',
        href: 'https://mega.nz/file/7hdwEY6b#ESsixH9wCUFhUugkRq8BEa1uZlzFXCJX6QxHdL5Yz9Q',
        author: 'Envato Tuts+',
      },
      {
        title: 'Manual de TypeScript',
        href: 'https://mega.nz/#!qwcFDZ7a!ggLXIZ4c-O1Do0OEuvK0Mz8k39LvYQwdaJ2LtKKxgsE',
        author: 'Emmanuel Valverde y Pedro Hernández-Mora',
      },
      {
        title: 'Uso avanzado de TypeScript en un ejemplo real',
        href: 'https://neliosoftware.com/es/blog/uso-avanzado-de-typescript/',
        author: 'Nelio Software',
        formats: ['HTML'],
      },
      {
        title: 'Aprendizaje TypeScript',
        href: '/books/typescript-aprendizaje.pdf',
        author: 'RipTutorial',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'python',
    title: 'Python',
    icon: '🐍',
    group: 'Lenguajes',
    description: 'Automatización, análisis y backend con una curva de entrada muy amable.',
    accent: 'emerald',
    books: [
      {
        title: 'Aprende Python',
        href: 'https://uneweb.edu.ve/tuto-docs/libro-python.pdf',
        author: 'Sergio Delgado Quintero',
        formats: ['PDF'],
      },
      {
        title: 'Python para todos',
        href: '/books/python-para-todos.pdf',
        author: 'Raúl González Duque',
        formats: ['PDF'],
      },
      {
        title: 'Aprenda a pensar como un programador con Python',
        href: '/books/python-pensar-programador.pdf',
        author:
          'Allen Downey, Jeffrey Elkner, Chris Meyers',
        formats: ['PDF'],
      },
      {
        title: 'Python para todos, Explorando la información con Python 3',
        href: '/books/python-explorando-informacion.pdf',
        author:
          'Charles R. Severance',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'ruby',
    title: 'Ruby',
    icon: '♦️',
    group: 'Lenguajes',
    description: 'Sintaxis elegante y una manera de programar muy orientada a la legibilidad.',
    accent: 'berry',
    books: [
      {
        title: 'Aprende a programar con Ruby',
        href: 'http://rubysur.org/aprende.a.programar',
        author: 'RubySur',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'rust',
    title: 'Rust',
    icon: '⚙️',
    group: 'Lenguajes',
    description: 'Rendimiento, seguridad de memoria y una comunidad técnica con mucha calidad.',
    accent: 'ember',
    books: [
      {
        title: 'Aprendizaje Rust',
        href: '/books/rust-aprendizaje.pdf',
        author: 'RipTutorial',
        formats: ['PDF'],
      },
      {
        title: 'El Lenguaje de Programación Rust - 2016',
        href: 'https://goyox86.github.io/elpr/README.html',
        author: 'Jose Narvaez',
        formats: ['HTML'],
      },
      {
        title: 'El Lenguaje de Programación Rust - 2024',
        href: 'https://book.rustlang-es.org',
        author: 'Libro oficial traducido por RustLang en Español',
        formats: ['HTML', 'PDF'],
      },
      {
        title: 'Comprehensive Rust',
        href: 'https://google.github.io/comprehensive-rust/es/',
        author: 'Google',
        formats: ['HTML', 'PDF'],
        note: 'Está planteado como workshop, muy útil para estudiar con instructor o en grupo.',
      },
      {
        title: 'Rust para C#/.NET Developers',
        href: 'https://dotnet-book.rustlang-es.org',
        author: 'Microsoft, traducido por RustLang en Español',
        formats: ['HTML', 'PDF'],
        note: 'Incluye comparaciones sencillas para entender bien el cambio de mentalidad entre lenguajes.',
      },
    ],
  },
  {
    slug: 'php',
    title: 'PHP',
    icon: '🐘',
    group: 'Lenguajes',
    description: 'Backend pragmático con mucha historia y recursos excelentes para aprender bien.',
    accent: 'violet',
    books: [
      {
        title: 'PHP, la manera correcta',
        href: 'https://phpdevenezuela.github.io/php-the-right-way/',
        author: 'Josh Lockhart, Phil Sturgeon',
        formats: ['HTML'],
      },
      {
        title: 'Programación en PHP a través de ejemplos',
        href: 'https://mega.nz/file/AFIkhRpC#8muP4I2jZRiNirbQmXDMBDf8QPxw5HkbbaGk2xzDvNE',
        author: 'Manuel Palomo e Ildefonso Montero',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'haskell',
    title: 'Haskell',
    icon: '🤔',
    group: 'Lenguajes',
    description: 'Pensamiento funcional duro y puro para expandir cómo entiendes el código.',
    accent: 'plum',
    books: [
      {
        title: 'Piensa en Haskell',
        href: '/books/haskell-piensa.pdf',
        author: 'José A. Alonso Jiménez, Mª José Hidalgo Doblado',
        formats: ['PDF'],
      },
      {
        title: '¡Aprende Haskell por el bien de todos!',
        href: 'http://aprendehaskell.es/main.html',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'golang',
    title: 'Golang',
    icon: '🐹',
    group: 'Lenguajes',
    description: 'Concurrencia, simplicidad y tooling impecable para servicios y utilidades.',
    accent: 'cyan',
    books: [
      {
        title: 'El pequeño libro de Go',
        href: '/books/go-pequeno-libro.pdf',
        author: 'Karl Seguin, traducido por Raúl Exposito',
        formats: ['PDF'],
      },
      {
        title: 'Go en Español',
        href: 'https://nachopacheco.gitbooks.io/go-es/content/doc',
        author: 'Nacho Pacheco',
      },
    ],
  },
  {
    slug: 'kotlin',
    title: 'Kotlin',
    icon: '🤖',
    group: 'Lenguajes',
    description: 'Android moderno y una sintaxis muy agradable para aplicaciones robustas.',
    accent: 'sunset',
    books: [
      {
        title: 'Curso programación Android en Kotlin',
        href: 'https://cursokotlin.com/curso-programacion-kotlin-android/',
        author: 'AristiDevs',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'java',
    title: 'Java',
    icon: '☕',
    group: 'Lenguajes',
    description: 'Una base muy sólida para aprender orientación a objetos y ecosistemas empresariales.',
    accent: 'coffee',
    books: [
      {
        title: 'Fundamentos de programación en Java',
        href: 'https://es.slideshare.net/slideshow/java-fundamentos/23333338',
        author: 'Jorge Martínez Ladrón',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'r',
    title: 'R',
    icon: '📊',
    group: 'Lenguajes',
    description: 'Análisis de datos y visualización para quien quiere ir directo al insight.',
    accent: 'ink',
    books: [
      {
        title: 'R para Ciencia de Datos',
        href: 'https://es.r4ds.hadley.nz/',
        author: 'Hadley Wickham y Garrett Grolemund',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'react',
    title: 'React',
    icon: '⚛️',
    group: 'Frameworks',
    description: 'Componentes, estado y patrones para crear interfaces ricas y mantenibles.',
    accent: 'sky',
    books: [
      {
        title: 'React: De aprendiz a maestro',
        href: '/books/react-aprendiz-maestro.pdf',
        author: 'Raúl Expósito',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'qwik',
    title: 'Qwik',
    icon: '⚡️',
    group: 'Frameworks',
    description: 'Performance extrema y carga diferida para experiencias rapidísimas.',
    accent: 'electric',
    books: [
      {
        title: 'Qwik: Desde cero a producción',
        href: 'https://qwik-book-spanish.netlify.app/',
        author: 'Anartz Mugika',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'git',
    title: 'Git',
    icon: '🌀',
    group: 'Herramientas',
    description: 'Versionado bien aprendido para colaborar sin miedo a romper nada.',
    accent: 'orange',
    books: [
      {
        title: 'Pro Git',
        href: '/books/git-pro.pdf',
        author: 'Scott Chacon y Ben Straub',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'sql',
    title: 'SQL',
    icon: '🛢️',
    group: 'Bases de datos',
    description: 'Consultas, modelado y fundamentos imprescindibles para cualquier stack.',
    accent: 'forest',
    books: [
      {
        title: 'Tutorial de SQL',
        href: 'http://www.desarrolloweb.com/manuales/9/',
        author: 'Rubén Alvarez',
      },
      {
        title: 'Manual de SQL',
        href: 'http://jorgesanchez.net/manuales/sql/intro-sql-sql2016.html',
        author: 'Jorge Sanchez Asenjo',
      },
    ],
  },
];

export const allBooks = librarySections.flatMap((section) =>
  section.books.map((book) => ({ ...book, section: section.title, group: section.group, slug: section.slug })),
);

export const totalBooks = allBooks.length;
export const totalSections = librarySections.length;

export const groupSummaries = Array.from(
  librarySections.reduce((map, section) => {
    const current = map.get(section.group) ?? { group: section.group, sections: 0, books: 0 };
    current.sections += 1;
    current.books += section.books.length;
    map.set(section.group, current);
    return map;
  }, new Map<string, { group: string; sections: number; books: number }>()),
).map(([, value]) => value);

export const formatCounts = Array.from(
  allBooks.reduce((map, book) => {
    for (const format of book.formats ?? []) {
      map.set(format, (map.get(format) ?? 0) + 1);
    }

    return map;
  }, new Map<string, number>()),
)
  .map(([format, count]) => ({ format, count }))
  .sort((left, right) => right.count - left.count);
