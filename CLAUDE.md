# ARP (Actually Readable Phonetics)

Experimental script for every modern syllable of English, Korean and Japanese. ASCII source → parser → zenkaku script (one full-width cell per syllable, spaces optional).

- `src/inventory.ts` is the single source of truth for phonemes and ASCII notation. Keep `docs/spec.md` in sync with it.
- Table order is part of the PUA encoding (`src/compose.ts`). Append, don't reorder, once frozen.
- Merged or unused sounds are out of scope by design.
- `npm test`, `npm run typecheck`, `npm run build`.
