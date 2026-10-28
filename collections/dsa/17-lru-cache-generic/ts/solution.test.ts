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
