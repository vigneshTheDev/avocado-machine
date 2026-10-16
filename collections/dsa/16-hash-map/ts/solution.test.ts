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
