import { test, expect } from "vitest";
import compare from "./solution";
import { tree, tree2 } from "./tree";

test("Compare Binary Trees", function () {
    expect(compare(tree, tree)).toEqual(true);
    expect(compare(tree, tree2)).toEqual(false);
});

test("nulls, independent equal trees, values, and structural differences", () => {
  const leaf = {value: 1, left: null, right: null};
  expect(compare(null, null)).toBe(true);
  expect(compare(leaf, null)).toBe(false);
  expect(compare(null, leaf)).toBe(false);
  expect(compare(leaf, {...leaf})).toBe(true);
  expect(compare(leaf, {...leaf, value: 2})).toBe(false);
  const a = {value: 0, left: leaf, right: null};
  const before = structuredClone(a);
  expect(compare(a, structuredClone(a))).toBe(true);
  expect(compare(a, {value: 0, left: null, right: leaf})).toBe(false);
  expect(a).toEqual(before);
});
