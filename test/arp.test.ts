import { describe, expect, it } from "vitest";
import {
  DAKUTEN,
  DAKUTEN_KEY,
  HANDAKUTEN,
  HANDAKUTEN_KEY,
  JIS_KEYS,
  KEYMAP,
  LETTER_COUNT,
  LETTER_KEYS,
  LETTERSET_SIZE,
  keyToChar,
  letter,
  letterIndex,
  tokenize,
} from "../src/index.js";

describe("letterset", () => {
  it("has exactly 46 characters: 44 letters + ゛゜", () => {
    expect(LETTER_COUNT).toBe(44);
    expect(LETTERSET_SIZE).toBe(46);
    expect(DAKUTEN).toBe("゛");
    expect(HANDAKUTEN).toBe("゜");
  });

  it("round-trips letter codepoints", () => {
    for (let i = 0; i < LETTER_COUNT; i++) expect(letterIndex(letter(i))).toBe(i);
    expect(() => letter(LETTER_COUNT)).toThrow(RangeError);
    expect(letterIndex("a")).toBeUndefined();
  });
});

describe("tense level", () => {
  const a = letter(0);
  const b = letter(1);

  it("defaults to 1, ゛ lowers to 0, ゜ raises to 2", () => {
    expect(tokenize(a)).toMatchObject([{ kind: "letter", index: 0, level: 1 }]);
    expect(tokenize(a + DAKUTEN)).toMatchObject([{ kind: "letter", level: 0 }]);
    expect(tokenize(a + HANDAKUTEN)).toMatchObject([{ kind: "letter", level: 2 }]);
  });

  it("applies only to the letter right before it", () => {
    expect(tokenize(a + b + DAKUTEN)).toMatchObject([
      { index: 0, level: 1 },
      { index: 1, level: 0 },
    ]);
  });

  it("leaves stray or doubled modifiers as text, like kana", () => {
    expect(tokenize(DAKUTEN + a)).toMatchObject([
      { kind: "text", source: DAKUTEN },
      { kind: "letter", level: 1 },
    ]);
    expect(tokenize(a + DAKUTEN + HANDAKUTEN)).toMatchObject([
      { kind: "letter", level: 0 },
      { kind: "text", source: HANDAKUTEN },
    ]);
  });
});

describe("JIS keymap (golden rule: no Shift on JIS)", () => {
  it("uses the 48 unshifted kana keys", () => {
    expect(JIS_KEYS).toHaveLength(48);
    expect(new Set(JIS_KEYS).size).toBe(48);
  });

  it("puts ゛゜ on the JIS @ and [ keys", () => {
    expect(keyToChar(DAKUTEN_KEY)).toBe(DAKUTEN);
    expect(keyToChar(HANDAKUTEN_KEY)).toBe(HANDAKUTEN);
    expect(LETTER_KEYS).toHaveLength(46);
  });

  it("maps at most 44 keys, each to a distinct letter, all unshifted", () => {
    const entries = Object.entries(KEYMAP);
    expect(entries.length).toBeLessThanOrEqual(LETTER_COUNT);
    for (const [key, i] of entries) {
      expect(LETTER_KEYS).toContain(key);
      expect(i).toBeGreaterThanOrEqual(0);
      expect(i).toBeLessThan(LETTER_COUNT);
    }
    expect(new Set(entries.map(([, i]) => i)).size).toBe(entries.length);
  });
});
