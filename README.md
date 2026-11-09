# ARP — Actually Readable Phonetics

An experimental script that can write **every syllable of modern English, Korean and Japanese**, and that works with ordinary digital text.

## Idea

1. **Write it in plain ASCII.** ARP source text is ordinary ASCII (`hana bi`, `ppang`, `saN`). It survives every keyboard, editor, chat app and search box.
2. **Render it where supported.** A parser reads that text and turns it into ARP script: a **zenkaku** (full-width) writing system with one square cell per syllable, built from onset + vowel + coda like a Hangul block. Since every syllable is its own cell, **spaces are optional**, as in Japanese.

Sounds that are merged or no longer used in modern speech are left out on purpose (Korean ㅐ/ㅔ, for example, are one vowel).

## Status

Very early. The phoneme inventory and ASCII notation in [`src/inventory.ts`](src/inventory.ts) are **provisional**. See [`docs/spec.md`](docs/spec.md) for the design and the open questions.

There is no font yet. Syllables are encoded as Private Use Area codepoints (U+F0000 and up), so the output looks like tofu (empty boxes) until a font exists. Use `toIpa()` to read it back.

## Usage

```ts
import { transcribe, toIpa } from "actually-readable-phonetics";

const script = transcribe("hana bi");      // 3 full-width syllable cells + U+3000
transcribe("hana bi", { spaces: false });  // same cells, no space
toIpa(script);                             // "ha.na bi"
```

## Development

```sh
npm install
npm test          # vitest
npm run typecheck
npm run build     # emits dist/
```

## License

[CC0 1.0](LICENSE): public domain. Use the script, the notation and the code for anything.
