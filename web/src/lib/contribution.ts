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

export const findPotentialDuplicates = (
  proposal: Pick<ContributionForm, 'url' | 'title'>,
  catalog: CatalogEntry[],
) => {
  const proposedUrl = normalizeUrl(proposal.url);
  const proposedTitle = normalizeText(proposal.title);

  if (!proposedUrl && !proposedTitle) {
    return [];
  }

  return catalog
    .filter((entry) => {
      const sameUrl = proposedUrl && normalizeUrl(entry.href) === proposedUrl;
      const sameTitle =
        proposedTitle.length >= 4 && normalizeText(entry.title) === proposedTitle;

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
    `- **Titulo:** ${form.title.trim()}`,
    `- **Autor o proyecto:** ${author}`,
    `- **Enlace:** ${form.url.trim()}`,
    `- **Categoria sugerida:** ${form.category}`,
    `- **Formato:** ${form.format}`,
    '- **Idioma:** Espanol',
    '',
    '## Confirmaciones',
    '',
    `- [${form.isFree ? 'x' : ' '}] Es gratuito, sin paywall ni trial`,
    `- [${form.isSpanish ? 'x' : ' '}] Esta en espanol`,
    '',
    '## Por que deberia estar en el catalogo',
    '',
    note,
    '',
    '## Checklist para mantenedores',
    '',
    '- [ ] El recurso es gratuito y legal',
    '- [ ] Esta en espanol',
    '- [ ] No es un articulo de blog aislado',
    '- [ ] Encaja en la categoria sugerida o se ajusto a otra',
    '- [ ] No duplica una entrada existente salvo nueva edicion/traduccion',
  ].join('\n');
};

export const buildIssueUrl = (repositoryHref: string, form: ContributionForm) => {
  const title = encodeURIComponent(buildIssueTitle(form));
  const body = encodeURIComponent(buildIssueBody(form));

  return `${repositoryHref}/issues/new?title=${title}&body=${body}`;
};
