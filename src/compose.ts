import { CODAS, CONSONANTS, VOWELS } from "./inventory.js";
import type { Syllable } from "./parse.js";

/**
 * ARP is a zenkaku (full-width) script: each syllable is one square cell,
 * built like a Hangul block from onset + nucleus + coda.
 *
 * Until the script has a Unicode allocation, syllables are encoded in
 * Supplementary Private Use Area-A, algorithmically, like Hangul:
 *
 *   cp = BASE + ((onset + 1) * V + nucleus) * C + coda
 *
 * where onset + 1 reserves slot 0 for "no onset". A font maps these to glyphs.
 */
export const PUA_BASE = 0xf0000;
export const PUA_END = 0xffffd;

const O = CONSONANTS.length + 1;
const V = VOWELS.length;
const C = CODAS.length;

export const SYLLABLE_COUNT = O * V * C;

if (PUA_BASE + SYLLABLE_COUNT - 1 > PUA_END) {
  throw new Error(`ARP inventory too large for PUA-A: ${SYLLABLE_COUNT} syllables`);
}

export function compose(s: Syllable): string {
  return String.fromCodePoint(PUA_BASE + ((s.onset + 1) * V + s.nucleus) * C + s.coda);
}

export function decompose(ch: string): Syllable | undefined {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return undefined;
  const n = cp - PUA_BASE;
  if (n < 0 || n >= SYLLABLE_COUNT) return undefined;
  return {
    onset: Math.floor(n / (V * C)) - 1,
    nucleus: Math.floor(n / C) % V,
    coda: n % C,
  };
}
