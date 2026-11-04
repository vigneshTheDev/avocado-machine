import { expect, test } from "vitest";
import { cloneGraph } from "./solution";
import { graphFrom, graphToAdjacency } from "../../support";

const cases = [
  {
    args: [[]],
    expected: [],
    name: "baseline: [[]]",
  },
  {
    name: "cycle is cloned with adjacency preserved",
    args: [[[2], [1]]],
    expected: [[2], [1]],
  },
  {
    name: "single isolated node",
    args: [[[]]],
    expected: [[]],
  },
  {
    name: "square with a diagonal",
    args: [[[2, 3, 4], [1, 3], [1, 2, 4], [1, 3]]],
    expected: [[2, 3, 4], [1, 3], [1, 2, 4], [1, 3]],
  },
  {
    name: "path of five nodes",
    args: [[[2], [1, 3], [2, 4], [3, 5], [4]]],
    expected: [[2], [1, 3], [2, 4], [3, 5], [4]],
  },
];

test.each(cases)("$name", ({ args, expected }) => {
  const original = graphFrom(args[0]);
  const copy = cloneGraph(original);

  expect(graphToAdjacency(copy)).toEqual(expected);

  if (original) expect(copy).not.toBe(original);

  const oldNodes = new Set<any>();
  const newNodes = new Set<any>();
  const visit = (node: any, seen: Set<any>) => {
    if (!node || seen.has(node)) return;
    seen.add(node);
    node.neighbors.forEach((next: any) => visit(next, seen));
  };
  visit(original, oldNodes);
  visit(copy, newNodes);
  expect([...newNodes].every((node) => !oldNodes.has(node))).toBe(true);
});

test("mutating the clone leaves the original graph unchanged", () => {
  const adjacency = [[2, 3, 4], [1, 3], [1, 2, 4], [1, 3]];
  const original = graphFrom(adjacency)!;
  const copy = cloneGraph(original)!;
  copy.val = 99;
  copy.neighbors[0].neighbors.length = 0;
  copy.neighbors.pop();
  expect(graphToAdjacency(original)).toEqual(adjacency);
});
