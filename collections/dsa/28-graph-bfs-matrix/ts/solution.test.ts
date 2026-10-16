import { test, expect } from "vitest";
import bfs from "./solution";
import { matrix2 } from "./graph";

test("bfs - graph matrix", function () {
    expect(bfs(matrix2, 0, 6)).toEqual([
        0,
        1,
        4,
        5,
        6,
    ]);

    expect(bfs(matrix2, 6, 0)).toEqual(null);
});

test("cycles, neighbor order, identity path, and unreachable vertices", () => {
  const graph = [[0, 2, 1, 0], [0, 1, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0]];
  const before = structuredClone(graph);
  expect(bfs(graph, 0, 3)).toEqual([0, 1, 3]);
  expect(bfs(graph, 3, 0)).toBeNull();
  expect(bfs(graph, 1, 1)).toEqual([1]);
  expect(graph).toEqual(before);
});

test("uses fewest edges rather than weight or DFS order", () => {
  expect(bfs([[0, 1, 0, 1], [0, 0, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0]], 0, 3)).toEqual([0, 3]);
});
