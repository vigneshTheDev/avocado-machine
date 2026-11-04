import { test, expect } from "vitest";
import bfs from "./solution";
import { list2 } from "./graph";

test("bfs - graph", function () {
    expect(bfs(list2, 0, 6)).toEqual([
        0,
        1,
        4,
        5,
        6,
    ]);

    expect(bfs(list2, 6, 0)).toEqual(null);
});

test("cycles, neighbor order, identity path, and unreachable vertices", () => {
  const graph = [[{to: 1, weight: 0}, {to: 2, weight: 10}], [{to: 0, weight: 1}, {to: 1, weight: 1}, {to: 3, weight: 2}], [{to: 3, weight: 1}], []];
  const before = structuredClone(graph);
  expect(bfs(graph, 0, 3)).toEqual([0, 1, 3]);
  expect(bfs(graph, 3, 0)).toBeNull();
  expect(bfs(graph, 1, 1)).toEqual([1]);
  expect(graph).toEqual(before);
});

test("uses fewest edges rather than weight or DFS order", () => {
  expect(bfs([[{to: 1, weight: 1}, {to: 3, weight: 100}], [{to: 2, weight: 1}], [{to: 3, weight: 1}], []], 0, 3)).toEqual([0, 3]);
});

type Graph = { to: number; weight: number }[][];

// Builds an adjacency list from [from, [to...]] pairs; every weight is 1.
function graphOf(size: number, edges: [number, number[]][]): Graph {
  const graph: Graph = Array.from({ length: size }, () => []);
  for (const [from, tos] of edges) for (const to of tos) graph[from].push({ to, weight: 1 });
  return graph;
}

// Deterministic PRNG so failures are reproducible.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fewest-edge distances from source by repeated relaxation (not BFS).
function hopDistances(graph: Graph, source: number) {
  const dist = graph.map(() => Infinity);
  dist[source] = 0;
  for (let round = 0; round < graph.length; round++) {
    graph.forEach((edges, from) => edges.forEach(({ to }) => { dist[to] = Math.min(dist[to], dist[from] + 1); }));
  }
  return dist;
}

test("prefers a short route over the first depth-first branch", () => {
  const graph = graphOf(6, [[0, [1, 4]], [1, [2]], [2, [3]], [3, [5]], [4, [5]]]);
  expect(bfs(graph, 0, 5)).toEqual([0, 4, 5]);
});

test("reaches the target through an edge back toward the source", () => {
  const graph = graphOf(3, [[1, [2]], [2, [1, 0]]]);
  expect(bfs(graph, 1, 0)).toEqual([1, 2, 0]);
  expect(bfs(graph, 0, 1)).toBeNull();
});

test("ignores self-loops", () => {
  const graph = graphOf(3, [[0, [0, 1]], [1, [1, 0, 2]], [2, [2]]]);
  const before = structuredClone(graph);
  expect(bfs(graph, 0, 2)).toEqual([0, 1, 2]);
  expect(bfs(graph, 0, 0)).toEqual([0]);
  expect(bfs(graph, 2, 0)).toBeNull();
  expect(graph).toEqual(before);
});

test("neighbor order decides between equally short paths", () => {
  expect(bfs(graphOf(4, [[0, [2, 1]], [1, [3]], [2, [3]]]), 0, 3)).toEqual([0, 2, 3]);
});

test("takes a shortcut across a 1,000-vertex chain", () => {
  const edges = Array.from({ length: 999 }, (_, i) => [i, [i + 1]] as [number, number[]]);
  edges[0][1].push(500);
  const graph = graphOf(1000, edges);
  expect(bfs(graph, 0, 999)).toEqual([0, ...Array.from({ length: 500 }, (_, i) => 500 + i)]);
  expect(bfs(graph, 1, 999)).toHaveLength(999);
  expect(bfs(graph, 999, 0)).toBeNull();
});

test("returns a fewest-edge path on seeded random directed graphs", () => {
  const random = seeded(27);
  for (let round = 0; round < 60; round++) {
    const size = 2 + Math.floor(random() * 14);
    const graph: Graph = Array.from({ length: size }, () => []);
    for (let from = 0; from < size; from++) {
      for (let to = 0; to < size; to++) if (random() < 0.18) graph[from].push({ to, weight: Math.floor(random() * 50) });
    }
    const source = Math.floor(random() * size);
    const dist = hopDistances(graph, source);
    for (let needle = 0; needle < size; needle++) {
      const path = bfs(graph, source, needle);
      const where = `round ${round}, ${source} -> ${needle}`;
      if (dist[needle] === Infinity) {
        expect(path, where).toBeNull();
        continue;
      }
      expect(path, where).not.toBeNull();
      expect(path![0], where).toBe(source);
      expect(path!.at(-1), where).toBe(needle);
      expect(path!.length - 1, where).toBe(dist[needle]);
      for (let i = 1; i < path!.length; i++) {
        expect(graph[path![i - 1]].some((edge) => edge.to === path![i]), where).toBe(true);
      }
    }
  }
});
