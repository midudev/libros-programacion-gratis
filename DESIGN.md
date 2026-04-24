# Guía de diseño

Esta guía documenta el lenguaje visual actual de `librosgratis.dev`. No propone un rediseño. Su objetivo es ayudar a que las futuras contribuciones visuales se sientan parte del mismo sitio y sean más fáciles de revisar.

## Producto

`librosgratis.dev` es una biblioteca viva de libros y guías gratuitas de programación en español. La interfaz debe sentirse editorial, rápida y clara: primero ayuda a encontrar recursos, luego invita a contribuir.

## Principios

- Prioriza lectura y búsqueda sobre decoración.
- Mantén una estética cálida, editorial y ligera.
- Usa español claro, directo y consistente.
- Evita patrones visuales genéricos que no ayuden a explorar la biblioteca.
- Cuida accesibilidad, teclado, foco visible y lectura en móvil.
- No introduzcas scroll horizontal global.

## Tokens principales

Los tokens viven en `web/src/styles/global.css` dentro de `:root`. Reutilízalos antes de crear valores nuevos.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#faf7f2` | Fondo base cálido |
| `--text` | `#1a1a1a` | Texto principal |
| `--muted` | `#8b8378` | Texto secundario e iconos suaves |
| `--accent` | `#c55a3d` | Acciones, énfasis y estados activos |
| `--border` | `#e6e1da` | Separadores y bordes suaves |
| `--max-w` | `960px` | Ancho máximo de página |

Para variaciones, prefiere `color-mix()` o transparencias derivadas de estos tokens. Evita colores sueltos salvo que representen un estado puntual, por ejemplo errores.

## Tipografía

- Usa `Manrope` para cuerpo, controles, tarjetas y navegación.
- Usa `Instrument Serif` para titulares grandes y momentos editoriales.
- Mantén jerarquía por tamaño, peso y espacio. No dependas solo del color.
- Usa `text-wrap: balance` en titulares y textos cortos cuando mejore la lectura.

Las fuentes se cargan en `web/src/layouts/Layout.astro` desde Google Fonts. No agregues nuevas familias sin una razón clara.

## Color y superficie

El sitio usa una base tipo papel, con superficies blancas translúcidas y bordes suaves. El acento rojizo debe aparecer en acciones, enlaces destacados, hover y foco. No debe dominar cada bloque.

Patrones actuales:

- Fondo general con gradiente cálido vertical.
- Superficies con blanco translúcido, borde tenue y sombra baja.
- CTA principal oscuro, con hover hacia `--accent`.
- Iconos en `--muted`, heredando color con `currentColor`.

## Layout

- Usa `.page` como contenedor principal con `max-width: var(--max-w)`.
- Mantén respiración lateral con `padding: 0 1.5rem`, y `1rem` en móvil.
- En escritorio, las grillas de libros usan `repeat(auto-fill, minmax(300px, 1fr))`.
- En móvil, las grillas pasan a una sola columna desde `640px`.
- Las páginas de tema pueden usar composición de dos columnas para texto y logos, pero deben caer a una columna en móvil.

La página debe seguir funcionando desde `320px` de ancho.

## Componentes visuales

### Header

El header es compacto. Logo a la izquierda, navegación a la derecha, acciones en una cápsula con borde suave. Mantén botones claros y con buen área clicable.

### Hero

El hero es editorial: titular grande con `Instrument Serif`, subtítulo corto y mucho aire. Usa el acento solo para una palabra o énfasis relevante.

### Buscador y toolbar

El buscador debe sentirse como herramienta principal. Mantén icono, placeholder claro, contador de resultados y botón para limpiar búsqueda cuando corresponde.

### Dock de lenguajes

El dock ayuda a saltar entre temas. En móvil debe desplazarse horizontalmente dentro de su propio contenedor, sin generar overflow global.

### Secciones y tarjetas

Las secciones usan título, descripción breve y contador. Las tarjetas de libros son compactas, con autor, formatos, nota opcional y acciones claras. El hover puede elevar la tarjeta levemente, pero no debe cambiar el layout.

### Lector y descarga

Las pantallas de lectura y descarga deben conservar la misma base: paneles claros, bordes suaves, botones con icono y estados deshabilitados legibles.

## Interacción

- Usa transiciones cortas, normalmente entre `150ms` y `200ms`.
- Prefiere movimientos sutiles: `translateY(-1px)` o `translateY(-2px)`.
- Todos los controles interactivos deben tener `:focus-visible`.
- Respeta `prefers-reduced-motion: reduce`; no dependas de animaciones para entender una acción.
- El hover no debe ocultar información ni mover elementos de forma brusca.

## Accesibilidad

- Mantén `lang="es"` y textos visibles en español.
- Usa estructura semántica: `header`, `main`, `section`, `article`, `nav`, `footer`.
- Cada navegación debe tener `aria-label` cuando el contexto no sea obvio.
- Los iconos decorativos deben usar `aria-hidden="true"`.
- Los enlaces superpuestos en tarjetas no deben duplicar el foco de los enlaces visibles.
- Mantén contraste suficiente entre texto, fondo y estados.
- Verifica que el sitio no tenga scroll horizontal global.

## Copy

- Escribe para personas que buscan aprender programación en español.
- Prefiere frases cortas y concretas.
- Evita promesas exageradas y lenguaje de marketing genérico.
- Mantén consistencia: "libros", "guías", "recursos", "gratis" y "en español" son términos centrales del producto.
- En acciones, usa verbos claros: "Enviar libro", "Ver PDF", "Descargar", "Visitar Sitio Web".

## Iconos e imágenes

- Los iconos de interfaz deben ser simples, de trazo, y heredar color con `currentColor`.
- Usa `stroke-width` cercano a `1.9` para iconos de acciones y navegación.
- Logos de lenguajes o tecnologías solo deben reforzar una sección concreta, no decorar sin propósito.
- Las imágenes deben declarar `width`, `height`, `loading` y `decoding` cuando aplique.

## Antes de abrir una PR visual

- Reutiliza tokens existentes antes de crear nuevos.
- Prueba escritorio y móvil.
- Revisa navegación con teclado.
- Comprueba que no aparece scroll horizontal global.
- Mantén los cambios pequeños y enfocados.
- Explica en la PR qué problema de usuario resuelve el cambio.
