# ARP specification (draft)

Everything here is a proposal. Changes go through pull requests that update this file and `src/inventory.ts` together.

## Goals

- Write every syllable of **modern** English, Korean and Japanese, with one notation.
- **ASCII first.** Source text is plain ASCII. A renderer turns it into ARP script where supported.
- **Zenkaku script.** One full-width square cell per syllable. Spaces between words are optional.
- **Lossless round trip** between ASCII and script.

## Non-goals

- Sounds that are merged or unused in modern speech: Korean ㅐ/ㅔ (merged), ㅚ/ㅟ as monophthongs, Middle Korean ㆍ/ㅿ, Japanese ゐ/ゑ, and so on.
- Allophonic detail that no native speaker hears as a different sound (for example aspiration of English /p/).
- Spelling a language's orthography. ARP writes sounds.

## Layers

| Layer | Form | Example |
|---|---|---|
| Source | ASCII | `hana bi` |
| Syllables | onset, nucleus, coda indices | `(h,a,∅) (n,a,∅) (b,i,∅)` |
| Script | one zenkaku cell per syllable | 3 PUA codepoints |

## Syllable structure

`syllable = onset? nucleus coda?`

- **Onset:** zero or one consonant from the consonant table. English clusters (`str`, `pl`) are an **open question**, see below.
- **Nucleus:** one entry from the vowel table (monophthong, long vowel or diphthong).
- **Coda:** none, or one entry from the coda table. Japanese moraic nasal and geminate are `N` and `Q`.

### Parsing ASCII

1. Split on whitespace. Whitespace becomes U+3000, or is dropped when spaces are off.
2. Inside a word, `.` forces a syllable break.
3. Otherwise the longest match wins, with **maximal onset**: a consonant between two vowels starts the next syllable. `hana` is `ha.na`, `hangeul` is `ha.ngeul`, so 한글 is written `han.geul`.

## Encoding

Until ARP has a Unicode allocation, each syllable is one codepoint in Supplementary Private Use Area-A, composed algorithmically like Hangul:

```
cp = 0xF0000 + ((onset + 1) * V + nucleus) * C + coda
```

`onset = -1` means no onset. `V` and `C` are the sizes of the vowel and coda tables. The table order is therefore part of the encoding: **append only** once it is frozen.

## Inventory

Lives in `src/inventory.ts`, the single source of truth. Each entry has its ASCII spelling, IPA and which languages use it.

## Open questions

- **English consonant clusters** (`str`, `spl`, final `-nts`): extra onset/coda units, or a separate cell type? This decides whether everything fits in PUA-A (65,534 codepoints).
- **English vowels:** which accent is the reference? The draft table roughly follows General American.
- **Korean lenis stops:** is `b/d/g/j` (voiced) the same phoneme as Korean ㅂ/ㄷ/ㄱ/ㅈ, or are they separate?
- **Japanese pitch accent** and **English stress:** marked or not?
- **Embedding in mixed text:** how does a renderer know which ASCII is ARP? (Delimiters, a language tag, or a whole-document mode.)
- **Glyph design:** how onset, nucleus and coda shapes are arranged in the square cell.
