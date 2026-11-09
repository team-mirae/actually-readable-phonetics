# ARP — Actually Readable Phonetics

An experimental script that can write **every syllable of modern English, Korean and Japanese**, and that works with ordinary digital text.

## Design

- **46 characters, no more.** 44 letters plus exactly **゛** (U+309B) and **゜** (U+309C).
- **Tense levels, copied from Japanese.** Every letter is level 1 by default. ゛ after a letter lowers it to 0 and ゜ raises it to 2, the same way they apply to kana.
- **Golden rule: typeable on JIS without ever pressing Shift.** All 46 characters sit on unshifted keys of the JIS kana layout, with ゛ and ゜ on the same keys as on a JIS kana keyboard (`@` and `[`). US ANSI and ISO layouts will use the Shift layer.
- **Zenkaku.** Full-width characters; spaces between words are optional.
- **Plain text everywhere.** Letters are stored as Private Use Area codepoints until ARP has a Unicode allocation. A bulkier **compatibility mode** that writes ARP with Latin, Hangul and kana is planned.
- Sounds that are merged or unused in modern speech are left out on purpose.

The letters themselves (shapes, sounds, keys) are not designed yet. See [`docs/spec.md`](docs/spec.md).

## Glyph editor

[`tools/glyph-editor/index.html`](tools/glyph-editor/index.html) is a single-file drawing tool. Open it in a browser; no build or server needed.

- Shows an empty JIS keyboard with only ゛ and ゜ in place. Click a key, or press it on a JIS keyboard, to draw its letter.
- Pen, straight line, erase stroke, stroke width, snap to grid, undo/redo.
- Write each letter's pronunciation for all three tense levels: 0 (+ ゛), 1 (default), 2 (+ ゜). Leave a level blank if the letter doesn't take that modifier. Pronunciations are saved in the project file, embedded in glyph SVGs (`data-arp-level0..2` and `<title>`), and printed under each key in the sheet SVG.
- Drawings save automatically in the browser. **Save project** / **Load project** exchange a `.json` file.
- **Download this glyph SVG** exports one 1000×1000 glyph; **Download sheet SVG** exports the whole keyboard.
- Counts drawn letters against the 44 limit.

## Library

```ts
import { letter, tokenize, DAKUTEN, HANDAKUTEN } from "actually-readable-phonetics";

tokenize(letter(0) + DAKUTEN);  // [{ kind: "letter", index: 0, level: 0, ... }]
```

## Development

```sh
npm install
npm test          # vitest
npm run typecheck
npm run build     # emits dist/
```

## License

[CC0 1.0](LICENSE): public domain.
