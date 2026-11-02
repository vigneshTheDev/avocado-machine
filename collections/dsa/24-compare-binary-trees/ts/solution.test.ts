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

type Tree = { value: number; left: Tree | null; right: Tree | null };

// Full tree of depth 5 in heap order: node i has children 2i and 2i + 1.
function fullTree(i = 1): Tree | null {
  return i > 31 ? null : { value: i, left: fullTree(2 * i), right: fullTree(2 * i + 1) };
}

function chain(n: number, side: "left" | "right"): Tree | null {
  let head: Tree | null = null;
  for (let value = n; value >= 1; value--) {
    head = { value, left: side === "left" ? head : null, right: side === "right" ? head : null };
  }
  return head;
}

test("detects differences at the deepest level of a full tree", () => {
  const a = fullTree()!;
  const before = structuredClone(a);
  expect(compare(a, fullTree())).toBe(true);

  const changedLeaf = fullTree()!;
  changedLeaf.right!.right!.right!.right!.value = -31;
  expect(compare(a, changedLeaf)).toBe(false);

  const extraChild = fullTree()!;
  extraChild.left!.left!.left!.left!.left = { value: 32, left: null, right: null };
  expect(compare(a, extraChild)).toBe(false);
  expect(compare(extraChild, a)).toBe(false);

  const missingLeaf = fullTree()!;
  missingLeaf.right!.left!.right!.right = null;
  expect(compare(a, missingLeaf)).toBe(false);
  expect(compare(missingLeaf, a)).toBe(false);
  expect(a).toEqual(before);
});

test("same values in a different shape are unequal", () => {
  expect(compare(chain(5, "left"), chain(5, "right"))).toBe(false);
  // Mirror images share the same set of values.
  const leaf = (value: number): Tree => ({ value, left: null, right: null });
  expect(compare({ value: 1, left: leaf(2), right: leaf(3) }, { value: 1, left: leaf(3), right: leaf(2) })).toBe(false);
  // Same preorder [1, 2] but the child is on a different side.
  expect(compare({ value: 1, left: leaf(2), right: null }, { value: 1, left: null, right: leaf(2) })).toBe(false);
});

test("compares 2,000-node skewed chains", () => {
  for (const side of ["left", "right"] as const) {
    expect(compare(chain(2000, side), chain(2000, side))).toBe(true);
    expect(compare(chain(2000, side), chain(1999, side))).toBe(false);
    expect(compare(chain(1999, side), chain(2000, side))).toBe(false);
  }
});

test("a tree equals itself and zero values are compared like other values", () => {
  const head = fullTree();
  expect(compare(head, head)).toBe(true);
  const zero: Tree = { value: 0, left: null, right: null };
  expect(compare(zero, { value: 0, left: null, right: null })).toBe(true);
  expect(compare(zero, { value: 1, left: null, right: null })).toBe(false);
});
