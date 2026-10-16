import { test, expect } from "vitest";
import prims from "./solution";
import type { WeightedAdjacencyList } from "./types";

function checkMst(graph: WeightedAdjacencyList, weight: number) {
  const before = structuredClone(graph);
  const result = prims(graph);
  expect(graph).toEqual(before);
  expect(result).not.toBeNull();
  if (result === null) throw new Error("Expected a connected tree");
  expect(result).toHaveLength(graph.length);
  let total = 0, edges = 0;
  result.forEach((neighbors, from) => neighbors.forEach(edge => {
    expect(edge.to).not.toBe(from);
    expect(graph[from]).toContainEqual(edge);
    expect(result[edge.to]).toContainEqual({to: from, weight: edge.weight});
    total += edge.weight;
    edges++;
  }));
  expect(edges).toBe(2 * (graph.length - 1));
  expect(total / 2).toBe(weight);
  const seen = new Set<number>();
  const visit = (v: number) => {
    if (seen.has(v)) return;
    seen.add(v);
    result[v].forEach(edge => visit(edge.to));
  };
  visit(0);
  expect(seen.size).toBe(graph.length);
}

test("finds the source fixture's MST without depending on neighbor order", () => {
  // Symmetric undirected version of kata-machine's list1 fixture.
  const graph: WeightedAdjacencyList = Array.from({length: 7}, () => []);
  for (const [a, b, weight] of [[0,1,3], [0,2,1], [1,2,4], [1,4,1], [2,3,7], [3,4,5], [3,6,1], [4,5,2], [5,6,1], [2,5,18]]) {
    graph[a].push({to: b, weight});
    graph[b].push({to: a, weight});
  }
  checkMst(graph, 9);
});

test("empty, singleton, and disconnected graphs", () => {
  expect(prims([])).toEqual([]);
  expect(prims([[]])).toEqual([[]]);
  expect(prims([[], []])).toBeNull();
  expect(prims([[{to: 1, weight: 1}], [{to: 0, weight: 1}], []])).toBeNull();
});

test("accepts ties and handles zero/negative edges and self-loops", () => {
  checkMst([[{to: 1, weight: 1}, {to: 2, weight: 1}], [{to: 0, weight: 1}, {to: 2, weight: 1}], [{to: 0, weight: 1}, {to: 1, weight: 1}]], 2);
  checkMst([[{to: 0, weight: -100}, {to: 1, weight: 0}, {to: 2, weight: 5}], [{to: 0, weight: 0}, {to: 2, weight: -2}], [{to: 0, weight: 5}, {to: 1, weight: -2}]], -2);
});
