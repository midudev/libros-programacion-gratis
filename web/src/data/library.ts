import epubManifest from './epubManifest.json' with { type: 'json' };

const availableEpubs = new Set(epubManifest as string[]);

export type LibraryBook = {
  id: string;
  title: string;
  href: string;
  pdfHref?: string;
  epubHref?: string;
  author?: string;
  formats?: string[];
  note?: string;
};

export type LocalPdfBook = LibraryBook & {
  section: LibrarySection;
  sectionSlug: string;
  bookSlug: string;
  pdfHref: string;
  epubHref?: string;
  epubFileName?: string;
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
        id: '97-cosas-que-todo-programador-debe-saber',
        title: '97 cosas que todo programador debe saber',
        href: '/97-cosas-programador/',
        pdfHref: '/books/97-cosas-que-todo-programador-deberia-saber.pdf',
        author: 'Kevlin Henney',
        formats: ['HTML', 'PDF'],
      },
      {
        id: '100cosasdev',
        title: '100 cosas que todo programador debe saber',
        href: 'https://100cosas.dev/',
        pdfHref: 'https://100cosas.dev/100cosas-es.pdf',
        author: 'midudev',
        formats: ['HTML', 'PDF'],
      },
      {
        id: 'los-apuntes-de-majo',
        title: 'Los apuntes de Majo',
        href: 'https://losapuntesdemajo.vercel.app/',
        author: 'Majo Ledesma',
        formats: ['HTML'],
      },
    
      {
        id: 'el-camino-a-un-mejor-programador',
        title: "El camino a un mejor programador",
        href: "http://emanchado.github.io/camino-mejor-programador/downloads/camino_2013-01-19_0688b6e.html",
        author: "Esteban Manchado Velázquez, Joaquín Caraballo Moreno, Yeray Darias Camacho",
        formats: ["HTML"],
      },
      {
        id: 'programacion-de-videojuegos-sdl',
        title: "Programación de videojuegos SDL",
        href: "http://libros.metabiblioteca.org/bitstream/001/271/8/Programacion_Videojuegos_SDL.pdf",
        author: "Alberto García Serrano",
        formats: ["PDF"],
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
        id: 'diseno-de-algoritmos-en-pseudocodigo-y-ordinogramas',
        title: 'Diseño de Algoritmos en Pseudocódigo y Ordinogramas',
        href: '/books/algoritmos-pseudocodigo-ordinogramas.pdf',
        author: 'Carlos Pes',
        formats: ['PDF'],
      },
      {
        id: 'estructuras-de-datos',
        title: 'Estructuras de datos',
        href: '/books/estructuras-de-datos.pdf',
        author: 'Luis Fernando Zapata Alvarez',
        formats: ['PDF'],
      },
      {
        id: 'problemas-y-algoritmos',
        title: 'Problemas y Algoritmos',
        href: '/books/problemas-y-algoritmos.pdf',
        author: 'Luis E. Vargas Azcona',
        formats: ['PDF'],
      },
      {
        id: 'las-bases-conceptuales-de-la-programacion',
        title: 'Las bases conceptuales de la Programación',
        href: '/books/bases-conceptuales-programacion.pdf',
        author: 'Pablo E. “Fidel” Martínez López',
        formats: ['PDF'],
      },
      {
        id: 'introduccion-a-la-logica-de-programacion',
        title: 'Introducción a la Lógica de Programación',
        href: '/books/logica-de-programacion.pdf',
        author: 'Jorge O. Herrera M., Julián E. Gutiérrez P., Robinson Pulgarín G.',
        formats: ['PDF'],
      },
      {
        id: 'fundamentos-de-la-programacion',
        title: 'Fundamentos de la programación',
        href: '/books/fundamentos-programacion.pdf',
        author: 'Luis Hernández Yáñez',
        formats: ['PDF'],
      },
      {
        id: 'introduccion-a-la-programacion-orientada-a-objetos',
        title: 'Introducción a la programación orientada a objetos',
        href: '/books/introduccion-poo.pdf',
        author: 'Vicent Moncho Mas',
        formats: ['PDF'],
      },
      {
        id: 'apuntes-de-estructuras-de-datos-y-algoritmos',
        title: 'Apuntes de Estructuras de Datos y Algoritmos',
        href: '/books/apuntes-estructuras-datos-algoritmos.pdf',
        author: 'Javier Campos',
        formats: ['PDF'],
      },
    
      {
        id: 'fundamentos-de-informatica-y-programacion',
        title: "Fundamentos de Informática y Programación",
        href: "https://informatica.uv.es/docencia/fguia/TI/Libro/Libro_Fundamentos_Inform_Program.htm",
        author: "Gregorio Martín Quetglás, Francisco Toledo Lobo, Vicente Cerverón Lleó",
        formats: ["HTML"],
      },
      {
        id: 'analisis-diseno-e-implantacion-de-algoritmos',
        title: "Análisis, Diseño e Implantación de Algoritmos",
        href: "http://fcasua.contad.unam.mx/apuntes/interiores/docs/20181/informatica/1/LI_1164_06097_A_Analisis_Diseno_Implantacion_Algoritmos_Plan2016.pdf",
        formats: ["PDF"],
      },
      {
        id: 'algoritmos-y-programacion-guia-para-docentes',
        title: "Algoritmos y Programación (Guía para docentes)",
        href: "http://www.eduteka.org/pdfdir/AlgoritmosProgramacion.pdf",
        author: "Juan Carlos López García",
        formats: ["PDF"],
      },
      {
        id: 'fundamentos-de-programacion-wikilibros',
        title: 'Fundamentos de programación (WikiLibros)',
        href: 'https://es.wikibooks.org/wiki/Fundamentos_de_programaci%C3%B3n',
        author: 'WikiLibros',
        formats: ['HTML'],
      },
      {
        id: 'introduccion-a-la-programacion-wikilibros',
        title: 'Introducción a la programación (WikiLibros)',
        href: 'https://es.wikibooks.org/wiki/Introducci%C3%B3n_a_la_Programaci%C3%B3n',
        author: 'WikiLibros',
        formats: ['HTML'],
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
        id: 'diseno-de-interfaces-web',
        title: 'Diseño de Interfaces Web',
        href: 'http://interfacesweb.github.io/unidades/',
        author: 'Pedro Prieto',
        formats: ['HTML'],
      },
      {
        id: 'estructura-con-css',
        title: 'Estructura con CSS',
        href: 'https://es.learnlayout.com/',
        author: 'Learn CSS Layout, traducido al español',
        formats: ['HTML'],
      },
      {
        id: 'mdn-html',
        title: 'MDN: HTML',
        href: 'https://developer.mozilla.org/es/docs/Web/HTML',
        author: 'MDN Web Docs',
        formats: ['HTML'],
      },
      {
        id: 'mdn-css',
        title: 'MDN: CSS',
        href: 'https://developer.mozilla.org/es/docs/Web/CSS',
        author: 'MDN Web Docs',
        formats: ['HTML'],
      },
    
      {
        id: 'el-gran-libro-del-diseno-web',
        title: "El gran libro del diseño web",
        href: "https://freeditorial.com/es/books/el-gran-libro-del-diseno-web",
        author: "Rither Cobeña C",
        formats: ["HTML"],
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
        id: 'javascript-elocuente-cuarta-edicion',
        title: 'JavaScript elocuente (Cuarta edición)',
        href: '/books/javascript-elocuente-cuarta-edicion.pdf',
        author: 'Marijn Haverbeke',
        formats: ['PDF'],
      },
      {
        id: 'javascript-inspirate',
        title: 'JavaScript, ¡Inspírate!',
        href: 'https://leanpub.com/javascript-inspirate',
        author: 'Ulises Gascón',
        formats: ['eBook'],
      },
      {
        id: 'javascript-moderno',
        title: 'JavaScript Moderno',
        href: 'https://es.javascript.info/',
        author: 'Ilya Kantor',
        formats: ['HTML'],
      },
      {
        id: 'you-don-t-know-js-traduccion-al-espanol',
        title: 'You Don’t Know JS (traducción al español)',
        href: 'https://github.com/You-Dont-Know-JS-ES/Traduccion',
        author: 'Kyle Simpson, traducido por You-Dont-Know-JS-ES',
        formats: ['HTML'],
      },
      {
        id: 'mdn-guia-de-javascript',
        title: 'MDN: Guía de JavaScript',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide',
        formats: ['HTML'],
      },
      {
        id: 'learn-javascript',
        title: 'Learn JavaScript',
        href: 'https://javascript.sumankunwar.com.np/es',
        author: 'Suman Kunwar',
        formats: ['HTML'],
      },
      {
        id: 'introduccion-a-javascript',
        title: 'Introducción a JavaScript',
        href: '/books/javascript-introduccion-eguiluz.pdf',
        author: 'Javier Eguíluz Pérez',
        formats: ['PDF'],
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        href: '/books/javascript-uoc.pdf',
        author: 'Jordi Collell Puig y Anna Ferry Mestres',
        formats: ['PDF'],
      },
      {
        id: 'asincronismo-en-javascript',
        title: 'Asincronismo en JavaScript',
        href: '/books/javascript-asincronismo.pdf',
        author: 'Charly Cimino',
        formats: ['PDF'],
      },
      {
        id: 'fundamentos-de-jquery',
        title: 'Fundamentos de jQuery',
        href: '/books/jquery-fundamentos.pdf',
        author: 'Rebecca Murphey, traducido por Leandro D’Onofrio',
        formats: ['PDF'],
      },
      {
        id: 'css3-y-javascript-avanzado',
        title: 'CSS3 y Javascript avanzado',
        href: '/books/css3-javascript-avanzado.pdf',
        author: 'Jordi Collell Puig',
        formats: ['PDF'],
      },
      {
        id: 'full-stack-open',
        title: 'Full Stack Open',
        href: 'https://fullstackopen.com/es/',
        author:
          'Universidad de Helsinki, traducido al español por Sebastian Torres, Cynthia Vico Vacca y Pablo Maffioli',
        formats: ['HTML'],
        note:
          'Curso full-stack moderno basado en JavaScript con React, Node.js, MongoDB, GraphQL y TypeScript. La parte 11 de CI/CD está disponible en inglés.',
      },
      {
        id: 'clean-code-javascript-en-espanol',
        title: 'Clean Code JavaScript en Español',
        href: 'https://github.com/andersontr15/clean-code-javascript-es',
        author: 'Ryan McDermott, traducido al español por Theodore Anderson',
        formats: ['HTML'],
        note:
          'Guía práctica de buenas prácticas para JavaScript: variables, funciones, clases, SOLID, pruebas, concurrencia, manejo de errores, formato y comentarios.',
      },
    
      {
        id: 'manual-de-javascript',
        title: "Manual de JavaScript",
        href: "https://desarrolloweb.com/manuales/manual-javascript.html#capitulos20",
        formats: ["HTML"],
      },
      {
        id: 'javascript-definitivo-vol-i',
        title: "JavaScript Definitivo Vol. I",
        href: "https://github.com/afuggini/javascript-definitivo-vol1",
        author: "Ariel Fuggini",
        formats: ["HTML"],
      },
      {
        id: 'tutorial-de-d3',
        title: "Tutorial de D3",
        href: "http://gcoch.github.io/D3-tutorial/index.html",
        author: "Scott Murray",
        formats: ["HTML"],
      },
      {
        id: 'manual-de-jquery',
        title: "Manual de jQuery",
        href: "http://mundosica.github.io/tutorial_hispano_jQuery/",
        author: "MundoSICA, et al",
        formats: ["HTML"],
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
        id: 'typescript-introduccion-a-typescript',
        title: 'Introducción a TypeScript',
        href: 'https://khru.gitbooks.io/typescript/',
        author: 'Emmanuel Valverde Ramos',
        formats: ['HTML'],
      },
      {
        id: 'typescript-en-profundidad',
        title: 'TypeScript en Profundidad',
        href: 'https://github.com/melissarofman/typescript-book',
        author: 'Basarat Ali Syed, traducido por Melissa Rofman',
        formats: ['HTML'],
      },
      {
        id: 'typescript-introduccion-a-typescript-adictos',
        title: 'Introducción a TypeScript',
        href: '/books/typescript-introduccion-adictos-trabajo.pdf',
        author: 'Adictos al Trabajo',
        formats: ['PDF'],
      },
      {
        id: 'typescript-para-principiantes',
        title: 'TypeScript para Principiantes',
        href: '/books/typescript-para-principiantes-envato-tuts.pdf',
        author: 'Envato Tuts+',
        formats: ['PDF'],
      },
      {
        id: 'manual-de-typescript',
        title: 'Manual de TypeScript',
        href: 'https://mega.nz/#!qwcFDZ7a!ggLXIZ4c-O1Do0OEuvK0Mz8k39LvYQwdaJ2LtKKxgsE',
        author: 'Emmanuel Valverde y Pedro Hernández-Mora',
        formats: ['eBook'],
      },
      {
        id: 'uso-avanzado-de-typescript-en-un-ejemplo-real',
        title: 'Uso avanzado de TypeScript en un ejemplo real',
        href: 'https://neliosoftware.com/es/blog/uso-avanzado-de-typescript/',
        author: 'Nelio Software',
        formats: ['HTML'],
      },
      {
        id: 'aprendizaje-typescript',
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
        id: 'aprende-python',
        title: 'Aprende Python',
        href: '/books/python-aprende-sergio-delgado-quintero.pdf',
        author: 'Sergio Delgado Quintero',
        formats: ['PDF'],
      },
      {
        id: 'python-para-todos',
        title: 'Python para todos',
        href: '/books/python-para-todos.pdf',
        author: 'Raúl González Duque',
        formats: ['PDF'],
      },
      {
        id: 'think-python-en-espanol',
        title: 'Think Python en español',
        href: 'https://libropython.es/',
        pdfHref: 'https://libropython.es/think-python-es.pdf',
        author: 'Allen B. Downey, traducido por midudev',
        formats: ['HTML', 'PDF'],
      },
      {
        id: 'aprenda-a-pensar-como-un-programador-con-python',
        title: 'Aprenda a pensar como un programador con Python',
        href: '/books/python-pensar-programador.pdf',
        author:
          'Allen Downey, Jeffrey Elkner, Chris Meyers',
        formats: ['PDF'],
      },
      {
        id: 'python-para-todos-explorando-la-informacion-con-python-3',
        title: 'Python para todos, Explorando la información con Python 3',
        href: '/books/python-explorando-informacion.pdf',
        author:
          'Charles R. Severance',
        formats: ['PDF'],
      },
      {
        id: 'manual-basico-iniciacion-a-python-3',
        title: 'Manual básico, iniciación a Python 3',
        href: '/books/python-manual-basico.pdf',
        author: 'José Miguel Ruiz Torres',
        formats: ['PDF'],
      },
      {
        id: 'python-intermedio',
        title: 'Python Intermedio',
        href: '/books/python-intermedio.pdf',
        author: 'Comunidad ellibrodepython.com',
        formats: ['PDF'],
      },
      {
        id: 'inmersion-en-python-3',
        title: 'Inmersión en Python 3',
        href: '/books/python-inmersion.pdf',
        author: 'Mark Pilgrim, traducido por José Miguel González Aguilera',
        formats: ['PDF'],
      },
      {
        id: 'ejercicios-basicos-de-programacion-resueltos-en-python',
        title: 'Ejercicios básicos de programación resueltos en Python',
        href: '/books/python-ejercicios-basicos.pdf',
        formats: ['PDF'],
      },
      {
        id: 'introduccion-a-python-para-calculo-cientifico',
        title: 'Introducción a Python para cálculo científico',
        href: '/books/python-calculo-cientifico.pdf',
        author: 'A. Garcimartín',
        formats: ['PDF'],
      },
      {
        id: 'introduccion-a-la-programacion-con-python-3',
        title: 'Introducción a la programación con Python 3',
        href: '/books/python-introduccion-programacion-3.pdf',
        author: 'Andrés Marzal Varó, Isabel Gracia Luengo, Pedro García-Sevilla',
        formats: ['PDF'],
      },
      {
        id: 'apuntes-python',
        title: 'Apuntes Python',
        href: '/books/python-apuntes.pdf',
        author: 'Manuel Vergara',
        formats: ['PDF'],
      },
      {
        id: 'inventa-tus-propios-juegos-de-computadora-con-python',
        title: 'Inventa tus propios juegos de computadora con Python',
        href: '/books/python-inventa-juegos.pdf',
        author: 'Al Sweigart',
        formats: ['PDF'],
      },
      {
        id: 'el-tutorial-de-python',
        title: 'El tutorial de Python',
        href: 'https://docs.python.org/es/3/tutorial/',
        author: 'Python Software Foundation',
        formats: ['HTML'],
      },
    
      {
        id: 'introduccion-a-programando-con-python',
        title: "Introducción a Programando con Python",
        href: "http://opentechschool.github.io/python-beginners/es_CL/",
        author: "OpenTechSchool, et al",
        formats: ["HTML"],
      },
      {
        id: 'python-para-ciencia-e-ingenieria',
        title: "Python para ciencia e ingeniería",
        href: "https://github.com/mgaitan/curso-python-cientifico#curso-de-python-para-ciencias-e-ingenierías",
        author: "Martín Gaitán",
        formats: ["HTML"],
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
        id: 'aprende-a-programar-con-ruby',
        title: 'Aprende a programar con Ruby',
        href: 'http://rubysur.org/aprende.a.programar',
        author: 'RubySur',
        formats: ['HTML'],
      },
      {
        id: 'ruby-en-veinte-minutos',
        title: 'Ruby en veinte minutos',
        href: 'https://www.ruby-lang.org/es/documentation/quickstart/',
        author: 'Ruby',
        formats: ['HTML'],
      },
      {
        id: 'introduccion-a-rails',
        title: 'Introducción a Rails',
        href: 'http://rubysur.org/introduccion.a.rails/',
        author: 'RubySur',
        formats: ['HTML'],
      },
    
      {
        id: 'ruby-tutorial-o-como-pasar-un-buen-rato-programando',
        title: "Ruby tutorial o cómo pasar un buen rato programando",
        href: "http://rubytutorial.wikidot.com/introduccion",
        author: "Andrés Suárez García",
        formats: ["HTML"],
      },
      {
        id: 'la-guia-de-estilos-de-ruby',
        title: "La Guía de Estilos de Ruby",
        href: "https://github.com/alemohamad/ruby-style-guide/blob/master/README-esLA.md#preludio",
        author: "Ale Mohamad",
        formats: ["HTML"],
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
        id: 'aprendizaje-rust',
        title: 'Aprendizaje Rust',
        href: '/books/rust-aprendizaje.pdf',
        author: 'RipTutorial',
        formats: ['PDF'],
      },
      {
        id: 'el-lenguaje-de-programacion-rust-2016',
        title: 'El Lenguaje de Programación Rust - 2016',
        href: 'https://goyox86.github.io/elpr/README.html',
        author: 'Jose Narvaez',
        formats: ['HTML'],
      },
      {
        id: 'el-lenguaje-de-programacion-rust-2024',
        title: 'El Lenguaje de Programación Rust - 2024',
        href: 'https://book.rustlang-es.org',
        author: 'Libro oficial traducido por RustLang en Español',
        formats: ['HTML', 'PDF'],
      },
      {
        id: 'comprehensive-rust',
        title: 'Comprehensive Rust',
        href: 'https://google.github.io/comprehensive-rust/es/',
        author: 'Google',
        formats: ['HTML', 'PDF'],
        note: 'Está planteado como workshop, muy útil para estudiar con instructor o en grupo.',
      },
      {
        id: 'rust-para-c-net-developers',
        title: 'Rust para C#/.NET Developers',
        href: 'https://dotnet-book.rustlang-es.org',
        author: 'Microsoft, traducido por RustLang en Español',
        formats: ['HTML', 'PDF'],
        note: 'Incluye comparaciones sencillas para entender bien el cambio de mentalidad entre lenguajes.',
      },
    ],
  },
  {
    slug: 'blockchain',
    title: 'Blockchain',
    icon: '⛓️',
    group: 'Lenguajes',
    description: 'Descentralización, contratos inteligentes y criptografía aplicada.',
    accent: 'indigo',
    books: [
      {
        id: 'bitcoin-un-sistema-de-efectivo-electronico-de-usuario-a-usuario',
        title: 'Bitcoin: Un sistema de efectivo electrónico de usuario a usuario',
        href: 'https://bitcoin.org/files/bitcoin-paper/bitcoin_es.pdf',
        author: 'Satoshi Nakamoto',
        formats: ['PDF'],
      },
      {
        id: 'el-libro-de-satoshi',
        title: 'El Libro de Satoshi',
        href: 'http://www.libroblockchain.com/satoshi/',
        author: 'Phil Champagne',
        formats: ['HTML'],
      },
      {
        id: 'entendiendo-el-blockchain',
        title: 'Entendiendo el Blockchain',
        href: 'https://www.secmca.org/wp-content/uploads/2019/12/Blockchain.pdf',
        author: 'SECMCA',
        formats: ['PDF'],
      },
      {
        id: 'solidity-documentacion-oficial-en-espanol',
        title: 'Solidity: Documentación oficial en español',
        href: 'https://solidity-es.readthedocs.io/',
        formats: ['HTML'],
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
        id: 'php-la-manera-correcta',
        title: 'PHP, la manera correcta',
        href: 'https://phpdevenezuela.github.io/php-the-right-way/',
        author: 'Josh Lockhart, Phil Sturgeon',
        formats: ['HTML'],
      },
      {
        id: 'programacion-en-php-a-traves-de-ejemplos',
        title: 'Programación en PHP a través de ejemplos',
        href: '/books/php-programacion-ejemplos.pdf',
        author: 'Manuel Palomo Duarte, Ildefonso Montero Pérez',
        formats: ['PDF'],
      },
      {
        id: 'poo-y-mvc-en-php',
        title: 'POO y MVC en PHP',
        href: '/books/php-poo-mvc.pdf',
        author: 'Eugenia Bahit',
        formats: ['PDF'],
      },
      {
        id: 'laboratorio-de-php-y-mysql',
        title: 'Laboratorio de PHP y MySQL',
        href: 'https://openlibro.com/wp-content/uploads/2026/03/laboratorio-php-mysql.pdf',
        author: 'Piero Berni Millet, Dídac Gil de la Iglesia',
        formats: ['PDF'],
        note: 'PDF externo: supera el límite de 25 MiB por asset de Cloudflare Workers.',
      },
    
      {
        id: 'php-y-programacion-orientada-a-objetos',
        title: "PHP y Programación orientada a objetos",
        href: "https://styde.net/php-y-programacion-orientada-a-objetos/",
        author: "Duilio Palacios",
        formats: ["HTML"],
      },
      {
        id: 'programacion-web-avanzada-ajax-y-google-maps',
        title: "Programación web avanzada: Ajax y Google Maps",
        href: "http://rua.ua.es/dspace/bitstream/10045/13176/9/04-ajaxphp.pdf",
        author: "Sergio Luján Mora, Universidad de Colima",
        formats: ["PDF"],
      },
      {
        id: 'manual-de-estudio-introductorio-al-lenguaje-php-procedural',
        title: "Manual de estudio introductorio al lenguaje PHP procedural",
        href: "https://web.archive.org/web/20140209203630/http://www.cursosdeprogramacionadistancia.com/static/pdf/material-sin-personalizar-php.pdf",
        author: "Eugenia Bahit",
        formats: ["PDF"],
      },
      {
        id: 'symfony-5-la-via-rapida',
        title: "Symfony 5: La Vía Rápida",
        href: "https://web.archive.org/web/20210805141343/https://symfony.com/doc/current/the-fast-track/es/index.html",
        author: "Fabien Potencier",
        formats: ["HTML"],
      },
      {
        id: 'gu-a-definitiva-de-yii-2-0',
        title: "Guía Definitiva de Yii 2.0",
        href: "https://www.yiiframework.com/doc/download/yii-guide-2.0-es.pdf",
        author: "Yii Software",
        formats: ["PDF"],
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
        id: 'piensa-en-haskell',
        title: 'Piensa en Haskell',
        href: '/books/haskell-piensa.pdf',
        author: 'José A. Alonso Jiménez, Mª José Hidalgo Doblado',
        formats: ['PDF'],
      },
      {
        id: 'aprende-haskell-por-el-bien-de-todos',
        title: '¡Aprende Haskell por el bien de todos!',
        href: 'http://aprendehaskell.es/main.html',
        formats: ['HTML'],
      },
      {
        id: 'piensa-en-haskell-y-en-python',
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
        id: 'el-pequeno-libro-de-go',
        title: 'El pequeño libro de Go',
        href: '/books/go-pequeno-libro.pdf',
        author: 'Karl Seguin, traducido por Raúl Exposito',
        formats: ['PDF'],
      },
      {
        id: 'go-en-espanol',
        title: 'Go en Español',
        href: 'https://nachopacheco.gitbooks.io/go-es/content/doc/',
        author: 'Nacho Pacheco',
        formats: ['HTML'],
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
        id: 'curso-programacion-android-en-kotlin',
        title: 'Curso programación Android en Kotlin',
        href: 'https://cursokotlin.com/curso-programacion-kotlin-android/',
        author: 'AristiDevs',
        formats: ['HTML'],
      },
      {
        id: 'kotlin',
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
        id: 'manual-programacion-android',
        title: 'Manual Programación Android',
        href: 'https://aluzardo.github.io/trabajo-fin-de-grado/Tutoriales/Manual%20Programacion%20Android.pdf',
        author: 'Salvador Gómez Oliver',
        formats: ['PDF'],
      },
      {
        id: 'curso-sobre-los-aspectos-basicos-de-android-con-compose',
        title: 'Curso sobre los aspectos básicos de Android con Compose',
        href: 'https://developer.android.com/courses/android-basics-compose/course?hl=es-419',
        author: 'Android Developers',
        formats: ['HTML'],
      },
    
      {
        id: 'manual-de-programacion-android-v-2-0',
        title: "Manual de Programación Android v.2.0",
        href: "http://ns2.elhacker.net/timofonica/manuales/Manual_Programacion_Android_v2.0.pdf",
        author: "Salvador Gómez Oliver",
        formats: ["PDF"],
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
        id: 'c-introduccion-a-la-programacion-con-c',
        title: 'Introducción a la Programación con C',
        href: '/books/c-introduccion-programacion.pdf',
        author: 'Andrés Marzal Varó, Isabel Gracia Luengo',
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
        id: 'c-estandar',
        title: 'C++ estándar',
        href: '/books/cpp-estandar.pdf',
        author: 'Miguel Hernando Gutiérrez',
        formats: ['PDF'],
      },
      {
        id: 'programacion-orientada-a-objetos-ejercicios-propuestos-con-c',
        title: 'Programación orientada a objetos Ejercicios propuestos con C++',
        href: '/books/cpp-poo-ejercicios.pdf',
        author: 'Cristina Cachero, Pedro J. Ponce de León',
        formats: ['PDF'],
      },
      {
        id: 'fundamentos-basicos-de-programacion-en-c',
        title: 'Fundamentos Básicos de Programación en C++',
        href: '/books/cpp-fundamentos-basicos.pdf',
        author: 'Francisco Martínez del Río',
        formats: ['PDF'],
      },
      {
        id: 'curso-de-c',
        title: 'Curso de C++',
        href: 'https://conclase.net/c/curso',
        author: 'Con Clase',
        formats: ['HTML'],
      },
    
      {
        id: 'aprenda-c-avanzado-como-si-estuviera-en-primero',
        title: "Aprenda C++ avanzado como si estuviera en primero",
        href: "https://web.archive.org/web/20100701020037/http://www.tecnun.es/asignaturas/Informat1/AyudaInf/aprendainf/cpp/avanzado/cppavan.pdf",
        author: "Paul Bustamante, Iker Aguinaga, Miguel Aybar, Luis Olaizola, Iñigo Lazcano",
        formats: ["PDF"],
      },
      {
        id: 'ejercicios-de-programacion-creativos-y-recreativos-en-c',
        title: "Ejercicios de programación creativos y recreativos en C++",
        href: "http://antares.sip.ucm.es/cpareja/libroCPP/",
        author: "Luis Llana, Carlos Gregorio, Raquel Martínez, Pedro Palao, Cristóbal Pareja",
        formats: ["HTML"],
      },
      {
        id: 'aprenda-c-basico-como-si-estuviera-en-primero',
        title: "Aprenda C++ básico como si estuviera en primero",
        href: "https://web.archive.org/web/20100701020025/http://www.tecnun.es/asignaturas/Informat1/AyudaInf/aprendainf/cpp/basico/cppbasico.pdf",
        author: "Paul Bustamante, Iker Aguinaga, Miguel Aybar, Luis Olaizola, Iñigo Lazcano",
        formats: ["PDF"],
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
        id: 'csharp-introduccion-a-la-programacion-con-c',
        title: 'Introducción a la programación con C#',
        href: '/books/csharp-introduccion-programacion.pdf',
        author: 'Nacho Cabanes',
        formats: ['PDF'],
      },
      {
        id: 'el-pequeno-libro-de-asp-net-core',
        title: 'El pequeño libro de ASP.NET Core',
        href: '/books/aspnet-core-pequeno-libro.pdf',
        author: 'Nate Barbettini',
        formats: ['PDF'],
      },
    
      {
        id: 'guia-de-arquitectura-n-capas-orientadas-al-dominio',
        title: "Guía de Arquitectura N-capas Orientadas al Dominio",
        href: "https://blogs.msdn.microsoft.com/cesardelatorre/2010/03/11/nuestro-nuevo-libro-guia-de-arquitectura-n-capas-ddd-net-4-0-y-aplicacion-ejemplo-en-disponibles-para-download-en-msdn-y-codeplex",
        author: "Cesar De la Torre",
        formats: ["HTML"],
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
        id: 'fundamentos-de-programacion-en-java',
        title: 'Fundamentos de programación en Java',
        href: 'https://es.slideshare.net/slideshow/java-fundamentos/23333338',
        author: 'Jorge Martínez Ladrón',
        formats: ['PDF'],
      },
      {
        id: 'iniciando-en-java-programacion-para-todos',
        title: 'Iniciando en Java: Programación para Todos',
        href: '/books/java-iniciando-programacion.pdf',
        author: 'Julián Camilo Tuta Diaz',
        formats: ['PDF'],
      },
      {
        id: 'java-apuntes-basicos',
        title: 'Java Apuntes Básicos',
        href: '/books/java-apuntes-basicos.pdf',
        author: 'Jorge A. López Vargas',
        formats: ['PDF'],
      },
      {
        id: 'java-basico-para-aprendices',
        title: 'Java básico para aprendices',
        href: '/books/java-basico-aprendices.pdf',
        author: 'Manuel Jesús Abanto Morales et al.',
        formats: ['PDF'],
      },
      {
        id: 'introduccion-a-la-programacion-orientada-a-objetos-con-java',
        title: 'Introducción a la Programación Orientada a Objetos con Java',
        href: '/books/java-introduccion-poo.pdf',
        author:
          'Rafael Llobet Azpitarte, Pedro Alonso Jordá, Jaume Devesa Llinares, Emili Miedes De Elías, María Idoia Ruiz Fuertes, Francisco Torres Goterris',
        formats: ['PDF'],
      },
      {
        id: 'ejercicios-de-programacion-en-java',
        title: 'Ejercicios de Programación en Java',
        href: '/books/java-ejercicios-programacion.pdf',
        author: 'Francisco Manuel Pérez Montes',
        formats: ['PDF'],
      },
    
      {
        id: 'desarrollando-con-java-8-poker',
        title: "Desarrollando con Java 8: Poker",
        href: "https://ia601504.us.archive.org/21/items/DesarrollandoConJava8Poker/DesarrollandoConJava8Poker.pdf",
        author: "David Pérez Cabrera",
        formats: ["PDF"],
      },
      {
        id: 'plugin-apache-tapestry-desarrollo-de-aplicaciones-y-paginas-web',
        title: "PlugIn Apache Tapestry: desarrollo de aplicaciones y páginas web",
        href: "https://picodotdev.github.io/blog-bitix/assets/custom/PlugInTapestry.pdf",
        formats: ["PDF"],
      },
      {
        id: 'preparando-javasun-6-ocpjp6',
        title: "Preparando JavaSun 6 - OCPJP6",
        href: "https://github.com/PabloReyes/ocpjp-resumen-espanol#ocpjp6-resumen-español",
        author: "Pablo Reyes Almagro",
        formats: ["PDF","HTML"],
      },
      {
        id: 'tutorial-basico-de-java-ee',
        title: "Tutorial básico de Java EE",
        href: "http://static1.1.sqspcdn.com/static/f/923743/14770633/1416082087870/JavaEE.pdf",
        author: "Abraham Otero",
        formats: ["PDF"],
      },
      {
        id: 'tutorial-introduccion-a-maven-3',
        title: "Tutorial introducción a Maven 3",
        href: "http://static1.1.sqspcdn.com/static/f/923743/15025126/1320942755733/Tutorial_de_Maven_3_Erick_Camacho.pdf",
        author: "Erick Camacho",
        formats: ["PDF"],
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
        id: 'r-para-ciencia-de-datos',
        title: 'R para Ciencia de Datos',
        href: 'https://es.r4ds.hadley.nz/',
        author: 'Hadley Wickham y Garrett Grolemund',
        formats: ['HTML'],
      },
      {
        id: 'introduccion-a-r',
        title: 'Introducción a R',
        href: '/books/r-introduccion.pdf',
        author: 'Andrés González y Silvia González',
        formats: ['PDF'],
      },
    
      {
        id: 'cartas-sobre-estadistica-de-la-revista-argentina-de-bioingenieria',
        title: "Cartas sobre Estadística de la Revista Argentina de Bioingeniería",
        href: "http://cran.r-project.org/doc/contrib/Risk-Cartas-sobre-Estadistica.pdf",
        author: "Marcelo R. Risk",
        formats: ["PDF"],
      },
      {
        id: 'generacion-automatica-de-reportes-con-r-y-latex',
        title: "Generación automática de reportes con R y LaTeX",
        href: "http://cran.r-project.org/doc/contrib/Rivera-Tutorial_Sweave.pdf",
        author: "Mario Alfonso Morales Rivera",
        formats: ["PDF"],
      },
      {
        id: 'graficos-estadisticos-con-r',
        title: "Gráficos Estadísticos con R",
        href: "http://cran.r-project.org/doc/contrib/grafi3.pdf",
        author: "Juan Carlos Correa, Nelfi González",
        formats: ["PDF"],
      },
      {
        id: 'introduccion-al-uso-y-programacion-del-sistema-estadistico-r',
        title: "Introducción al uso y programación del sistema estadístico R",
        href: "http://cran.r-project.org/doc/contrib/curso-R.Diaz-Uriarte.pdf",
        author: "Ramón Díaz-Uriarte",
        formats: ["PDF"],
      },
      {
        id: 'metodos-estadisticos-con-r-y-r-commander',
        title: "Métodos Estadísticos con R y R Commander",
        href: "http://cran.r-project.org/doc/contrib/Saez-Castillo-RRCmdrv21.pdf",
        author: "Antonio José Sáez Castillo",
        formats: ["PDF"],
      },
      {
        id: 'optimizacion-matematica-con-r-volumen-i',
        title: "Optimización Matemática con R: Volumen I",
        href: "http://cran.r-project.org/doc/contrib/Optimizacion_Matematica_con_R_Volumen_I.pdf",
        author: "Enrique Gabriel Baquela, Andrés Redchuk",
        formats: ["PDF"],
      },
      {
        id: 'r-para-principiantes',
        title: "R para Principiantes",
        href: "http://cran.r-project.org/doc/contrib/rdebuts_es.pdf",
        author: "Michel Schinz, Philipp Haller",
        formats: ["PDF"],
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
        id: 'react-de-aprendiz-a-maestro',
        title: 'React: De aprendiz a maestro',
        href: '/books/react-aprendiz-maestro.pdf',
        author: 'Raúl Expósito',
        formats: ['PDF'],
      },
      {
        id: 'react',
        title: 'React',
        href: '/books/react-stackoverflow-docs.pdf',
        author: 'Stack Overflow Documentation',
        formats: ['PDF'],
      },
      {
        id: 'preguntas-de-entrevista-de-react-js',
        title: 'Preguntas de entrevista de React.js',
        href: 'https://www.reactjs.wiki/',
        author: 'Miguel Ángel Durán',
        formats: ['HTML'],
      },
      {
        id: 'desarrollo-de-aplicaciones-web-con-react-js-y-redux-js',
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
        id: 'qwik-desde-cero-a-produccion',
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
        id: 'node-beginner-book',
        title: 'Node Beginner Book',
        href: 'https://www.nodebeginner.org/index-es.html',
        author: 'Manuel Kiessling',
        formats: ['HTML'],
      },
    
      {
        id: 'introduccion-a-node-js-a-traves-de-koans',
        title: "Introducción a Node.js a través de Koans",
        href: "http://nodejskoans.com",
        author: "Arturo Muñoz de la Torre",
        formats: ["PDF","HTML"],
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
        id: 'entendiendo-angular',
        title: 'Entendiendo Angular',
        href: 'https://jorgeucano.gitbook.io/entendiendo-angular/',
        author: 'Jorge Cano',
        formats: ['HTML'],
      },
    
      {
        id: 'manual-de-angularjs',
        title: "Manual de AngularJS",
        href: "https://desarrolloweb.com/manuales/manual-angularjs.html",
        author: "desarrolloweb.com",
        formats: ["HTML"],
      },
      {
        id: 'guia-de-estilo-angularjs',
        title: "Guía de estilo AngularJS",
        href: "https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/es-ES.md",
        author: "John Papa, et al",
        formats: ["HTML"],
      },
      {
        id: 'aprendizaje-angular',
        title: "Aprendizaje Angular",
        href: "https://riptutorial.com/Download/angular-es.pdf",
        author: "Stack Overflow Documentation",
        formats: ["PDF"],
      },
      {
        id: 'aprendizaje-angular-2',
        title: "Aprendizaje Angular 2",
        href: "https://riptutorial.com/Download/angular-2-es.pdf",
        author: "Stack Overflow Documentation",
        formats: ["PDF"],
      },
      {
        id: 'angularjs',
        title: "AngularJS",
        href: "https://eladrodriguez.gitbooks.io/angularjs",
        author: "Elad Rodriguez",
        formats: ["HTML"],
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
        id: 'django-documentation',
        title: 'Django documentation',
        href: 'https://docs.djangoproject.com/es/stable/',
        author: 'Django Software Foundation',
        formats: ['HTML'],
      },
      {
        id: 'tutorial-de-django-girls',
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
        id: 'pro-git',
        title: 'Pro Git',
        href: '/books/git-pro.pdf',
        author: 'Scott Chacon y Ben Straub',
        formats: ['PDF'],
      },
      {
        id: 'git-la-guia-sencilla',
        title: 'Git, la guía sencilla',
        href: 'https://rogerdudler.github.io/git-guide/index.es.html',
        author: 'Roger Dudler',
        formats: ['HTML'],
      },
      {
        id: 'git-immersion-en-espanol',
        title: 'Git Immersion en español',
        href: 'https://esparta.github.io/gitimmersion-spanish/',
        formats: ['HTML'],
      },
      {
        id: 'git-magic',
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
        id: 'docker-en-espanol',
        title: 'Docker en español',
        href: 'https://github.com/brunocascio/docker-espanol',
        author: 'Bruno Cascio',
        formats: ['HTML'],
      },
      {
        id: 'introduccion-a-docker',
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
        id: 'el-libro-del-administrador-de-debian',
        title: 'El libro del administrador de Debian',
        href: 'https://debian-handbook.info/browse/es-ES/stable/',
        author: 'Raphaël Hertzog y Roland Mas',
        formats: ['HTML'],
      },
      {
        id: 'el-manual-de-bash-scripting-basico-para-principiantes',
        title: 'El Manual de BASH Scripting Básico para Principiantes',
        href: 'https://es.wikibooks.org/wiki/El_Manual_de_BASH_Scripting_B%C3%A1sico_para_Principiantes',
        author: 'Wikilibros',
        formats: ['HTML'],
      },
    
      {
        id: 'bash-scripting-avanzado-utilizando-declare-para-definicion-de-tipo',
        title: "BASH Scripting Avanzado: Utilizando Declare para definición de tipo",
        href: "https://web.archive.org/web/20150307181233/http://library.originalhacker.org:80/biblioteca/articulo/ver/123",
        author: "Eugenia Bahit",
        formats: ["HTML"],
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
        id: 'tutorial-de-sql',
        title: 'Tutorial de SQL',
        href: 'http://www.desarrolloweb.com/manuales/9/',
        author: 'Rubén Alvarez',
        formats: ['HTML'],
      },
      {
        id: 'manual-de-sql',
        title: 'Manual de SQL',
        href: 'http://jorgesanchez.net/manuales/sql/intro-sql-sql2016.html',
        author: 'Jorge Sanchez Asenjo',
        formats: ['HTML'],
      },
      {
        id: 'apuntes-basicos-de-sql',
        title: 'Apuntes básicos de SQL',
        href: '/books/sql-apuntes-basicos.pdf',
        author: 'Unai Estébanez',
        formats: ['PDF'],
      },
      {
        id: 'introduccion-al-diseno-de-bases-de-datos',
        title: 'Introducción al diseño de bases de datos',
        href: '/books/bases-datos-diseno-introduccion.pdf',
        author: 'Jordi Casas Roma',
        formats: ['PDF'],
      },
    
      {
        id: 'base-de-datos-2005',
        title: "Base de Datos (2005)",
        href: "http://www.uoc.edu/masters/oficiales/img/913.pdf",
        formats: ["PDF"],
      },
      {
        id: 'apuntes-de-base-de-datos-1',
        title: "Apuntes de Base de Datos 1",
        href: "http://rua.ua.es/dspace/bitstream/10045/2990/1/ApuntesBD1.pdf",
        formats: ["PDF"],
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
        id: 'el-pequeno-libro-de-mongodb',
        title: 'El pequeño libro de MongoDB',
        href: 'https://github.com/uokesita/the-little-mongodb-book',
        author: 'Karl Seguin, traducido por Osledy Bazo',
        formats: ['HTML'],
      },
      {
        id: 'el-pequeno-libro-de-redis-en-castellano',
        title: 'El pequeño libro de Redis en castellano',
        href: 'https://raulexposito.com/the-little-redis-book-en-castellano.html',
        author: 'Karl Seguin, traducido por Raúl Expósito',
        formats: ['HTML'],
      },
    
      {
        id: 'aprendizaje-amazon-dynamodb',
        title: "Aprendizaje amazon-dynamodb",
        href: "https://riptutorial.com/Download/amazon-dynamodb-es.pdf",
        author: "Stack Overflow Documentation",
        formats: ["PDF"],
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
        id: 'sistemas-operativos',
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
        id: 'inteligencia-artificial-un-enfoque-moderno',
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
        id: 'guia-scrum',
        title: 'Guía Scrum',
        href: '/books/guia-scrum-european.pdf',
        author: 'EuropeanScrum.org',
        formats: ['PDF'],
      },
      {
        id: 'scrum-y-xp-desde-las-trincheras',
        title: 'Scrum y XP desde las trincheras',
        href: '/books/scrum-y-xp-desde-las-trincheras.pdf',
        author: 'Henrik Kniberg',
        formats: ['PDF'],
      },
    
      {
        id: 'ingenieria-de-software-una-guia-para-crear-sistemas-de-informacion',
        title: "Ingeniería de Software: Una Guía para Crear Sistemas de Información",
        href: "https://web.archive.org/web/20150824055042/http://www.wolnm.org/apa/articulos/Ingenieria_Software.pdf",
        author: "Alejandro Peña Ayala",
        formats: ["PDF"],
      },
      {
        id: 'scrum-level',
        title: "Scrum Level",
        href: "https://scrumlevel.com/files/scrumlevel.pdf",
        author: "Juan Palacio, Scrum Manager",
        formats: ["PDF"],
      },
      {
        id: 'scrum-master-temario-troncal-1',
        title: "Scrum Master - Temario troncal 1",
        href: "https://scrummanager.net/files/scrum_master.pdf",
        author: "Marta Palacio, Scrum Manager",
        formats: ["PDF"],
      },
      {
        id: 'scrum-extreme-programming-para-programadores',
        title: "Scrum & Extreme Programming (para programadores)",
        href: "https://web.archive.org/web/20140209204645/http://www.cursosdeprogramacionadistancia.com/static/pdf/material-sin-personalizar-agile.pdf",
        author: "Eugenia Bahit",
        formats: ["PDF"],
      },
    ],
  },
  {
    slug: 'ensamblador',
    title: "Ensamblador",
    icon: "⚙️",
    group: "Lenguajes",
    description: "Programación a bajo nivel y arquitectura de la máquina con ensamblador.",
    accent: "ink",
    books: [
      {
        id: 'lenguaje-ensamblador-para-pc',
        title: "Lenguaje Ensamblador para PC",
        href: "https://pacman128.github.io/static/pcasm-book-spanish.pdf",
        author: "Paul A. Carter",
        formats: ["PDF"],
      },
    ],
  },
  {
    slug: 'erlang',
    title: "Erlang",
    icon: "📡",
    group: "Lenguajes",
    description: "Concurrencia, tolerancia a fallos y sistemas distribuidos con Erlang.",
    accent: "red",
    books: [
      {
        id: 'programacion-en-erlang',
        title: "Programación en Erlang",
        href: "https://es.wikibooks.org/wiki/Programaci%C3%B3n_en_Erlang",
        author: "WikiLibros",
        formats: ["HTML"],
      },
    ],
  },
  {
    slug: 'latex',
    title: "LaTeX",
    icon: "📄",
    group: "Herramientas",
    description: "Composición de documentos técnicos y científicos con LaTeX.",
    accent: "blue",
    books: [
      {
        id: 'la-introduccion-no-tan-corta-a-latex-2',
        title: "La introducción no-tan-corta a LaTeX 2ε",
        href: "http://osl.ugr.es/CTAN/info/lshort/spanish/lshort-a4.pdf",
        author: "Tobias Oetiker, Hubert Partl, Irene Hyna, Elisabeth Schlegl",
        formats: ["PDF"],
      },
    ],
  },
  {
    slug: 'lisp',
    title: "Lisp",
    icon: "λ",
    group: "Lenguajes",
    description: "Programación funcional y metaprogramación con la familia Lisp.",
    accent: "plum",
    books: [
      {
        id: 'una-introduccion-a-emacs-lisp-en-espanol',
        title: "Una Introducción a Emacs Lisp en Español",
        href: "http://savannah.nongnu.org/git/?group=elisp-es",
        formats: ["HTML"],
      },
    ],
  },
  {
    slug: 'matematicas',
    title: "Matemáticas",
    icon: "∫",
    group: "Fundamentos",
    description: "Herramientas matemáticas aplicadas a la programación y la ciencia de datos.",
    accent: "blue",
    books: [
      {
        id: 'sage-para-estudiantes-de-pregrado',
        title: "Sage para Estudiantes de Pregrado",
        href: "http://www.sage-para-estudiantes.com",
        author: "Gregory Bard",
        formats: ["HTML"],
      },
    ],
  },
  {
    slug: 'perl',
    title: "Perl",
    icon: "🐪",
    group: "Lenguajes",
    description: "Textos, scripts y automatización con el clásico lenguaje Perl.",
    accent: "terracotta",
    books: [
      {
        id: 'tutorial-perl',
        title: "Tutorial Perl",
        href: "http://es.tldp.org/Tutoriales/PERL/tutoperl-print.pdf",
        author: "Juan Julián Merelo Guervós",
        formats: ["PDF"],
      },
      {
        id: 'tutoriales-de-perl',
        title: "Tutoriales de Perl",
        href: "http://perlenespanol.com/tutoriales/",
        author: "Uriel Lizama",
        formats: ["HTML"],
      },
    ],
  },
  {
    slug: 'raku',
    title: "Raku",
    icon: "🦋",
    group: "Lenguajes",
    description: "Perl 6 / Raku: un lenguaje moderno para expresión y metaprogramación.",
    accent: "plum",
    books: [
      {
        id: 'piensa-en-perl-6',
        title: "Piensa en Perl 6",
        href: "https://uzluisf.gitlab.io/piensaperl6/",
        author: "Laurent Rosenfeld, Allen B. Downey",
        formats: ["PDF","HTML"],
      },
    ],
  },
  {
    slug: 'scala',
    title: "Scala",
    icon: "🧩",
    group: "Lenguajes",
    description: "Programación funcional y orientada a objetos sobre la JVM con Scala.",
    accent: "red",
    books: [
      {
        id: 'manual-de-scala-para-programadores-java',
        title: "Manual de Scala para programadores Java",
        href: "http://www.scala-lang.org/docu/files/ScalaTutorial-es_ES.pdf",
        author: "Emmanuel Paradis",
        formats: ["PDF"],
      },
    ],
  },
  {
    slug: 'scratch',
    title: "Scratch",
    icon: "🐱",
    group: "Fundamentos",
    description: "Primeros pasos en programación visual y pensamiento computacional.",
    accent: "orange",
    books: [
      {
        id: 'informatica-creativa',
        title: "Informática Creativa",
        href: "https://github.com/programamos/GuiaScratch",
        author: "Karen Brennan, Christan Balch, Michelle Chung",
        formats: ["PDF","HTML"],
      },
    ],
  },
  {
    slug: 'subversion',
    title: "Subversion",
    icon: "📚",
    group: "Herramientas",
    description: "Control de versiones centralizado con Subversion (SVN).",
    accent: "ink",
    books: [
      {
        id: 'control-de-versiones-con-subversion',
        title: "Control de versiones con Subversion",
        href: "http://svnbook.red-bean.com/nightly/es/index.html",
        author: "Ben Collins-Sussman, Brian W. Fitzpatrick, C. Michael Pilato",
        formats: ["HTML"],
      },
    ],
  },
];

export const allBooks = librarySections.flatMap((section) =>
  section.books.map((book) => ({ ...book, section: section.title, group: section.group, slug: section.slug })),
);

const bookSlugCounts = new Map<string, number>();

const resolveLocalEpub = (book: LibraryBook, pdfFileName: string) => {
  if (book.epubHref) {
    const fileName = book.epubHref.split(/[?#]/)[0].split('/').at(-1) ?? '';
    return { epubHref: book.epubHref, epubFileName: fileName };
  }

  const epubFileName = pdfFileName.replace(/\.pdf$/i, '.epub');

  if (availableEpubs.has(epubFileName)) {
    return { epubHref: `/books/${epubFileName}`, epubFileName };
  }

  return { epubHref: undefined, epubFileName: undefined };
};

export const localPdfBooks: LocalPdfBook[] = librarySections.flatMap((section) =>
  section.books.filter(isLocalPdfBook).map((book) => {
    const pdfHref = getBookPdfHref(book);
    const fileName = getPdfFileName(pdfHref);
    const baseSlug = slugifyBook(fileName.replace(/\.pdf$/i, '')) || slugifyBook(book.title);
    const slugCount = bookSlugCounts.get(baseSlug) ?? 0;
    const bookSlug = slugCount === 0 ? baseSlug : `${baseSlug}-${section.slug}`;

    bookSlugCounts.set(baseSlug, slugCount + 1);

    const { epubHref, epubFileName } = resolveLocalEpub(book, fileName);
    const formatsSet = new Set(book.formats ?? ['PDF']);

    if (epubHref) formatsSet.add('EPUB');

    return {
      ...book,
      formats: Array.from(formatsSet),
      section,
      sectionSlug: section.slug,
      bookSlug,
      pdfHref,
      epubHref,
      epubFileName,
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
