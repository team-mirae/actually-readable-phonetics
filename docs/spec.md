# ARP specification (draft)

Changes go through pull requests that update this file and the code together.

## Goals

- Write every syllable of **modern** English, Korean and Japanese with one script.
- Work as ordinary digital text: plain Unicode, typeable on stock keyboards.
- **Zenkaku:** full-width characters; spaces between words are optional.

## Non-goals

- Sounds that are merged or unused in modern speech (Korean ㅐ/ㅔ merger, Middle Korean ㆍ/ㅿ, Japanese ゐ/ゑ, …).
- Spelling any language's orthography. ARP writes sounds.

## Letterset (decided)

Exactly **46 characters**:

| Characters | Count | Codepoints |
|---|---|---|
| Letters | 44 | U+F0000–U+F002B (Supplementary PUA-A), provisional |
| Dakuten ゛ | 1 | U+309B, exactly |
| Handakuten ゜ | 1 | U+309C, exactly |

## Tense levels (decided)

Copied from Japanese kana:

- Every letter is **level 1** by default.
- Letter + **゛** → level 0.
- Letter + **゜** → level 2.
- A modifier applies only to the letter right before it. A stray modifier, or a second one in a row, stays a plain character, as with kana.

**Open:** which letters take ゛ and/or ゜, and what each level sounds like. (To be defined by the designer.)

## Keyboard (decided)

**Golden rule: every ARP character can be typed on a JIS keyboard without ever using Shift.**

- The 46 characters go on the 48 unshifted keys of the JIS kana layout (number row through bottom row, including ¥ and ろ). 2 keys stay unused.
- ゛ is on the JIS `@` key (`BracketLeft`) and ゜ on the JIS `[` key (`BracketRight`), as on a JIS kana keyboard.
- US ANSI and ISO mappings will use the Shift layer, since those layouts have fewer unshifted keys.
- In code, keys are `KeyboardEvent.code` values (`src/keymap.ts`).

**Open:** which key each letter goes on, and which 2 keys stay unused.

## Compatibility mode (planned)

A bulkier way to write ARP using Latin, Hangul and kana, for places that cannot show the PUA letters. To be designed.

## Open questions

- Letter shapes (draw them in `tools/glyph-editor`), sounds and key positions.
- Level mapping for each consonant series (Korean lenis/aspirated/tense, voiced b/d/g).
- How a renderer finds ARP text inside mixed text.
- Font format: the editor exports stroke paths; a font needs outlines.
