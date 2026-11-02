import { test, expect } from "vitest";
import Trie from "./solution";

test("Trie", function() {
    const trie = new Trie();
    trie.insert("foo");
    trie.insert("fool");
    trie.insert("foolish");
    trie.insert("bar");

    expect(trie.find("fo").sort()).toEqual([
        "foo",
        "fool",
        "foolish",
    ]);

    trie.delete("fool");

    expect(trie.find("fo").sort()).toEqual([
        "foo",
        "foolish",
    ]);
});

test("set semantics, absent deletion, empty words, and prefix preservation", () => {
  const trie = new Trie();
  expect(trie.find("")).toEqual([]);
  trie.delete("absent");
  for (const word of ["", "a", "at", "ate", "atom", "bar", "at"]) trie.insert(word);
  expect(trie.find("").sort()).toEqual(["", "a", "at", "ate", "atom", "bar"]);
  expect(trie.find("at").sort()).toEqual(["at", "ate", "atom"]);
  expect(trie.find("z")).toEqual([]);
  trie.delete("at");
  trie.delete("at");
  expect(trie.find("at").sort()).toEqual(["ate", "atom"]);
  expect(trie.find("a").sort()).toEqual(["a", "ate", "atom"]);
  trie.delete("ate");
  expect(trie.find("ate")).toEqual([]);
  trie.delete("");
  expect(trie.find("").sort()).toEqual(["a", "atom", "bar"]);
  trie.insert("at");
  expect(trie.find("at").sort()).toEqual(["at", "atom"]);
});

test("deleting a long word leaves no phantom prefixes", () => {
  const trie = new Trie();
  trie.insert("a");
  trie.insert("abcd");
  trie.delete("abcd");
  expect(trie.find("a")).toEqual(["a"]);
  expect(trie.find("ab")).toEqual([]);
  expect(trie.find("abcd")).toEqual([]);
  trie.insert("abc");
  expect(trie.find("ab")).toEqual(["abc"]);
  trie.delete("a");
  expect(trie.find("").sort()).toEqual(["abc"]);
  trie.delete("abc");
  expect(trie.find("")).toEqual([]);
  trie.insert("abcd");
  expect(trie.find("a")).toEqual(["abcd"]);
});

test("deleting a prefix or an extension of a stored word is a no-op for that word", () => {
  const trie = new Trie();
  trie.insert("care");
  trie.delete("car");
  trie.delete("cares");
  trie.delete("c");
  expect(trie.find("c")).toEqual(["care"]);
  expect(trie.find("care")).toEqual(["care"]);
  expect(trie.find("cares")).toEqual([]);
});

test("returns each word once across many branches", () => {
  const trie = new Trie();
  const words: string[] = [];
  for (const a of "abc") for (const b of "abc") for (const c of "abc") words.push(a, a + b, a + b + c);
  for (const word of words) trie.insert(word);
  const unique = [...new Set(words)].sort();
  expect(trie.find("").sort()).toEqual(unique);
  expect(trie.find("b").sort()).toEqual(unique.filter((w) => w.startsWith("b")));
  expect(trie.find("ca").sort()).toEqual(["ca", "caa", "cab", "cac"]);
  expect(trie.find("abc")).toEqual(["abc"]);
  expect(trie.find("abca")).toEqual([]);
});

test("matches a Set model over seeded random operations", () => {
  // Deterministic PRNG so failures are reproducible.
  let seed = 18;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const word = () => Array.from({ length: Math.floor(random() * 5) }, () => "abc"[Math.floor(random() * 3)]).join("");

  const trie = new Trie();
  const model = new Set<string>();
  for (let step = 0; step < 3000; step++) {
    const w = word();
    const op = random();
    if (op < 0.45) {
      trie.insert(w);
      model.add(w);
    } else if (op < 0.75) {
      trie.delete(w);
      model.delete(w);
    } else {
      const expected = [...model].filter((m) => m.startsWith(w)).sort();
      expect(trie.find(w).sort(), `step ${step}, find("${w}")`).toEqual(expected);
    }
  }
  expect(trie.find("").sort()).toEqual([...model].sort());
});
