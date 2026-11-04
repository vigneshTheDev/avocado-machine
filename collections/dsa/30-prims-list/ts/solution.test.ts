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

// Deterministic PRNG so failures are reproducible.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function undirected(size: number, edges: [number, number, number][]): WeightedAdjacencyList {
  const graph: WeightedAdjacencyList = Array.from({ length: size }, () => []);
  for (const [a, b, weight] of edges) {
    graph[a].push({ to: b, weight });
    graph[b].push({ to: a, weight });
  }
  return graph;
}

// MST weight by Kruskal's algorithm with union-find (an oracle, not Prim's).
function kruskalWeight(size: number, edges: [number, number, number][]) {
  const parent = Array.from({ length: size }, (_, i) => i);
  const find = (v: number): number => (parent[v] === v ? v : (parent[v] = find(parent[v])));
  let total = 0, used = 0;
  for (const [a, b, weight] of [...edges].sort((x, y) => x[2] - y[2])) {
    const ra = find(a), rb = find(b);
    if (ra === rb) continue;
    parent[ra] = rb;
    total += weight;
    used++;
  }
  return used === size - 1 ? total : null;
}

test("two vertices, a path, and a star", () => {
  checkMst(undirected(2, [[0, 1, -4]]), -4);
  checkMst(undirected(5, [[0, 1, 3], [1, 2, 1], [2, 3, 4], [3, 4, 1]]), 9);
  checkMst(undirected(5, [[0, 1, 2], [0, 2, 2], [0, 3, 2], [0, 4, 2]]), 8);
});

test("a complete graph where the cheapest edges are far from vertex 0", () => {
  const edges: [number, number, number][] = [];
  for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) edges.push([a, b, a === 0 ? 100 : a + b]);
  checkMst(undirected(6, edges), kruskalWeight(6, edges)!);
});

test("returns null when the graph is disconnected away from vertex 0", () => {
  expect(prims(undirected(4, [[0, 1, 1], [2, 3, 1]]))).toBeNull();
  expect(prims(undirected(4, [[0, 1, 1], [1, 2, 1]]))).toBeNull();
  expect(prims(undirected(3, [[1, 2, 1]]))).toBeNull();
});

test("matches Kruskal's total weight on seeded random graphs", () => {
  const random = seeded(30);
  for (let round = 0; round < 80; round++) {
    const size = 2 + Math.floor(random() * 12);
    const edges: [number, number, number][] = [];
    for (let a = 0; a < size; a++) {
      for (let b = a + 1; b < size; b++) {
        // Small weight range so ties are common; negatives and zero included.
        if (random() < 0.35) edges.push([a, b, Math.floor(random() * 9) - 3]);
      }
    }
    const graph = undirected(size, edges);
    const expected = kruskalWeight(size, edges);
    if (expected === null) {
      expect(prims(graph), `round ${round}`).toBeNull();
    } else {
      checkMst(graph, expected);
    }
  }
});
