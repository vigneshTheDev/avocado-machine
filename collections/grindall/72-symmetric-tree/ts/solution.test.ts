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
  const raw = [[1,2,2,3,4,4,3]];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual(true);
});

test("case 2", () => {
  const raw = [[1,2,2,null,3,null,3]];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual(false);
});

test('an empty tree and a single node are symmetric', () => {
  expect(solve(null)).toBe(true);
  expect(solve(toTree([1]))).toBe(true);
});

test('symmetric values with asymmetric structure', () => {
  expect(solve(toTree([1, 2, 2, 3, null, 3, null]))).toBe(false);
  expect(solve(toTree([1, 2, 2, null, 3, 3, null]))).toBe(true);
  expect(solve(toTree([1, 2, null]))).toBe(false);
});

test('mirrored structure with different values', () => {
  expect(solve(toTree([1, 2, 3]))).toBe(false);
  expect(solve(toTree([1, 2, 2, 3, 4, 3, 4]))).toBe(false);
});

test('a deeper symmetric tree', () => {
  expect(solve(toTree([1, 2, 2, 3, 4, 4, 3, 5, 6, 7, 8, 8, 7, 6, 5]))).toBe(true);
  expect(solve(toTree([1, 2, 2, 3, 4, 4, 3, 5, 6, 7, 8, 8, 7, 6, 9]))).toBe(false);
});

test('a long mirrored pair of chains', () => {
  const root: TreeNode = {val: 0, left: null, right: null};
  let left = root, right = root;
  for (let i = 1; i <= 2000; i++) {
    left = left.left = {val: i, left: null, right: null};
    right = right.right = {val: i, left: null, right: null};
  }
  expect(solve(root)).toBe(true);
  right.val = -1;
  expect(solve(root)).toBe(false);
});
