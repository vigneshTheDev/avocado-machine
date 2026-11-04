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
  const raw = [[10,5,-3,3,2,null,11,3,-2,null,1],8];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual(3);
});

test("case 2", () => {
  const raw = [[1,-2,-3],-1];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual(1);
});

test('an empty tree', () => { expect(solve(null, 0)).toBe(0); });

test('a target equal to a single node', () => {
  expect(solve(toTree([5]), 5)).toBe(1);
  expect(solve(toTree([1, 5, 5]), 5)).toBe(2);
});

test('the Path Sum II example tree counts paths that start below the root', () => {
  expect(solve(toTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, null, 5, 1]), 22)).toBe(3);
});

test('repeated zeros give many paths with the same sum', () => {
  expect(solve(toTree([0, 0, 0]), 0)).toBe(5);
  expect(solve(toTree([1, 0, 0, 0]), 1)).toBe(4);
});

test('paths must go downward, not through a parent', () => {
  expect(solve(toTree([1, 2, 3]), 5)).toBe(0);
  expect(solve(toTree([1, 2, 3]), 4)).toBe(1);
});

test('negative values cancel out along a path', () => {
  expect(solve(toTree([1, -1, null, 1, null, null, null, -1]), 0)).toBe(4);
});

test('intermediate sums beyond 32 bits', () => {
  const values = [1000000000, 1000000000, -1000000000, -1000000000, 1000];
  let root: TreeNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) root = {val: values[i], left: root, right: null};
  expect(solve(root, 1000)).toBe(2);
});

test('a long chain of zeros', () => {
  const root: TreeNode = {val: 0, left: null, right: null};
  let node = root;
  for (let i = 1; i < 2000; i++) node = node.left = {val: 0, left: null, right: null};
  expect(solve(root, 0)).toBe(2000 * 2001 / 2);
});
