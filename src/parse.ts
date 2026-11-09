import { DEFAULT_LEVEL, letterIndex, modifierLevel, type Level } from "./letters.js";

export type Token =
  | { kind: "letter"; index: number; level: Level; source: string }
  | { kind: "text"; source: string };

/**
 * Split text into ARP letters (with their tense level) and everything else.
 * A modifier applies to the letter right before it, like ゛ after か. A stray
 * modifier, or a second one in a row, is left as plain text, as with kana.
 */
export function tokenize(text: string): Token[] {
  const out: Token[] = [];
  const chars = [...text];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]!;
    const index = letterIndex(ch);
    if (index === undefined) {
      const prev = out.at(-1);
      if (prev?.kind === "text") prev.source += ch;
      else out.push({ kind: "text", source: ch });
      continue;
    }
    const level = modifierLevel(chars[i + 1] ?? "");
    if (level === undefined) {
      out.push({ kind: "letter", index, level: DEFAULT_LEVEL, source: ch });
    } else {
      out.push({ kind: "letter", index, level, source: ch + chars[i + 1] });
      i++;
    }
  }
  return out;
}
