import { describe, expect, it } from "vitest";

import { countLexicalWords } from "./count-lexical-words";

describe("countLexicalWords", () => {
  it("counts words across nested nodes", () => {
    const content = {
      root: {
        children: [
          { children: [{ text: "Aprender tecnología es" }] },
          { children: [{ children: [{ text: "un proyecto en grupo" }] }] },
        ],
      },
    };

    expect(countLexicalWords(content)).toBe(7);
  });

  it("returns zero for empty or malformed content", () => {
    expect(countLexicalWords(null)).toBe(0);
    expect(countLexicalWords({})).toBe(0);
    expect(countLexicalWords({ root: { children: [] } })).toBe(0);
  });
});
