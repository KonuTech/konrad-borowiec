import { ReactNode } from 'react';
import { TECHNOLOGIES } from '@/data/technologies';

// Escape a string for safe use inside a RegExp.
const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Build one case-insensitive matcher from every alias in the registry. Aliases
// are sorted longest-first so multi-word terms ("Apache Superset", "Superset
// MCP") win over their shorter substrings ("Superset"). Each alias is wrapped in
// lookarounds that approximate word boundaries but also work for tokens that
// start/end with non-word characters.
const aliases = Array.from(new Set(TECHNOLOGIES.flatMap((t) => t.aliases))).sort(
  (a, b) => b.length - a.length,
);

const techRegex = new RegExp(`(?<![\\w-])(${aliases.map(escapeRegExp).join('|')})(?![\\w-])`, 'gi');

/**
 * Split text into React nodes, wrapping recognized technology mentions in a
 * highlighted <mark>. Non-matching text is returned as plain strings so the
 * surrounding `whitespace-pre-line` behaviour (line breaks, bullets) is kept.
 */
export const highlightTechnologies = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of Array.from(text.matchAll(techRegex))) {
    const start = match.index ?? 0;
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));
    nodes.push(
      <mark key={key++} className="tech-highlight">
        {match[0]}
      </mark>,
    );
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};
