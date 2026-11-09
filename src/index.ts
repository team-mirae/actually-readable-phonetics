import { compose, decompose } from "./compose.js";
import { CODAS, CONSONANTS, VOWELS } from "./inventory.js";
import { tokenize, type Syllable } from "./parse.js";

export { compose, decompose, PUA_BASE, SYLLABLE_COUNT } from "./compose.js";
export { CODAS, CONSONANTS, VOWELS, type Phoneme } from "./inventory.js";
export { ArpParseError, parseWord, tokenize, type Syllable, type Token } from "./parse.js";

export interface RenderOptions {
  /**
   * Keep word spaces in the output. ARP is zenkaku, so spaces are optional:
   * syllable cells are self-delimiting. Default: true.
   */
  spaces?: boolean;
}

/** ASCII → ARP script (one full-width PUA codepoint per syllable). */
export function transcribe(ascii: string, opts: RenderOptions = {}): string {
  const keepSpaces = opts.spaces ?? true;
  let out = "";
  for (const t of tokenize(ascii)) {
    if (t.kind === "syllable") out += compose(t.syllable);
    else if (keepSpaces) out += t.kind === "space" ? "　" : t.source;
  }
  return out;
}

/** Syllable → ASCII. Inserts "." where a greedy re-parse would differ. */
export function syllableToAscii(s: Syllable): string {
  return (CONSONANTS[s.onset]?.ascii ?? "") + VOWELS[s.nucleus]!.ascii + CODAS[s.coda]!.ascii;
}

/** Syllable → IPA, for debugging until a font exists. */
export function syllableToIpa(s: Syllable): string {
  return (CONSONANTS[s.onset]?.ipa ?? "") + VOWELS[s.nucleus]!.ipa + CODAS[s.coda]!.ipa;
}

/** ARP script → IPA, syllables joined with "." and full-width spaces kept. */
export function toIpa(script: string): string {
  const parts: string[] = [];
  for (const ch of script) {
    const s = decompose(ch);
    parts.push(s ? syllableToIpa(s) : ch === "　" ? " " : ch);
  }
  return parts.join(".").replace(/\.? \.?/g, " ");
}
