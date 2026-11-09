import { DAKUTEN, HANDAKUTEN, LETTER_COUNT, letter } from "./letters.js";

/**
 * GOLDEN RULE: every ARP character can be typed on a JIS keyboard without
 * ever pressing Shift. US ANSI / ISO layouts will use the Shift layer instead.
 *
 * Keys are KeyboardEvent.code values. These are the 48 unshifted JIS keys that
 * carry a kana in the JIS kana layout.
 */
export const JIS_KEYS = [
  // number row: ぬ ふ あ う え お や ゆ よ わ ほ へ ー
  "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7",
  "Digit8", "Digit9", "Digit0", "Minus", "Equal", "IntlYen",
  // top row: た て い す か ん な に ら せ ゛ ゜
  "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO",
  "KeyP", "BracketLeft", "BracketRight",
  // home row: ち と し は き く ま の り れ け む
  "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
  "Semicolon", "Quote", "Backslash",
  // bottom row: つ さ そ ひ こ み も ね る め ろ
  "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period",
  "Slash", "IntlRo",
] as const;

export type JisKey = (typeof JIS_KEYS)[number];

/** ゛ and ゜ sit where they do on a JIS kana keyboard: the @ and [ keys. */
export const DAKUTEN_KEY: JisKey = "BracketLeft";
export const HANDAKUTEN_KEY: JisKey = "BracketRight";

/** Keys available for the 44 letters (46 candidates; 2 will stay unused). */
export const LETTER_KEYS: readonly JisKey[] = JIS_KEYS.filter(
  (k) => k !== DAKUTEN_KEY && k !== HANDAKUTEN_KEY,
);

/**
 * Key → letter index. Empty until the letters are designed.
 * Must stay injective and use at most LETTER_COUNT keys (enforced in tests).
 */
export const KEYMAP: Readonly<Partial<Record<JisKey, number>>> = {};

/** The character an unshifted JIS keypress produces, if any. */
export function keyToChar(code: string): string | undefined {
  if (code === DAKUTEN_KEY) return DAKUTEN;
  if (code === HANDAKUTEN_KEY) return HANDAKUTEN;
  const i = KEYMAP[code as JisKey];
  return i === undefined ? undefined : letter(i);
}

export { LETTER_COUNT };
