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
