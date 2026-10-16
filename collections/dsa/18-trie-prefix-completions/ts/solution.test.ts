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
