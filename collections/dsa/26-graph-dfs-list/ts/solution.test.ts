import { test, expect } from "vitest";
import dfs from "./solution";
import { list2 } from "./graph";

test("dfs - graph", function () {
    expect(dfs(list2, 0, 6)).toEqual([
        0,
        1,
        4,
        5,
        6,
    ]);

    expect(dfs(list2, 6, 0)).toEqual(null);
});

test("cycles, neighbor order, identity path, and unreachable vertices", () => {
  const graph = [[{to: 1, weight: 0}, {to: 2, weight: 10}], [{to: 0, weight: 1}, {to: 1, weight: 1}, {to: 3, weight: 2}], [{to: 3, weight: 1}], []];
  const before = structuredClone(graph);
  expect(dfs(graph, 0, 3)).toEqual([0, 1, 3]);
  expect(dfs(graph, 3, 0)).toBeNull();
  expect(dfs(graph, 1, 1)).toEqual([1]);
  expect(graph).toEqual(before);
});

test("uses depth first neighbor order", () => {
  expect(dfs([[{to: 1, weight: 1}, {to: 3, weight: 100}], [{to: 2, weight: 1}], [{to: 3, weight: 1}], []], 0, 3)).toEqual([0, 1, 2, 3]);
});

type Graph = { to: number; weight: number }[][];

// Builds an adjacency list from [from, [to...]] pairs; every weight is 1.
function graphOf(size: number, edges: [number, number[]][]): Graph {
  const graph: Graph = Array.from({ length: size }, () => []);
  for (const [from, tos] of edges) for (const to of tos) graph[from].push({ to, weight: 1 });
  return graph;
}

test("follows the source fixture's first depth-first branch", () => {
  expect(dfs(list2, 0, 3)).toEqual([0, 1, 4, 3]);
  expect(dfs(list2, 0, 2)).toEqual([0, 1, 4, 5, 2]);
});

test("backtracks out of a dead-end branch and drops it from the path", () => {
  const graph = graphOf(6, [[0, [1, 4]], [1, [2]], [2, [3]], [4, [5]]]);
  const before = structuredClone(graph);
  expect(dfs(graph, 0, 5)).toEqual([0, 4, 5]);
  expect(graph).toEqual(before);
});

test("skips vertices already explored by an earlier dead-end branch", () => {
  const graph = graphOf(5, [[0, [1, 2]], [1, [3]], [2, [3, 4]]]);
  expect(dfs(graph, 0, 4)).toEqual([0, 2, 4]);
});

test("reaches the target through an edge back toward the source", () => {
  const graph = graphOf(3, [[1, [2]], [2, [1, 0]]]);
  expect(dfs(graph, 1, 0)).toEqual([1, 2, 0]);
  expect(dfs(graph, 0, 1)).toBeNull();
});

test("ignores self-loops", () => {
  const graph = graphOf(3, [[0, [0, 1]], [1, [1, 2]], [2, [2]]]);
  expect(dfs(graph, 0, 2)).toEqual([0, 1, 2]);
  expect(dfs(graph, 0, 0)).toEqual([0]);
  expect(dfs(graph, 2, 0)).toBeNull();
  expect(dfs(graphOf(1, [[0, [0]]]), 0, 0)).toEqual([0]);
});

test("neighbor order decides between equally valid paths", () => {
  const graph = graphOf(4, [[0, [2, 1]], [1, [3]], [2, [3]]]);
  expect(dfs(graph, 0, 3)).toEqual([0, 2, 3]);
});

test("walks a 1,000-vertex chain with back edges to the start", () => {
  const graph = graphOf(1000, Array.from({ length: 999 }, (_, i) => [i, [0, i + 1]] as [number, number[]]));
  expect(dfs(graph, 0, 999)).toEqual(Array.from({ length: 1000 }, (_, i) => i));
  expect(dfs(graph, 999, 0)).toBeNull();
  expect(dfs(graph, 500, 0)).toEqual([500, 0]);
});
