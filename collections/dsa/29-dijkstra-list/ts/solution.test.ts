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
