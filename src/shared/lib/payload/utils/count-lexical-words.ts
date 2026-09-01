type LexicalNode = {
  text?: unknown;
  children?: unknown;
};

function collectText(node: unknown): string[] {
  if (!node || typeof node !== "object") return [];

  const { text, children } = node as LexicalNode;
  const own = typeof text === "string" ? [text] : [];
  const nested = Array.isArray(children) ? children.flatMap(collectText) : [];

  return [...own, ...nested];
}

export function countLexicalWords(content: unknown) {
  const root = (content as { root?: unknown } | null)?.root;

  return collectText(root).join(" ").split(/\s+/).filter(Boolean).length;
}
