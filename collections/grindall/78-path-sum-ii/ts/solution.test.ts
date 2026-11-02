import {expect, test} from 'vitest';
import {solve, type TreeNode} from './solution';

function toTree(values: Array<number | null>): TreeNode | null {
  const nodes = values.map(value => value === null ? null : {val: value, left: null, right: null} as TreeNode);
  nodes.forEach((node, i) => {
    if (node) {
      node.left = nodes[2 * i + 1] ?? null;
      node.right = nodes[2 * i + 2] ?? null;
    }
  });
  return nodes[0] ?? null;
}

function paths(values: Array<number | null>, target: number): string[] {
  return solve(toTree(values), target).map(path => JSON.stringify(path)).sort();
}

function sortedPaths(expected: number[][]): string[] { return expected.map(path => JSON.stringify(path)).sort(); }

test("case 1", () => {
  const raw = [[5,4,8,11,null,13,4,7,2,null,null,null,null,5,1],22];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  const actual = solve(...args as Parameters<typeof solve>);
  expect(actual.map(path => JSON.stringify(path)).sort()).toEqual([[5,4,11,2],[5,8,4,5]].map(path => JSON.stringify(path)).sort());
});

test("case 2", () => {
  const raw = [[1,2,3],5];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  const actual = solve(...args as Parameters<typeof solve>);
  expect(actual.map(path => JSON.stringify(path)).sort()).toEqual([].map(path => JSON.stringify(path)).sort());
});

test('an empty tree has no paths', () => { expect(solve(null, 0)).toEqual([]); });

test('a single leaf', () => {
  expect(paths([5], 5)).toEqual(sortedPaths([[5]]));
  expect(paths([5], 4)).toEqual([]);
});

test('a path that reaches the target before a leaf does not count', () => {
  expect(paths([1, 2], 1)).toEqual([]);
  expect(paths([5, 3, null, 2], 8)).toEqual([]);
  expect(paths([5, 3, null, 2], 10)).toEqual(sortedPaths([[5, 3, 2]]));
});

test('negative values and a zero target', () => {
  expect(paths([-2, null, -3], -5)).toEqual(sortedPaths([[-2, -3]]));
  expect(paths([1, -1, 2, null, null, -3, 0], 0)).toEqual(sortedPaths([[1, -1], [1, 2, -3]]));
  expect(paths([0, 0, 0, 0, 0, 0, 0], 0)).toEqual(sortedPaths([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]));
});

test('returned paths are independent copies', () => {
  const result = solve(toTree([1, 2, 2]), 3);
  expect(result).toHaveLength(2);
  expect(result[0]).not.toBe(result[1]);
  expect(result).toEqual([[1, 2], [1, 2]]);
});

test('a deep tree', () => {
  const root: TreeNode = {val: 1, left: null, right: null};
  let node = root;
  for (let i = 0; i < 999; i++) node = node.left = {val: 1, left: null, right: null};
  node.right = {val: 1, left: null, right: null};
  expect(solve(root, 1001)).toEqual([new Array(1001).fill(1)]);
  expect(solve(root, 1000)).toEqual([]);
});
