/**
 * The ARP letterset: exactly 46 characters.
 *
 * - 44 letters, stored as Private Use Area codepoints until ARP has a Unicode
 *   allocation. Their sounds are not defined yet.
 * - 2 modifiers, exactly U+309B ゛ and U+309C ゜, applied after a letter the
 *   same way they apply to kana.
 */

export const LETTER_COUNT = 44;
export const LETTERSET_SIZE = LETTER_COUNT + 2;

/** First letter codepoint (Supplementary Private Use Area-A). */
export const LETTER_BASE = 0xf0000;

export const DAKUTEN = "゛"; // ゛
export const HANDAKUTEN = "゜"; // ゜

/** Tense level. Every letter is 1 by default; ゛ lowers to 0, ゜ raises to 2. */
export type Level = 0 | 1 | 2;
export const DEFAULT_LEVEL: Level = 1;

export function letter(index: number): string {
  if (!Number.isInteger(index) || index < 0 || index >= LETTER_COUNT) {
    throw new RangeError(`ARP letter index out of range: ${index}`);
  }
  return String.fromCodePoint(LETTER_BASE + index);
}

export function letterIndex(ch: string): number | undefined {
  const n = (ch.codePointAt(0) ?? -1) - LETTER_BASE;
  return n >= 0 && n < LETTER_COUNT ? n : undefined;
}

export function modifierLevel(ch: string): Level | undefined {
  if (ch === DAKUTEN) return 0;
  if (ch === HANDAKUTEN) return 2;
  return undefined;
}
