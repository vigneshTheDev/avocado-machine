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

test("case 1", () => {
  const raw = [[3,9,20,null,null,15,7]];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual([[3],[20,9],[15,7]]);
});

test("case 2", () => {
  const raw = [[1]];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual([[1]]);
});

test('an empty tree', () => { expect(solve(null)).toEqual([]); });

test('four full levels alternate more than once', () => {
  expect(solve(toTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))).toEqual([
    [1], [3, 2], [4, 5, 6, 7], [15, 14, 13, 12, 11, 10, 9, 8],
  ]);
});

test('five levels with gaps', () => {
  const tree = toTree([1, 2, 3, 4, null, null, 5, 6, null, null, null, null, null, null, 7]);
  expect(solve(tree)).toEqual([[1], [3, 2], [4, 5], [7, 6]]);
  tree!.left!.left!.left!.right = {val: 8, left: null, right: null};
  expect(solve(tree)).toEqual([[1], [3, 2], [4, 5], [7, 6], [8]]);
});

test('a lopsided tree', () => {
  expect(solve(toTree([1, 2, null, 3, 4, null, null, 5, 6, 7, 8]))).toEqual([[1], [2], [3, 4], [8, 7, 6, 5]]);
});

test('a deep tree', () => {
  const root: TreeNode = {val: 0, left: null, right: null};
  let node = root;
  for (let i = 1; i < 2000; i++) {
    node.right = {val: -i, left: null, right: null};
    node = node.left = {val: i, left: null, right: null};
  }
  const result = solve(root);
  expect(result).toHaveLength(2000);
  expect(result[1]).toEqual([-1, 1]);
  expect(result[2]).toEqual([2, -2]);
  expect(result[1999]).toEqual([-1999, 1999]);
});
