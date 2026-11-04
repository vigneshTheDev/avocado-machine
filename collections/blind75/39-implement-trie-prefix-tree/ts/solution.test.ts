import { expect, test } from "vitest";
import { PrefixTree } from "./solution";

test("distinguishes a complete word from a prefix", () => {
  const trie = new PrefixTree();
  expect(trie.search("app")).toBe(false);
  expect(trie.startsWith("app")).toBe(false);
  trie.insert("apple");
  expect(trie.search("app")).toBe(false);
  expect(trie.startsWith("app")).toBe(true);
  expect(trie.search("apple")).toBe(true);
});

test("inserting a shorter word later marks an existing branch as complete", () => {
  const trie = new PrefixTree();
  trie.insert("apple");
  trie.insert("app");
  expect(trie.search("app")).toBe(true);
  expect(trie.search("apple")).toBe(true);
  expect(trie.startsWith("appl")).toBe(true);
});

test("shared prefixes and duplicate inserts do not add unrelated words", () => {
  const trie = new PrefixTree();
  trie.insert("car");
  trie.insert("cat");
  trie.insert("car");
  expect(trie.search("car")).toBe(true);
  expect(trie.search("cat")).toBe(true);
  expect(trie.search("cap")).toBe(false);
  expect(trie.startsWith("ca")).toBe(true);
  expect(trie.startsWith("cab")).toBe(false);
});

test("startsWith accepts a complete word and search rejects words absent from the trie", () => {
  const trie = new PrefixTree();
  trie.insert("apple");
  expect(trie.startsWith("apple")).toBe(true);
  expect(trie.startsWith("apples")).toBe(false);
  expect(trie.search("banana")).toBe(false);
  expect(trie.search("b")).toBe(false);
  expect(trie.search("applex")).toBe(false);
});

test("many inserted words are all found and their prefixes are not words", () => {
  const trie = new PrefixTree();
  const words: string[] = [];
  for (let i = 0; i < 2000; i++) {
    let n = i;
    let word = "";
    do {
      word += String.fromCharCode(97 + (n % 26));
      n = Math.floor(n / 26);
    } while (n > 0);
    words.push(word + "z");
  }
  words.forEach((word) => trie.insert(word));
  for (const word of words) {
    expect(trie.search(word)).toBe(true);
    expect(trie.startsWith(word.slice(0, -1))).toBe(true);
  }
  expect(trie.search("a")).toBe(false);
  expect(trie.search("zzzzz")).toBe(false);
  expect(trie.startsWith("zzzzz")).toBe(false);
});
