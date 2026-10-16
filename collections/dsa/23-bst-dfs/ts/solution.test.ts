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
