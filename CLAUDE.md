# ARP (Actually Readable Phonetics)

Experimental zenkaku script for every modern syllable of English, Korean and Japanese. See docs/spec.md.

Hard constraints (decided by the user, don't relax them):
- Letterset is exactly 46 characters: 44 letters (PUA, U+F0000+) + exactly ゛ U+309B and ゜ U+309C.
- Tense level: default 1, ゛ → 0, ゜ → 2, applied after a letter as with kana.
- Golden rule: everything typeable on JIS without Shift. ゛゜ on JIS @ and [ keys. US ANSI/ISO use Shift.
- Merged or unused sounds are out of scope.

Not yet decided, don't invent: letter sounds, shapes, key positions, per-letter level mappings. Ask the user.

- `src/letters.ts`, `src/keymap.ts`, `src/parse.ts`; tests in `test/`.
- `tools/glyph-editor/index.html`: single-file drawing tool, no build.
- `npm test`, `npm run typecheck`, `npm run build`.
