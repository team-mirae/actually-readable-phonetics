/**
 * PROVISIONAL phoneme inventory and ASCII input notation.
 *
 * Every entry here is a draft to be argued over in docs/spec.md. The order of
 * each list is load-bearing: a phoneme's index is part of the syllable
 * codepoint formula (see compose.ts), so append new entries, never reorder,
 * once the encoding is frozen.
 */

export interface Phoneme {
  /** ASCII spelling used in source text. */
  readonly ascii: string;
  /** IPA, for documentation and the debug renderer. */
  readonly ipa: string;
  /** Which languages use it: e(nglish), k(orean), j(apanese). */
  readonly langs: string;
}

/** Onset consonants (and consonant clusters treated as one onset unit later). */
export const CONSONANTS: readonly Phoneme[] = [
  { ascii: "p", ipa: "p", langs: "ekj" },
  { ascii: "b", ipa: "b", langs: "ej" },
  { ascii: "t", ipa: "t", langs: "ekj" },
  { ascii: "d", ipa: "d", langs: "ej" },
  { ascii: "k", ipa: "k", langs: "ekj" },
  { ascii: "g", ipa: "ɡ", langs: "ej" },
  { ascii: "f", ipa: "f", langs: "e" },
  { ascii: "v", ipa: "v", langs: "e" },
  { ascii: "th", ipa: "θ", langs: "e" },
  { ascii: "dh", ipa: "ð", langs: "e" },
  { ascii: "s", ipa: "s", langs: "ekj" },
  { ascii: "z", ipa: "z", langs: "ej" },
  { ascii: "sh", ipa: "ʃ", langs: "ekj" },
  { ascii: "zh", ipa: "ʒ", langs: "e" },
  { ascii: "h", ipa: "h", langs: "ekj" },
  { ascii: "ch", ipa: "tʃ", langs: "ekj" },
  { ascii: "j", ipa: "dʒ", langs: "ej" },
  { ascii: "ts", ipa: "ts", langs: "j" },
  { ascii: "m", ipa: "m", langs: "ekj" },
  { ascii: "n", ipa: "n", langs: "ekj" },
  { ascii: "ng", ipa: "ŋ", langs: "ek" },
  { ascii: "l", ipa: "l", langs: "ek" },
  { ascii: "r", ipa: "ɹ~ɾ", langs: "ekj" },
  { ascii: "w", ipa: "w", langs: "ekj" },
  { ascii: "y", ipa: "j", langs: "ekj" },
  // Korean tense (fortis) series: doubled letter.
  { ascii: "pp", ipa: "p͈", langs: "k" },
  { ascii: "tt", ipa: "t͈", langs: "k" },
  { ascii: "kk", ipa: "k͈", langs: "k" },
  { ascii: "ss", ipa: "s͈", langs: "k" },
  { ascii: "cch", ipa: "t͈ɕ", langs: "k" },
  // Korean aspirated series: trailing apostrophe.
  { ascii: "p'", ipa: "pʰ", langs: "k" },
  { ascii: "t'", ipa: "tʰ", langs: "k" },
  { ascii: "k'", ipa: "kʰ", langs: "k" },
  { ascii: "ch'", ipa: "tɕʰ", langs: "k" },
];

/** Syllable nuclei: monophthongs, long vowels and diphthongs. */
export const VOWELS: readonly Phoneme[] = [
  { ascii: "a", ipa: "a", langs: "ekj" },
  { ascii: "e", ipa: "e", langs: "ekj" },
  { ascii: "i", ipa: "i", langs: "ekj" },
  { ascii: "o", ipa: "o", langs: "ekj" },
  { ascii: "u", ipa: "u", langs: "ekj" },
  { ascii: "ae", ipa: "æ", langs: "e" },
  { ascii: "eo", ipa: "ʌ", langs: "ek" },
  { ascii: "eu", ipa: "ɯ", langs: "kj" },
  { ascii: "@", ipa: "ə", langs: "e" },
  { ascii: "oo", ipa: "ʊ", langs: "e" },
  { ascii: "aw", ipa: "ɔ", langs: "e" },
  { ascii: "er", ipa: "ɚ", langs: "e" },
  { ascii: "ai", ipa: "aɪ", langs: "e" },
  { ascii: "au", ipa: "aʊ", langs: "e" },
  { ascii: "oi", ipa: "ɔɪ", langs: "e" },
  { ascii: "eui", ipa: "ɰi", langs: "k" },
  { ascii: "a:", ipa: "aː", langs: "j" },
  { ascii: "e:", ipa: "eː", langs: "j" },
  { ascii: "i:", ipa: "iː", langs: "ej" },
  { ascii: "o:", ipa: "oː", langs: "j" },
  { ascii: "u:", ipa: "uː", langs: "ej" },
];

/**
 * Codas. Index 0 is "no coda". Japanese moraic nasal and geminate are written
 * N and Q so they never collide with onset n / doubled consonants.
 */
export const CODAS: readonly Phoneme[] = [
  { ascii: "", ipa: "", langs: "ekj" },
  { ascii: "p", ipa: "p̚", langs: "ek" },
  { ascii: "t", ipa: "t̚", langs: "ek" },
  { ascii: "k", ipa: "k̚", langs: "ek" },
  { ascii: "m", ipa: "m", langs: "ek" },
  { ascii: "n", ipa: "n", langs: "ek" },
  { ascii: "ng", ipa: "ŋ", langs: "ek" },
  { ascii: "l", ipa: "l", langs: "ek" },
  { ascii: "N", ipa: "ɴ", langs: "j" },
  { ascii: "Q", ipa: "ʔ", langs: "j" },
];

/** Explicit syllable separator in ASCII source. */
export const SYLLABLE_BREAK = ".";
