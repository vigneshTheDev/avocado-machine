import { test, expect } from "vitest";
import dijkstra_list from "./solution";
import { list1 } from "./graph";

test("dijkstra via adj list", function () {
    expect(dijkstra_list(0, 6, list1)).toEqual([0, 1, 4, 5, 6]);
});

test("relaxes an initially worse route and respects direction", () => {
  const graph = [
    [{to: 1, weight: 10}, {to: 2, weight: 1}, {to: 3, weight: 20}],
    [{to: 3, weight: 2}],
    [{to: 1, weight: 1}, {to: 3, weight: 8}],
    [], [],
  ];
  const before = structuredClone(graph);
  expect(dijkstra_list(0, 3, graph)).toEqual([0, 2, 1, 3]);
  expect(dijkstra_list(0, 4, graph)).toEqual([]);
  expect(dijkstra_list(3, 0, graph)).toEqual([]);
  expect(dijkstra_list(2, 2, graph)).toEqual([2]);
  expect(graph).toEqual(before);
});

test("zero-weight edges, cycles, and an isolated vertex", () => {
  expect(dijkstra_list(0, 2, [[{to: 1, weight: 0}, {to: 2, weight: 3}], [{to: 0, weight: 0}, {to: 2, weight: 0}], []])).toEqual([0, 1, 2]);
  expect(dijkstra_list(0, 0, [[]])).toEqual([0]);
});

test("accepts any minimum path on equal-weight alternatives", () => {
  const graph = [[{to: 1, weight: 1}, {to: 2, weight: 1}], [{to: 3, weight: 1}], [{to: 3, weight: 1}], []];
  expect([[0, 1, 3], [0, 2, 3]]).toContainEqual(dijkstra_list(0, 3, graph));
});

type Graph = { to: number; weight: number }[][];

// Deterministic PRNG so failures are reproducible.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Minimum distances by Bellman-Ford relaxation (an oracle, not Dijkstra).
function distances(graph: Graph, source: number) {
  const dist = graph.map(() => Infinity);
  dist[source] = 0;
  for (let round = 0; round < graph.length; round++) {
    graph.forEach((edges, from) => edges.forEach(({ to, weight }) => { dist[to] = Math.min(dist[to], dist[from] + weight); }));
  }
  return dist;
}

// Checks that the path is made of real edges and has the minimum total weight.
function expectShortestPath(graph: Graph, source: number, sink: number, where = "") {
  const before = structuredClone(graph);
  const path = dijkstra_list(source, sink, graph);
  expect(graph).toEqual(before);
  const best = distances(graph, source)[sink];
  if (best === Infinity) {
    expect(path, where).toEqual([]);
    return path;
  }
  expect(path[0], where).toBe(source);
  expect(path.at(-1), where).toBe(sink);
  expect(new Set(path).size, `${where} repeats a vertex`).toBe(path.length);
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    const options = graph[path[i - 1]].filter((edge) => edge.to === path[i]);
    expect(options.length, `${where} uses missing edge ${path[i - 1]} -> ${path[i]}`).toBeGreaterThan(0);
    total += Math.min(...options.map((edge) => edge.weight));
  }
  expect(total, where).toBe(best);
  return path;
}

test("ignores a stale queue entry after a vertex's distance improves", () => {
  // Vertex 1 is first reached at distance 10, then improved to 3 through 2.
  // An implementation that settles 1 (or 3) from the stale entry gets this wrong.
  const graph: Graph = [
    [{ to: 1, weight: 10 }, { to: 2, weight: 1 }],
    [{ to: 3, weight: 1 }],
    [{ to: 1, weight: 2 }, { to: 4, weight: 9 }],
    [{ to: 4, weight: 1 }],
    [],
  ];
  expect(dijkstra_list(0, 4, graph)).toEqual([0, 2, 1, 3, 4]);
  expect(dijkstra_list(0, 3, graph)).toEqual([0, 2, 1, 3]);
});

test("improves the same vertex several times before settling it", () => {
  const graph: Graph = [
    [{ to: 4, weight: 100 }, { to: 1, weight: 1 }],
    [{ to: 4, weight: 50 }, { to: 2, weight: 1 }],
    [{ to: 4, weight: 20 }, { to: 3, weight: 1 }],
    [{ to: 4, weight: 1 }],
    [{ to: 5, weight: 1 }],
    [],
  ];
  expect(dijkstra_list(0, 5, graph)).toEqual([0, 1, 2, 3, 4, 5]);
});

test("uses total weight rather than hop count", () => {
  const graph: Graph = [[{ to: 3, weight: 10 }, { to: 1, weight: 1 }], [{ to: 2, weight: 1 }], [{ to: 3, weight: 1 }], []];
  expect(dijkstra_list(0, 3, graph)).toEqual([0, 1, 2, 3]);
});

test("follows a 100-vertex chain and takes the one cheap shortcut", () => {
  const graph: Graph = Array.from({ length: 100 }, (_, i) => (i < 99 ? [{ to: i + 1, weight: 1 }] : []));
  graph[0].push({ to: 99, weight: 150 }, { to: 50, weight: 60 });
  expect(dijkstra_list(0, 99, graph)).toEqual(Array.from({ length: 100 }, (_, i) => i));
  graph[10].push({ to: 90, weight: 5 });
  expect(dijkstra_list(0, 99, graph)).toEqual([...Array.from({ length: 11 }, (_, i) => i), ...Array.from({ length: 10 }, (_, i) => 90 + i)]);
  expect(dijkstra_list(99, 0, graph)).toEqual([]);
});

test("handles large and fractional weights", () => {
  const graph: Graph = [
    [{ to: 1, weight: 1e9 }, { to: 2, weight: 0.25 }],
    [{ to: 3, weight: 1 }],
    [{ to: 3, weight: 1e9 }, { to: 1, weight: 0.5 }],
    [],
  ];
  expect(dijkstra_list(0, 3, graph)).toEqual([0, 2, 1, 3]);
});

test("returns a minimum-weight path on seeded random directed graphs", () => {
  const random = seeded(29);
  for (let round = 0; round < 60; round++) {
    const size = 2 + Math.floor(random() * 12);
    const graph: Graph = Array.from({ length: size }, () => []);
    for (let from = 0; from < size; from++) {
      for (let to = 0; to < size; to++) {
        if (random() < 0.25) graph[from].push({ to, weight: Math.floor(random() * 10) });
      }
    }
    const source = Math.floor(random() * size);
    for (let sink = 0; sink < size; sink++) {
      const path = expectShortestPath(graph, source, sink, `round ${round}, ${source} -> ${sink}`);
      if (sink === source) expect(path).toEqual([source]);
    }
  }
});
