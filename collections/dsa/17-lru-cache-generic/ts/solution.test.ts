import { test, expect } from "vitest";
import LRU from "./solution";

test("LRU", function () {
    const lru = new LRU<string, number>(3);

    expect(lru.get("foo")).toEqual(undefined);
    lru.update("foo", 69);
    expect(lru.get("foo")).toEqual(69);

    lru.update("bar", 420);
    expect(lru.get("bar")).toEqual(420);

    lru.update("baz", 1337);
    expect(lru.get("baz")).toEqual(1337);

    lru.update("ball", 69420);
    expect(lru.get("ball")).toEqual(69420);
    expect(lru.get("foo")).toEqual(undefined);
    expect(lru.get("bar")).toEqual(420);
    lru.update("foo", 69);
    expect(lru.get("bar")).toEqual(420);
    expect(lru.get("foo")).toEqual(69);
    expect(lru.get("baz")).toEqual(undefined);
});

test("updates and reads change recency without evicting on a miss", () => {
  const cache = new LRU<string, number>(2);
  cache.update("a", 0);
  cache.update("b", 2);
  expect(cache.get("a")).toBe(0);
  expect(cache.get("missing")).toBeUndefined();
  cache.update("c", 3);
  expect(cache.get("b")).toBeUndefined();
  cache.update("a", 10);
  cache.update("d", 4);
  expect(cache.get("c")).toBeUndefined();
  expect(cache.get("a")).toBe(10);
  expect(cache.get("d")).toBe(4);
});

test("one capacity, replacement, and object keys", () => {
  const one = new LRU<object, boolean>(1);
  const a = {}, b = {};
  one.update(a, false);
  expect(one.get(a)).toBe(false);
  one.update(a, true);
  expect(one.get(a)).toBe(true);
  one.update(b, false);
  expect(one.get(a)).toBeUndefined();
  expect(one.get(b)).toBe(false);
});

test("zero capacity never retains entries, including repeated updates", () => {
  const cache = new LRU<string, number>(0);

  for (const [key, value] of [["a", 1], ["a", 2], ["b", 3]] as const) {
    cache.update(key, value);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
  }
});

test("repeated reads of the most recent entry preserve eviction order", () => {
  const cache = new LRU<string, number>(2);
  cache.update("a", 1);
  cache.update("b", 2);

  for (let i = 0; i < 5; i++) expect(cache.get("b")).toBe(2);

  cache.update("c", 3);
  expect(cache.get("a")).toBeUndefined();
  expect(cache.get("b")).toBe(2);
  expect(cache.get("c")).toBe(3);
});

test("repeated reads and updates of the sole entry preserve capacity", () => {
  const cache = new LRU<string, number>(1);
  cache.update("a", 1);

  for (let value = 2; value <= 5; value++) {
    expect(cache.get("a")).toBe(value - 1);
    expect(cache.get("a")).toBe(value - 1);
    cache.update("a", value);
    expect(cache.get("a")).toBe(value);
  }

  cache.update("b", 6);
  expect(cache.get("a")).toBeUndefined();
  expect(cache.get("b")).toBe(6);
});

test("updating the least recent entry at capacity preserves other entries", () => {
  const cache = new LRU<string, number>(2);
  cache.update("a", 1);
  cache.update("b", 2);
  cache.update("a", 10);

  expect(cache.get("b")).toBe(2);
  expect(cache.get("a")).toBe(10);
  cache.update("c", 3);
  expect(cache.get("b")).toBeUndefined();
  expect(cache.get("a")).toBe(10);
  expect(cache.get("c")).toBe(3);
});

test("reading a stored undefined value refreshes its recency", () => {
  const cache = new LRU<string, number | undefined>(2);
  cache.update("a", undefined);
  cache.update("b", 2);
  expect(cache.get("a")).toBeUndefined();

  cache.update("c", 3);
  expect(cache.get("b")).toBeUndefined();
  cache.update("a", 10);
  expect(cache.get("c")).toBe(3);
  expect(cache.get("a")).toBe(10);
});

test.each([null, false, 0, "", NaN])("retains the value %s and refreshes its recency", (value) => {
  const cache = new LRU<string, unknown>(2);
  cache.update("a", value);
  cache.update("b", "other");
  expect(cache.get("a")).toBe(value);

  cache.update("c", "new");
  expect(cache.get("b")).toBeUndefined();
  expect(cache.get("a")).toBe(value);
});

test.each([null, undefined, NaN, Symbol("key")])("supports retrieval and eviction for key %s", (key) => {
  const cache = new LRU<unknown, number>(2);
  cache.update(key, 1);
  cache.update("b", 2);
  expect(cache.get(key)).toBe(1);

  cache.update("c", 3);
  expect(cache.get("b")).toBeUndefined();
  expect(cache.get(key)).toBe(1);
  expect(cache.get("c")).toBe(3);

  cache.update("d", 4);
  expect(cache.get(key)).toBeUndefined();
  expect(cache.get("c")).toBe(3);
  expect(cache.get("d")).toBe(4);
});

test("positive and negative zero share one entry", () => {
  const cache = new LRU<number | string, string>(2);
  cache.update(0, "original");
  cache.update("b", "other");
  cache.update(-0, "updated");

  expect(cache.get("b")).toBe("other");
  expect(cache.get(0)).toBe("updated");
  expect(cache.get(-0)).toBe("updated");
  cache.update("c", "new");
  expect(cache.get("b")).toBeUndefined();
  expect(cache.get(0)).toBe("updated");
  expect(cache.get("c")).toBe("new");
});

test("object keys use identity rather than structural equality", () => {
  const cache = new LRU<object, string>(2);
  const a = { id: 1 };
  const b = { id: 1 };
  cache.update(a, "a");
  cache.update(b, "b");

  expect(cache.get({ id: 1 })).toBeUndefined();
  expect(cache.get(a)).toBe("a");
  cache.update({}, "c");
  expect(cache.get(b)).toBeUndefined();
  expect(cache.get(a)).toBe("a");
});

// Defensive API behavior beyond the exercise's nonnegative integer input contract.
test.each([-1, -0.5, 0.5, 1.5, NaN, Infinity, -Infinity])("rejects invalid capacity %s", (capacity) => {
  expect(() => new LRU<string, number>(capacity)).toThrow();
});
