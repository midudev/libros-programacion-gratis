type HighlightKind = 'strong' | 'em' | 'code';

type HighlightRule = {
  phrase: string;
  kind: HighlightKind;
  className: string;
  max: number;
  regex: RegExp;
};

const protectedTags = new Set(['a', 'code', 'em', 'pre', 'script', 'strong', 'style']);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const createPhrasePattern = (phrase: string) =>
  phrase
    .trim()
    .split(/\s+/)
    .map(escapeRegExp)
    .join('\\s+');

const createRule = (
  phrase: string,
  kind: HighlightKind,
  className: string,
  max = 1,
): HighlightRule => ({
  phrase,
  kind,
  className,
  max,
  regex: new RegExp(`(?<![\\p{L}\\p{N}])${createPhrasePattern(phrase)}(?![\\p{L}\\p{N}])`, 'giu'),
});

const highlightRules = [
  createRule('deuda técnica', 'strong', 'advice-key-term', 2),
  createRule('programación funcional', 'strong', 'advice-key-term', 2),
  createRule('transparencia referencial', 'strong', 'advice-key-term', 2),
  createRule('código limpio', 'strong', 'advice-key-term'),
  createRule('código base', 'strong', 'advice-key-term'),
  createRule('estándar de codificación', 'strong', 'advice-key-term', 2),
  createRule('desarrollo guiado por pruebas', 'strong', 'advice-key-term'),
  createRule('desarrollo basado en pruebas', 'strong', 'advice-key-term'),
  createRule('pruebas automatizadas', 'strong', 'advice-key-term'),
  createRule('cobertura del código', 'strong', 'advice-key-term'),
  createRule('responsabilidad única', 'strong', 'advice-key-term'),
  createRule('principio DRY', 'strong', 'advice-key-term'),
  createRule('patrones de diseño', 'strong', 'advice-key-term'),
  createRule('modelo de dominio', 'strong', 'advice-key-term'),
  createRule('simplicidad', 'strong', 'advice-key-term', 2),
  createRule('legibilidad', 'strong', 'advice-key-term'),
  createRule('mantenibilidad', 'strong', 'advice-key-term'),
  createRule('refactorización', 'strong', 'advice-key-term'),
  createRule('refactorizar', 'strong', 'advice-key-term'),
  createRule('hacerlo bien', 'em', 'advice-soft-emphasis'),
  createRule('hacerlo rápido', 'em', 'advice-soft-emphasis'),
  createRule('no te repitas', 'em', 'advice-soft-emphasis'),
  createRule('resto de tu vida', 'em', 'advice-soft-emphasis'),
  createRule('API', 'code', 'advice-inline-code'),
  createRule('DSL', 'code', 'advice-inline-code'),
  createRule('GUI', 'code', 'advice-inline-code'),
  createRule('IDE', 'code', 'advice-inline-code'),
  createRule('SQL', 'code', 'advice-inline-code'),
  createRule('XML', 'code', 'advice-inline-code'),
  createRule('build', 'code', 'advice-inline-code'),
  createRule('commit', 'code', 'advice-inline-code'),
  createRule('make', 'code', 'advice-inline-code'),
  createRule('fooBar', 'code', 'advice-inline-code'),
];

const wrapHighlight = (text: string, rule: HighlightRule) => {
  if (rule.kind === 'strong') {
    return `<strong class="${rule.className}">${text}</strong>`;
  }

  if (rule.kind === 'em') {
    return `<em class="${rule.className}">${text}</em>`;
  }

  return `<code class="language-plaintext highlighter-rouge ${rule.className}">${text}</code>`;
};

const findNextHighlight = (
  text: string,
  position: number,
  counts: Map<string, number>,
  totalHighlights: number,
) => {
  if (totalHighlights >= 12) {
    return undefined;
  }

  return highlightRules.reduce<
    | {
        index: number;
        match: string;
        rule: HighlightRule;
      }
    | undefined
  >((best, rule) => {
    if ((counts.get(rule.phrase) ?? 0) >= rule.max) {
      return best;
    }

    rule.regex.lastIndex = position;
    const match = rule.regex.exec(text);

    if (!match) {
      return best;
    }

    if (!best || match.index < best.index || (match.index === best.index && match[0].length > best.match.length)) {
      return {
        index: match.index,
        match: match[0],
        rule,
      };
    }

    return best;
  }, undefined);
};

const enhanceTextSegment = (text: string, counts: Map<string, number>, totalHighlights: { value: number }) => {
  let position = 0;
  let output = '';

  while (position < text.length) {
    const next = findNextHighlight(text, position, counts, totalHighlights.value);

    if (!next) {
      output += text.slice(position);
      break;
    }

    output += text.slice(position, next.index);
    output += wrapHighlight(next.match, next.rule);

    counts.set(next.rule.phrase, (counts.get(next.rule.phrase) ?? 0) + 1);
    totalHighlights.value += 1;
    position = next.index + next.match.length;
  }

  return output;
};

const isSelfClosingTag = (tag: string) => /\/>$/.test(tag) || /^<(br|hr|img|input|meta|link)\b/i.test(tag);

const getOpeningTagName = (tag: string) => tag.match(/^<([a-z][\w:-]*)\b/i)?.[1]?.toLowerCase();

const getClosingTagName = (tag: string) => tag.match(/^<\/([a-z][\w:-]*)\b/i)?.[1]?.toLowerCase();

export const enhanceProgrammerAdviceHtml = (html: string) => {
  const counts = new Map<string, number>();
  const totalHighlights = { value: 0 };
  const tagStack: string[] = [];

  return html
    .split(/(<[^>]+>)/g)
    .map((segment) => {
      if (!segment.startsWith('<')) {
        return tagStack.length === 0 ? enhanceTextSegment(segment, counts, totalHighlights) : segment;
      }

      const closingTag = getClosingTagName(segment);

      if (closingTag && protectedTags.has(closingTag)) {
        const stackIndex = tagStack.lastIndexOf(closingTag);

        if (stackIndex !== -1) {
          tagStack.splice(stackIndex, 1);
        }

        return segment;
      }

      const openingTag = getOpeningTagName(segment);

      if (openingTag && protectedTags.has(openingTag) && !isSelfClosingTag(segment)) {
        tagStack.push(openingTag);
      }

      return segment;
    })
    .join('');
};
