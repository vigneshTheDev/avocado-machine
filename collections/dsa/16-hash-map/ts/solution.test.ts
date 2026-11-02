import { test, expect } from "vitest";
import MyMap from "./solution";

test("Map", function() {
    const map = new MyMap<string, number>();
    map.set("foo", 55);
    expect(map.size()).toEqual(1);
    map.set("fool", 75);
    expect(map.size()).toEqual(2);
    map.set("foolish", 105);
    expect(map.size()).toEqual(3);
    map.set("bar", 69);
    expect(map.size()).toEqual(4);


    expect(map.get("bar")).toEqual(69);
    expect(map.get("blaz")).toEqual(undefined);

    map.delete("barblabr");
    expect(map.size()).toEqual(4);

    map.delete("bar");
    expect(map.size()).toEqual(3);
    expect(map.get("bar")).toEqual(undefined);
});

test("updates, key identity, special strings, and deletion return values", () => {
  const map = new MyMap<string | number, number>();
  expect(map.size()).toBe(0);
  expect(map.delete("missing")).toBeUndefined();
  for (const [key, value] of [[1, 10], ["1", 20], ["", 0], ["__proto__", 30], ["constructor", 40]] as const) map.set(key, value);
  expect(map.size()).toBe(5);
  expect(map.get(1)).toBe(10);
  expect(map.get("1")).toBe(20);
  expect(map.get("")).toBe(0);
  expect(map.get("__proto__")).toBe(30);
  expect(map.get("constructor")).toBe(40);
  map.set(1, 11);
  expect(map.size()).toBe(5);
  expect(map.delete(1)).toBe(11);
  expect(map.get("1")).toBe(20);
  expect(map.delete(1)).toBeUndefined();
  map.set(-0, 5);
  map.set(0, 6);
  expect(map.get(-0)).toBe(6);
  expect(map.size()).toBe(5);
});

test("preserves many entries across collisions, deletion, and reinsertion", () => {
  const map = new MyMap<string, number>();
  const keys = Array.from({ length: 300 }, (_, i) => `key-${i}`);
  keys.forEach((key, i) => map.set(key, i));
  expect(map.size()).toBe(300);
  keys.forEach((key, i) => expect(map.get(key)).toBe(i));
  keys.forEach((key, i) => { if (i % 2 === 0) expect(map.delete(key)).toBe(i); });
  expect(map.size()).toBe(150);
  keys.forEach((key, i) => expect(map.get(key)).toBe(i % 2 === 0 ? undefined : i));
  keys.forEach((key, i) => map.set(key, -i));
  expect(map.size()).toBe(300);
  keys.forEach((key, i) => expect(map.get(key)).toBe(-i));
});

// Deterministic PRNG so failures are reproducible.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

test.each([
  // Anagrams collide under a character-sum hash.
  ["anagrams", ["abc", "acb", "bac", "bca", "cab", "cba"]],
  // These collide under the Java-style 31 * h + c string hash.
  ["31-multiplier hash", ["Aa", "BB", "AaAa", "AaBB", "BBAa", "BBBB"]],
])("keeps colliding %s keys separate through deletes and re-gets", (_, keys) => {
  const map = new MyMap<string, number>();
  keys.forEach((key, i) => map.set(key, i));
  expect(map.size()).toBe(keys.length);
  keys.forEach((key, i) => expect(map.get(key)).toBe(i));

  // Delete from the middle, the front, and the end of a collision chain.
  for (const idx of [2, 0, keys.length - 1]) {
    expect(map.delete(keys[idx])).toBe(idx);
    expect(map.get(keys[idx])).toBeUndefined();
    expect(map.delete(keys[idx])).toBeUndefined();
  }
  expect(map.size()).toBe(keys.length - 3);
  keys.forEach((key, i) => expect(map.get(key)).toBe([0, 2, keys.length - 1].includes(i) ? undefined : i));

  map.set(keys[2], 20);
  expect(map.get(keys[2])).toBe(20);
  expect(map.size()).toBe(keys.length - 2);
});

test("keeps numeric keys that share low bits or nearby values separate", () => {
  const map = new MyMap<number, string>();
  const keys = [0, 16, 32, 64, 1024, 2 ** 31, 2 ** 32, 2 ** 32 + 16, -1, -17, 0.5, 1.5, 1e21, -1e21, Number.MAX_SAFE_INTEGER];
  keys.forEach((key) => map.set(key, `v${key}`));
  expect(map.size()).toBe(keys.length);
  keys.forEach((key) => expect(map.get(key)).toBe(`v${key}`));
  expect(map.get(1)).toBeUndefined();
  expect(map.get(2 ** 32 + 1)).toBeUndefined();
  expect(map.delete(16)).toBe("v16");
  expect(map.get(32)).toBe("v32");
  expect(map.get(0)).toBe("v0");
  expect(map.size()).toBe(keys.length - 1);
});

test("delete then get, re-set, and size after deleting missing keys", () => {
  const map = new MyMap<string, number>();
  map.set("a", 1);
  map.set("b", 0);
  expect(map.delete("a")).toBe(1);
  expect(map.get("a")).toBeUndefined();
  expect(map.size()).toBe(1);
  expect(map.delete("a")).toBeUndefined();
  expect(map.delete("never")).toBeUndefined();
  expect(map.size()).toBe(1);
  expect(map.delete("b")).toBe(0);
  expect(map.size()).toBe(0);
  expect(map.delete("b")).toBeUndefined();
  expect(map.size()).toBe(0);
  map.set("a", 2);
  expect(map.get("a")).toBe(2);
  expect(map.size()).toBe(1);
});

test("stores falsy values distinctly from misses", () => {
  const map = new MyMap<string, unknown>();
  for (const [key, value] of [["zero", 0], ["empty", ""], ["no", false], ["nil", null]] as const) map.set(key, value);
  expect(map.size()).toBe(4);
  expect(map.get("zero")).toBe(0);
  expect(map.get("empty")).toBe("");
  expect(map.get("no")).toBe(false);
  expect(map.get("nil")).toBeNull();
  expect(map.delete("no")).toBe(false);
  expect(map.size()).toBe(3);
});

test("matches the built-in Map over seeded random operations", () => {
  const random = seeded(16);
  const map = new MyMap<string | number, number>();
  const model = new globalThis.Map<string | number, number>();
  // Numbers and their string forms, so 1 and "1" must stay distinct.
  const pool: (string | number)[] = [];
  for (let i = 0; i < 60; i++) pool.push(i, String(i));
  pool.push(-0, "", "__proto__", "constructor", "toString", "hasOwnProperty");

  for (let step = 0; step < 8000; step++) {
    const key = pool[Math.floor(random() * pool.length)];
    const op = random();
    const where = `step ${step}, key ${typeof key} ${String(key)}`;
    if (op < 0.5) {
      const value = Math.floor(random() * 100);
      map.set(key, value);
      model.set(key, value);
      expect(map.size(), where).toBe(model.size);
    } else if (op < 0.75) {
      expect(map.delete(key), where).toBe(model.get(key));
      model.delete(key);
      expect(map.size(), where).toBe(model.size);
    } else {
      expect(map.get(key), where).toBe(model.get(key));
    }
  }
  for (const key of pool) expect(map.get(key)).toBe(model.get(key));
});
