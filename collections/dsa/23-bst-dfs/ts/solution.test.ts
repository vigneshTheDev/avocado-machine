import { test, expect } from "vitest";
import dfs from "./solution";
import { tree } from "./tree";

test("DFS on BST", function () {
    expect(dfs(tree, 45)).toEqual(true);
    expect(dfs(tree, 7)).toEqual(true);
    expect(dfs(tree, 69)).toEqual(false);
});

test("empty tree, root hits, misses, and child searches", () => {
  expect(dfs(null, 0)).toBe(false);
  const head = {value: 0, left: {value: -5, left: null, right: null}, right: {value: 10, left: null, right: null}};
  const before = structuredClone(head);
  for (const value of [0, -5, 10]) expect(dfs(head, value)).toBe(true);
  expect(dfs(head, 7)).toBe(false);
  expect(head).toEqual(before);
});

type Tree = { value: number; left: Tree | null; right: Tree | null };

// Balanced BST over sorted unique values. When `read` is given, every node
// records itself in it when its value is read.
function balanced(values: number[], read?: Set<Tree>, lo = 0, hi = values.length - 1): Tree | null {
  if (lo > hi) return null;
  const mid = (lo + hi) >> 1;
  const node = { left: balanced(values, read, lo, mid - 1), right: balanced(values, read, mid + 1, hi) } as Tree;
  const value = values[mid];
  Object.defineProperty(node, "value", { get: () => (read?.add(node), value), enumerable: true });
  return node;
}

test("finds the deepest leaves and misses between values in a 1,023-node BST", () => {
  const values = Array.from({ length: 1023 }, (_, i) => i * 2 - 1000);
  const head = balanced(values);
  for (const value of [values[0], values[1022], values[511], values[1], values[1021]]) expect(dfs(head, value)).toBe(true);
  for (const value of [-1001, values[1022] + 1, 1, -999, 0.5]) expect(dfs(head, value)).toBe(false);
});

test("follows only the search path", () => {
  // A 1,023-node balanced BST has height 10, so a single root-to-leaf path
  // reads at most 10 nodes; exploring other branches reads far more.
  const values = Array.from({ length: 1023 }, (_, i) => i + 1);
  const read = new Set<Tree>();
  const head = balanced(values, read);
  for (const needle of [1, 1023, 512, 300, 0, 1024, 700.5]) {
    read.clear();
    expect(dfs(head, needle)).toBe(needle >= 1 && needle <= 1023 && needle % 1 === 0);
    expect(read.size, `needle ${needle} read ${read.size} nodes`).toBeLessThanOrEqual(10);
  }
});

test("searches skewed BSTs of 2,000 nodes", () => {
  let right: Tree | null = null;
  let left: Tree | null = null;
  for (let value = 2000; value >= 1; value--) right = { value, left: null, right };
  for (let value = 1; value <= 2000; value++) left = { value, left, right: null };
  for (const head of [right, left]) {
    expect(dfs(head, 1)).toBe(true);
    expect(dfs(head, 2000)).toBe(true);
    expect(dfs(head, 1000)).toBe(true);
    expect(dfs(head, 0)).toBe(false);
    expect(dfs(head, 2001)).toBe(false);
    expect(dfs(head, 1000.5)).toBe(false);
  }
});

test("negative and fractional values", () => {
  const head = balanced([-10.5, -3, -0.25, 0, 0.25, 7, 12.75]);
  for (const value of [-10.5, -3, -0.25, 0, 0.25, 7, 12.75]) expect(dfs(head, value)).toBe(true);
  for (const value of [-11, -0.5, 0.1, 13]) expect(dfs(head, value)).toBe(false);
});
