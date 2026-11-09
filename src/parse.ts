import { CODAS, CONSONANTS, SYLLABLE_BREAK, VOWELS, type Phoneme } from "./inventory.js";

export interface Syllable {
  /** Index into CONSONANTS, or -1 for a vowel-initial syllable. */
  onset: number;
  /** Index into VOWELS. */
  nucleus: number;
  /** Index into CODAS (0 = none). */
  coda: number;
}

export type Token =
  | { kind: "syllable"; syllable: Syllable; source: string }
  | { kind: "space"; source: string }
  | { kind: "text"; source: string };

export class ArpParseError extends Error {
  constructor(message: string, readonly input: string, readonly offset: number) {
    super(`${message} at offset ${offset} in ${JSON.stringify(input)}`);
    this.name = "ArpParseError";
  }
}

const byLength = (list: readonly Phoneme[]) =>
  list
    .map((p, index) => ({ ...p, index }))
    .filter((p) => p.ascii.length > 0)
    .sort((a, b) => b.ascii.length - a.ascii.length);

const CONS = byLength(CONSONANTS);
const VOWS = byLength(VOWELS);
const CODA = byLength(CODAS);

function match(list: ReturnType<typeof byLength>, s: string, at: number) {
  return list.find((p) => s.startsWith(p.ascii, at));
}

/**
 * Parse one ARP word (no whitespace) into syllables.
 *
 * Grammar (provisional): syllable = onset? nucleus coda?, with "." forcing a
 * break. Without a "." the parser is greedy: the longest onset, then the
 * longest nucleus, then a coda only if what follows is not another nucleus
 * (so "hana" is ha.na, not han.a).
 */
export function parseWord(word: string): Syllable[] {
  const out: Syllable[] = [];
  let i = 0;
  while (i < word.length) {
    if (word[i] === SYLLABLE_BREAK) {
      i++;
      continue;
    }
    const onset = match(CONS, word, i);
    const afterOnset = i + (onset?.ascii.length ?? 0);
    const nucleus = match(VOWS, word, afterOnset);
    if (!nucleus) throw new ArpParseError("expected a vowel", word, afterOnset);
    let j = afterOnset + nucleus.ascii.length;
    let coda = 0;
    const c = match(CODA, word, j);
    if (c) {
      const next = j + c.ascii.length;
      const startsNucleus = match(VOWS, word, j) !== undefined;
      const consonantFeedsNext =
        next < word.length && word[next] !== SYLLABLE_BREAK && match(VOWS, word, next) !== undefined;
      if (!startsNucleus && !consonantFeedsNext) {
        coda = c.index;
        j = next;
      }
    }
    out.push({ onset: onset?.index ?? -1, nucleus: nucleus.index, coda });
    i = j;
  }
  return out;
}

/** Split arbitrary ASCII into syllables and whitespace. */
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  for (const part of input.split(/(\s+)/)) {
    if (part === "") continue;
    if (/^\s+$/.test(part)) {
      tokens.push({ kind: "space", source: part });
      continue;
    }
    for (const syllable of parseWord(part)) {
      tokens.push({ kind: "syllable", syllable, source: part });
    }
  }
  return tokens;
}
