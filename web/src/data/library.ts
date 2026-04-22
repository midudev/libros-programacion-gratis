export type LibraryBook = {
  title: string;
  href: string;
  pdfHref?: string;
  author?: string;
  formats?: string[];
  note?: string;
};

export type LocalPdfBook = LibraryBook & {
  section: LibrarySection;
  sectionSlug: string;
  bookSlug: string;
  pdfHref: string;
  fileName: string;
  readerPath: string;
  downloadPath: string;
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

const isPdfFormat = (format: string) => format.toLowerCase() === 'pdf';

export const isLocalPdfHref = (href: string) =>
  href.startsWith('/books/') && /\.pdf(?:[?#].*)?$/i.test(href);

const getBookPdfHref = (book: LibraryBook) => book.pdfHref ?? book.href;

export const isLocalPdfBook = (book: LibraryBook) =>
  isLocalPdfHref(getBookPdfHref(book)) && (book.formats?.some(isPdfFormat) ?? true);

const getPdfFileName = (href: string) => href.split(/[?#]/)[0].split('/').at(-1) ?? 'libro.pdf';

const slugifyBook = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

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
        href: '/97-cosas-programador/',
        pdfHref: '/books/97-cosas-que-todo-programador-deberia-saber.pdf',
        author: 'Kevlin Henney',
        formats: ['HTML', 'PDF'],
      },
      {
        title: 'Los apuntes de Majo',
        href: 'https://losapuntesdemajo.vercel.app/',
        author: 'Majo Ledesma',
      },
    ],
  },
  {
    slug: 'algoritmos',
    title: 'Algoritmos y estructuras de datos',
    icon: '🧠',
    group: 'Fundamentos',
    description: 'Lógica, pseudocódigo, POO, análisis de algoritmos y estructuras para resolver mejor.',
    accent: 'terracotta',
    books: [
      {
        title: 'Diseño de Algoritmos en Pseudocódigo y Ordinogramas',
        href: '/books/algoritmos-pseudocodigo-ordinogramas.pdf',
        author: 'Carlos Pes',
        formats: ['PDF'],
      },
      {
        title: 'Estructuras de datos',
        href: '/books/estructuras-de-datos.pdf',
        author: 'Luis Fernando Zapata Alvarez',
        formats: ['PDF'],
      },
      {
        title: 'Problemas y Algoritmos',
        href: '/books/problemas-y-algoritmos.pdf',
        author: 'Luis E. Vargas Azcona',
        formats: ['PDF'],
      },
      {
        title: 'Las bases conceptuales de la Programación',
        href: '/books/bases-conceptuales-programacion.pdf',
        author: 'Pablo E. “Fidel” Martínez López',
        formats: ['PDF'],
      },
      {
        title: 'Introducción a la Lógica de Programación',
        href: '/books/logica-de-programacion.pdf',
        author: 'Jorge O. Herrera M., Julián E. Gutiérrez P., Robinson Pulgarín G.',
        formats: ['PDF'],
      },
      {
        title: 'Fundamentos de la programación',
        href: '/books/fundamentos-programacion.pdf',
        author: 'Luis Hernández Yáñez',
        formats: ['PDF'],
      },
      {
        title: 'Introducción a la programación orientada a objetos',
        href: '/books/introduccion-poo.pdf',
        author: 'Vicent Moncho Mas',
        formats: ['PDF'],
      },
      {
        title: 'Apuntes de Estructuras de Datos y Algoritmos',
        href: '/books/apuntes-estructuras-datos-algoritmos.pdf',
        author: 'Javier Campos',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'html-css',
    title: 'HTML y CSS',
    icon: '🎨',
    group: 'Desarrollo web',
    description: 'Maquetación, estilos e interfaces web desde fundamentos hasta CSS moderno.',
    accent: 'gold',
    books: [
      {
        title: 'Diseño de Interfaces Web',
        href: 'http://interfacesweb.github.io/unidades/',
        author: 'Pedro Prieto',
        formats: ['HTML'],
      },
      {
        title: 'Estructura con CSS',
        href: 'https://es.learnlayout.com/',
        author: 'Learn CSS Layout, traducido al español',
        formats: ['HTML'],
      },
      {
        title: 'MDN: HTML',
        href: 'https://developer.mozilla.org/es/docs/Web/HTML',
        author: 'MDN Web Docs',
        formats: ['HTML'],
      },
      {
        title: 'MDN: CSS',
        href: 'https://developer.mozilla.org/es/docs/Web/CSS',
        author: 'MDN Web Docs',
        formats: ['HTML'],
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
        title: 'JavaScript elocuente (Cuarta edición)',
        href: '/books/javascript-elocuente-cuarta-edicion.pdf',
        author: 'Marijn Haverbeke',
        formats: ['PDF'],
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
        title: 'You Don’t Know JS (traducción al español)',
        href: 'https://github.com/You-Dont-Know-JS-ES/Traduccion',
        author: 'Kyle Simpson, traducido por You-Dont-Know-JS-ES',
        formats: ['HTML'],
      },
      {
        title: 'MDN: Guía de JavaScript',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide',
        formats: ['HTML'],
      },
      {
        title: 'Learn JavaScript',
        href: 'https://javascript.sumankunwar.com.np/es',
        author: 'Suman Kunwar',
        formats: ['HTML'],
      },
      {
        title: 'Introducción a JavaScript',
        href: '/books/javascript-introduccion-eguiluz.pdf',
        author: 'Javier Eguíluz Pérez',
        formats: ['PDF'],
      },
      {
        title: 'JavaScript',
        href: '/books/javascript-uoc.pdf',
        author: 'Jordi Collell Puig y Anna Ferry Mestres',
        formats: ['PDF'],
      },
      {
        title: 'Asincronismo en JavaScript',
        href: '/books/javascript-asincronismo.pdf',
        author: 'Charly Cimino',
        formats: ['PDF'],
      },
      {
        title: 'Fundamentos de jQuery',
        href: '/books/jquery-fundamentos.pdf',
        author: 'Rebecca Murphey, traducido por Leandro D’Onofrio',
        formats: ['PDF'],
      },
      {
        title: 'CSS3 y Javascript avanzado',
        href: '/books/css3-javascript-avanzado.pdf',
        author: 'Jordi Collell Puig',
        formats: ['PDF'],
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
        href: '/books/typescript-introduccion-adictos-trabajo.pdf',
        author: 'Adictos al Trabajo',
        formats: ['PDF'],
      },
      {
        title: 'TypeScript para Principiantes',
        href: '/books/typescript-para-principiantes-envato-tuts.pdf',
        author: 'Envato Tuts+',
        formats: ['PDF'],
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
        href: '/books/python-aprende-sergio-delgado-quintero.pdf',
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
      {
        title: 'Manual básico, iniciación a Python 3',
        href: '/books/python-manual-basico.pdf',
        author: 'José Miguel Ruiz Torres',
        formats: ['PDF'],
      },
      {
        title: 'Python Intermedio',
        href: '/books/python-intermedio.pdf',
        author: 'Comunidad ellibrodepython.com',
        formats: ['PDF'],
      },
      {
        title: 'Inmersión en Python 3',
        href: '/books/python-inmersion.pdf',
        author: 'Mark Pilgrim, traducido por José Miguel González Aguilera',
        formats: ['PDF'],
      },
      {
        title: 'Ejercicios básicos de programación resueltos en Python',
        href: '/books/python-ejercicios-basicos.pdf',
        formats: ['PDF'],
      },
      {
        title: 'Introducción a Python para cálculo científico',
        href: '/books/python-calculo-cientifico.pdf',
        author: 'A. Garcimartín',
        formats: ['PDF'],
      },
      {
        title: 'Introducción a la programación con Python 3',
        href: '/books/python-introduccion-programacion-3.pdf',
        author: 'Andrés Marzal Varó, Isabel Gracia Luengo, Pedro García Sevilla',
        formats: ['PDF'],
      },
      {
        title: 'Apuntes Python',
        href: '/books/python-apuntes.pdf',
        author: 'Manuel Vergara',
        formats: ['PDF'],
      },
      {
        title: 'Inventa tus propios juegos de computadora con Python',
        href: '/books/python-inventa-juegos.pdf',
        author: 'Al Sweigart',
        formats: ['PDF'],
      },
      {
        title: 'El tutorial de Python',
        href: 'https://docs.python.org/es/3/tutorial/',
        author: 'Python Software Foundation',
        formats: ['HTML'],
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
      {
        title: 'Ruby en veinte minutos',
        href: 'https://www.ruby-lang.org/es/documentation/quickstart/',
        author: 'Ruby',
        formats: ['HTML'],
      },
      {
        title: 'Introducción a Rails',
        href: 'http://rubysur.org/introduccion.a.rails/',
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
        href: '/books/php-programacion-ejemplos.pdf',
        author: 'Manuel Palomo Duarte, Ildefonso Montero Pérez',
        formats: ['PDF'],
      },
      {
        title: 'POO y MVC en PHP',
        href: '/books/php-poo-mvc.pdf',
        author: 'Eugenia Bahit',
        formats: ['PDF'],
      },
      {
        title: 'Laboratorio de PHP y MySQL',
        href: 'https://openlibro.com/wp-content/uploads/2026/03/laboratorio-php-mysql.pdf',
        author: 'Piero Berni Millet, Dídac Gil de la Iglesia',
        formats: ['PDF'],
        note: 'PDF externo: supera el límite de 25 MiB por asset de Cloudflare Workers.',
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
      {
        title: 'Piensa en Haskell y en Python',
        href: '/books/haskell-python-ejercicios.pdf',
        author: 'José A. Alonso Jiménez',
        formats: ['PDF'],
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
      {
        title: 'Kotlin',
        href: '/books/kotlin-stackoverflow-docs.pdf',
        author: 'Stack Overflow Documentation',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'android',
    title: 'Android',
    icon: '📱',
    group: 'Plataformas',
    description: 'Desarrollo de aplicaciones Android con guías prácticas en español.',
    accent: 'emerald',
    books: [
      {
        title: 'Manual Programación Android',
        href: 'https://aluzardo.github.io/trabajo-fin-de-grado/Tutoriales/Manual%20Programacion%20Android.pdf',
        author: 'Salvador Gómez Oliver',
        formats: ['PDF'],
      },
      {
        title: 'Curso sobre los aspectos básicos de Android con Compose',
        href: 'https://developer.android.com/courses/android-basics-compose/course?hl=es-419',
        author: 'Android Developers',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'c',
    title: 'C',
    icon: '©️',
    group: 'Lenguajes',
    description: 'Fundamentos de bajo nivel, memoria y pensamiento cercano al sistema.',
    accent: 'ink',
    books: [
      {
        title: 'Introducción a la Programación con C',
        href: '/books/c-introduccion-programacion.pdf',
        author: 'Andrés Marzal e Isabel Gracia',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'cplusplus',
    title: 'C++',
    icon: '➕',
    group: 'Lenguajes',
    description: 'Orientación a objetos, eficiencia y bases para software de alto rendimiento.',
    accent: 'blue',
    books: [
      {
        title: 'C++ estándar',
        href: '/books/cpp-estandar.pdf',
        author: 'Miguel Hernando Gutiérrez',
        formats: ['PDF'],
      },
      {
        title: 'Programación orientada a objetos Ejercicios propuestos con C++',
        href: '/books/cpp-poo-ejercicios.pdf',
        author: 'Cristina Cachero, Pedro J. Ponce de León',
        formats: ['PDF'],
      },
      {
        title: 'Fundamentos Básicos de Programación en C++',
        href: '/books/cpp-fundamentos-basicos.pdf',
        author: 'Francisco Martínez del Río',
        formats: ['PDF'],
      },
      {
        title: 'Curso de C++',
        href: 'https://conclase.net/c/curso',
        author: 'Con Clase',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'csharp',
    title: 'C#',
    icon: '#',
    group: 'Lenguajes',
    description: 'Programación moderna sobre .NET, desde consola hasta backend web.',
    accent: 'violet',
    books: [
      {
        title: 'Introducción a la programación con C#',
        href: '/books/csharp-introduccion-programacion.pdf',
        author: 'Nacho Cabanes',
        formats: ['PDF'],
      },
      {
        title: 'El pequeño libro de ASP.NET Core',
        href: '/books/aspnet-core-pequeno-libro.pdf',
        author: 'Nate Barbettini',
        formats: ['PDF'],
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
      {
        title: 'Iniciando en Java: Programación para Todos',
        href: '/books/java-iniciando-programacion.pdf',
        author: 'Julián Camilo Tuta Diaz',
        formats: ['PDF'],
      },
      {
        title: 'Java Apuntes Básicos',
        href: '/books/java-apuntes-basicos.pdf',
        author: 'Jorge A. López Vargas',
        formats: ['PDF'],
      },
      {
        title: 'Java básico para aprendices',
        href: '/books/java-basico-aprendices.pdf',
        author: 'Manuel Jesús Abanto Morales et al.',
        formats: ['PDF'],
      },
      {
        title: 'Introducción a la Programación Orientada a Objetos con Java',
        href: '/books/java-introduccion-poo.pdf',
        author:
          'Rafael Llobet Azpitarte, Pedro Alonso Jordá, Jaume Devesa Llinares, Emili Miedes De Elías, María Idoia Ruiz Fuertes, Francisco Torres Goterris',
        formats: ['PDF'],
      },
      {
        title: 'Ejercicios de Programación en Java',
        href: '/books/java-ejercicios-programacion.pdf',
        author: 'Francisco Manuel Pérez Montes',
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
      {
        title: 'Introducción a R',
        href: '/books/r-introduccion.pdf',
        author: 'Andrés González y Silvia González',
        formats: ['PDF'],
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
      {
        title: 'React',
        href: '/books/react-stackoverflow-docs.pdf',
        author: 'Stack Overflow Documentation',
        formats: ['PDF'],
      },
      {
        title: 'Preguntas de entrevista de React.js',
        href: 'https://www.reactjs.wiki/',
        author: 'Miguel Ángel Durán',
        formats: ['HTML'],
      },
      {
        title: 'Desarrollo de Aplicaciones Web con React.js y Redux.js',
        href: 'https://leanpub.com/read/react-redux',
        author: 'Sergio Daniel Xalambrí',
        formats: ['HTML'],
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
    slug: 'nodejs',
    title: 'Node.js',
    icon: '🟢',
    group: 'Frameworks',
    description: 'Backend JavaScript, asincronía y fundamentos para escribir servicios con Node.',
    accent: 'forest',
    books: [
      {
        title: 'Node Beginner Book',
        href: 'https://www.nodebeginner.org/index-es.html',
        author: 'Manuel Kiessling',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'angular',
    title: 'Angular',
    icon: '🅰️',
    group: 'Frameworks',
    description: 'Arquitectura frontend con TypeScript, componentes y patrones de aplicación.',
    accent: 'berry',
    books: [
      {
        title: 'Entendiendo Angular',
        href: 'https://jorgeucano.gitbook.io/entendiendo-angular/',
        author: 'Jorge Cano',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'django',
    title: 'Django',
    icon: '🌿',
    group: 'Frameworks',
    description: 'Backend web con Python, desde el tutorial oficial hasta proyectos guiados.',
    accent: 'forest',
    books: [
      {
        title: 'Django documentation',
        href: 'https://docs.djangoproject.com/es/stable/',
        author: 'Django Software Foundation',
        formats: ['HTML'],
      },
      {
        title: 'Tutorial de Django Girls',
        href: 'https://tutorial.djangogirls.org/es/',
        author: 'Django Girls',
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
      {
        title: 'Git, la guía sencilla',
        href: 'https://rogerdudler.github.io/git-guide/index.es.html',
        author: 'Roger Dudler',
        formats: ['HTML'],
      },
      {
        title: 'Git Immersion en español',
        href: 'https://esparta.github.io/gitimmersion-spanish/',
        formats: ['HTML'],
      },
      {
        title: 'Git Magic',
        href: 'http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/es/',
        author: 'Ben Lynn',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'docker',
    title: 'Docker',
    icon: '📦',
    group: 'Herramientas',
    description: 'Contenedores, imágenes y flujos reproducibles para desarrollo y despliegue.',
    accent: 'cyan',
    books: [
      {
        title: 'Docker en español',
        href: 'https://github.com/brunocascio/docker-espanol',
        author: 'Bruno Cascio',
        formats: ['HTML'],
      },
      {
        title: 'Introducción a Docker',
        href: '/books/docker-introduccion.pdf',
        author: 'RedIRIS',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'linux',
    title: 'Linux y terminal',
    icon: '⌨️',
    group: 'Herramientas',
    description: 'Sistema, shell y fundamentos para moverte con soltura en entornos Unix.',
    accent: 'ink',
    books: [
      {
        title: 'El libro del administrador de Debian',
        href: 'https://debian-handbook.info/browse/es-ES/stable/',
        author: 'Raphaël Hertzog y Roland Mas',
        formats: ['HTML'],
      },
      {
        title: 'El Manual de BASH Scripting Básico para Principiantes',
        href: 'https://es.wikibooks.org/wiki/El_Manual_de_BASH_Scripting_B%C3%A1sico_para_Principiantes',
        author: 'Wikilibros',
        formats: ['HTML'],
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
      {
        title: 'Apuntes básicos de SQL',
        href: '/books/sql-apuntes-basicos.pdf',
        author: 'Unai Estébanez',
        formats: ['PDF'],
      },
      {
        title: 'Introducción al diseño de bases de datos',
        href: '/books/bases-datos-diseno-introduccion.pdf',
        author: 'Jordi Casas Roma',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'nosql',
    title: 'NoSQL',
    icon: '🧩',
    group: 'Bases de datos',
    description: 'MongoDB, Redis y modelos no relacionales para ampliar la caja de herramientas.',
    accent: 'plum',
    books: [
      {
        title: 'El pequeño libro de MongoDB',
        href: 'https://github.com/uokesita/the-little-mongodb-book',
        author: 'Karl Seguin, traducido por Osledy Bazo',
        formats: ['HTML'],
      },
      {
        title: 'El pequeño libro de Redis en castellano',
        href: 'https://raulexposito.com/the-little-redis-book-en-castellano.html',
        author: 'Karl Seguin, traducido por Raúl Expósito',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'sistemas-operativos',
    title: 'Sistemas operativos',
    icon: '💽',
    group: 'Fundamentos',
    description: 'Procesos, memoria, archivos y concurrencia para entender qué hay debajo del stack.',
    accent: 'ink',
    books: [
      {
        title: 'Sistemas Operativos',
        href: '/books/sistemas-operativos-wolf.pdf',
        author: 'Gunnar Wolf, Esteban Ruiz, Federico Bergero, Erwin Meza',
        formats: ['PDF'],
      },
    ],
  },
  {
    slug: 'ia',
    title: 'Inteligencia Artificial',
    icon: '✨',
    group: 'IA y datos',
    description: 'Fundamentos de aprendizaje automático, agentes y razonamiento computacional.',
    accent: 'blue',
    books: [
      {
        title: 'Inteligencia Artificial: un enfoque moderno',
        href: 'https://iaarbook.github.io/',
        author: 'Peter Norvig y Stuart Russell, adaptación abierta',
        formats: ['HTML'],
      },
    ],
  },
  {
    slug: 'metodologias',
    title: 'Metodologías de desarrollo',
    icon: '🧭',
    group: 'Fundamentos',
    description: 'Scrum, XP y prácticas de equipo para construir software de forma sostenible.',
    accent: 'terracotta',
    books: [
      {
        title: 'Guía Scrum',
        href: '/books/guia-scrum-european.pdf',
        author: 'EuropeanScrum.org',
        formats: ['PDF'],
      },
      {
        title: 'Scrum y XP desde las trincheras',
        href: '/books/scrum-y-xp-desde-las-trincheras.pdf',
        author: 'Henrik Kniberg',
        formats: ['PDF'],
      },
    ],
  },
];

export const allBooks = librarySections.flatMap((section) =>
  section.books.map((book) => ({ ...book, section: section.title, group: section.group, slug: section.slug })),
);

const bookSlugCounts = new Map<string, number>();

export const localPdfBooks: LocalPdfBook[] = librarySections.flatMap((section) =>
  section.books.filter(isLocalPdfBook).map((book) => {
    const pdfHref = getBookPdfHref(book);
    const fileName = getPdfFileName(pdfHref);
    const baseSlug = slugifyBook(fileName.replace(/\.pdf$/i, '')) || slugifyBook(book.title);
    const slugCount = bookSlugCounts.get(baseSlug) ?? 0;
    const bookSlug = slugCount === 0 ? baseSlug : `${baseSlug}-${section.slug}`;

    bookSlugCounts.set(baseSlug, slugCount + 1);

    return {
      ...book,
      section,
      sectionSlug: section.slug,
      bookSlug,
      pdfHref,
      fileName,
      readerPath: `/leer/${bookSlug}/`,
      downloadPath: `/descargar/${bookSlug}/`,
    };
  }),
);

export const getLocalPdfBook = (book: LibraryBook) =>
  localPdfBooks.find((pdfBook) => pdfBook.href === book.href && pdfBook.title === book.title);

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
