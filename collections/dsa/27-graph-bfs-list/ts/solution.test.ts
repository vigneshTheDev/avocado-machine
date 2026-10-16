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
