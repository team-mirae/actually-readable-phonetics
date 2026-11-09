import { describe, expect, it } from "vitest";
import {
  ArpParseError,
  compose,
  decompose,
  parseWord,
  SYLLABLE_COUNT,
  syllableToAscii,
  toIpa,
  transcribe,
} from "../src/index.js";

const ascii = (w: string) => parseWord(w).map(syllableToAscii);

describe("parseWord", () => {
  it("splits open syllables", () => {
    expect(ascii("hana")).toEqual(["ha", "na"]);
    expect(ascii("sakura")).toEqual(["sa", "ku", "ra"]);
  });

  it("keeps a coda when no vowel follows", () => {
    expect(ascii("bang")).toEqual(["bang"]);
    expect(ascii("kimchi")).toEqual(["kim", "chi"]);
    expect(ascii("saN")).toEqual(["saN"]);
  });

  it("honours explicit breaks", () => {
    expect(ascii("han.a")).toEqual(["han", "a"]);
    // Greedy maximal onset reads "hangeul" as ha.ngeul; 한글 needs a break.
    expect(ascii("hangeul")).toEqual(["ha", "ngeul"]);
    expect(ascii("han.geul")).toEqual(["han", "geul"]);
  });

  it("reads Korean tense and aspirated onsets", () => {
    expect(ascii("ppang")).toEqual(["ppang"]);
    expect(ascii("k'al")).toEqual(["k'al"]);
  });

  it("rejects vowelless input", () => {
    expect(() => parseWord("str")).toThrow(ArpParseError);
  });
});

describe("compose", () => {
  it("round-trips every syllable", () => {
    for (const w of ["a", "ka", "ppang", "saN", "thing", "eui"]) {
      for (const s of parseWord(w)) expect(decompose(compose(s))).toEqual(s);
    }
    expect(SYLLABLE_COUNT).toBeGreaterThan(0);
  });

  it("emits one codepoint per syllable", () => {
    expect([...transcribe("sakura")]).toHaveLength(3);
  });
});

describe("transcribe", () => {
  it("makes spaces optional", () => {
    expect(transcribe("hana bi", { spaces: false })).toBe(transcribe("hanabi"));
    expect(transcribe("hana bi")).toContain("　");
  });

  it("renders back to IPA for debugging", () => {
    expect(toIpa(transcribe("hana bi"))).toBe("ha.na bi");
  });
});
