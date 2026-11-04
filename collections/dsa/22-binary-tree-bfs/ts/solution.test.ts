import { test, expect } from "vitest";
import bfs from "./solution";
import { tree } from "./tree";

test("bt bfs", function () {
    expect(bfs(tree, 45)).toEqual(true);
    expect(bfs(tree, 7)).toEqual(true);
    expect(bfs(tree, 69)).toEqual(false);
});

test("empty tree, root hits, misses, and child searches", () => {
  expect(bfs(null, 0)).toBe(false);
  const head = {value: 0, left: {value: 10, left: null, right: null}, right: {value: -5, left: null, right: null}};
  const before = structuredClone(head);
  for (const value of [0, -5, 10]) expect(bfs(head, value)).toBe(true);
  expect(bfs(head, 7)).toBe(false);
  expect(head).toEqual(before);
});

type Tree = { value: number; left: Tree | null; right: Tree | null };

// Full tree of depth 5 in heap order: node i has children 2i and 2i + 1.
function fullTree(valueOf: (i: number) => number, i = 1): Tree | null {
  return i > 31 ? null : { value: valueOf(i), left: fullTree(valueOf, 2 * i), right: fullTree(valueOf, 2 * i + 1) };
}

test("finds a value stored only in the deepest, last leaf", () => {
  const head = fullTree((i) => (i === 31 ? 99 : i % 3));
  const before = structuredClone(head);
  expect(bfs(head, 99)).toBe(true);
  expect(bfs(head, 98)).toBe(false);
  expect(bfs(head, 2)).toBe(true);
  expect(head).toEqual(before);
});

test("searches repeated and negative values that do not follow BST order", () => {
  const head = fullTree((i) => (i % 2 ? -i : 4));
  for (const value of [4, -1, -31, -15, -17]) expect(bfs(head, value)).toBe(true);
  for (const value of [-2, 0, 1, 31, 5]) expect(bfs(head, value)).toBe(false);
});

test("searches a 2,000-node right-skewed chain", () => {
  let head: Tree | null = null;
  for (let value = 2000; value >= 1; value--) head = { value, left: null, right: head };
  expect(bfs(head, 2000)).toBe(true);
  expect(bfs(head, 1)).toBe(true);
  expect(bfs(head, 2001)).toBe(false);
});

test("visits level by level instead of depth first", () => {
  // Record the depth of every node whose value is read.
  const depths: number[] = [];
  const build = (i: number, depth: number): Tree | null => {
    if (i > 31) return null;
    const node = { left: build(2 * i, depth + 1), right: build(2 * i + 1, depth + 1) } as Tree;
    Object.defineProperty(node, "value", { get: () => (depths.push(depth), i), enumerable: true });
    return node;
  };
  const head = build(1, 0);

  // The root's right child is found before any deeper node needs to be read.
  expect(bfs(head, 3)).toBe(true);
  expect(Math.max(...depths)).toBeLessThanOrEqual(1);

  depths.length = 0;
  // Node 7 is the last node of depth 2, so no depth 3 or 4 node may be read first.
  expect(bfs(head, 7)).toBe(true);
  expect(Math.max(...depths)).toBeLessThanOrEqual(2);
});
