export type ContributionForm = {
  url: string;
  title: string;
  author?: string;
  category: string;
  format: string;
  note?: string;
  isFree: boolean;
  isSpanish: boolean;
};

export type CatalogEntry = {
  title: string;
  href: string;
  author?: string;
  section: string;
};

export type SearchableCatalogEntry = CatalogEntry & {
  normalizedHref: string;
  normalizedTitle: string;
};

export const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const normalizeUrl = (value: string) => {
  try {
    const url = new URL(value.trim());

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return '';
    }

    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return '';
  }
};

export const isSupportedUrl = (value: string) => normalizeUrl(value) !== '';

export const createSearchableCatalog = (catalog: CatalogEntry[]): SearchableCatalogEntry[] =>
  catalog.map((entry) => ({
    ...entry,
    normalizedHref: normalizeUrl(entry.href),
    normalizedTitle: normalizeText(entry.title),
  }));

export const findPotentialDuplicates = (
  proposal: Pick<ContributionForm, 'url' | 'title'>,
  catalog: SearchableCatalogEntry[],
) => {
  const proposedUrl = normalizeUrl(proposal.url);
  const proposedTitle = normalizeText(proposal.title);

  if (!proposedUrl && !proposedTitle) {
    return [];
  }

  return catalog
    .filter((entry) => {
      const sameUrl = proposedUrl && entry.normalizedHref === proposedUrl;
      const sameTitle =
        proposedTitle.length >= 4 && entry.normalizedTitle === proposedTitle;

      return sameUrl || sameTitle;
    })
    .slice(0, 3);
};

export const buildIssueTitle = (form: ContributionForm) =>
  `[nuevo-libro] ${form.title.trim() || 'Nuevo recurso gratuito'}`;

export const buildIssueBody = (form: ContributionForm) => {
  const note = form.note?.trim() || 'Sin nota adicional.';
  const author = form.author?.trim() || 'No indicado';

  return [
    '## Datos del recurso',
    '',
    `- **Título:** ${form.title.trim()}`,
    `- **Autor o proyecto:** ${author}`,
    `- **Enlace:** ${form.url.trim()}`,
    `- **Categoría sugerida:** ${form.category}`,
    `- **Formato:** ${form.format}`,
    '- **Idioma:** Español',
    '',
    '## Confirmaciones',
    '',
    `- [${form.isFree ? 'x' : ' '}] Es gratuito, sin paywall ni trial`,
    `- [${form.isSpanish ? 'x' : ' '}] Está en español`,
    '',
    '## Por qué debería estar en el catálogo',
    '',
    note,
    '',
    '## Checklist para mantenedores',
    '',
    '- [ ] El recurso es gratuito y legal',
    '- [ ] Está en español',
    '- [ ] No es un artículo de blog aislado',
    '- [ ] Encaja en la categoría sugerida o se ajustó a otra',
    '- [ ] No duplica una entrada existente salvo nueva edición/traducción',
  ].join('\n');
};

export const buildIssueUrl = (repositoryHref: string, form: ContributionForm) => {
  const title = encodeURIComponent(buildIssueTitle(form));
  const body = encodeURIComponent(buildIssueBody(form));

  return `${repositoryHref}/issues/new?title=${title}&body=${body}`;
};
