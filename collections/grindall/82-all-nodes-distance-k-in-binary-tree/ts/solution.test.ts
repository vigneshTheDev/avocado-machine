import {expect, test} from 'vitest';
import {solve, type TreeNode} from './solution';

function tree(values: Array<number | null>): TreeNode[] {
  const nodes = values.map(value => value === null ? null : {val: value, left: null, right: null} as TreeNode);
  nodes.forEach((node, i) => { if (node) { node.left = nodes[2 * i + 1] ?? null; node.right = nodes[2 * i + 2] ?? null; } });
  return nodes.filter((node): node is TreeNode => node !== null);
}

function distanceK(values: Array<number | null>, targetValue: number, k: number): number[] {
  const nodes = tree(values);
  return solve(nodes[0], nodes.find(node => node.val === targetValue)!, k).sort((a, b) => a - b);
}

const example = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];

test('includes descendants and nodes through a parent', () => {
  const nodes = tree(example);
  expect(solve(nodes[0], nodes.find(node => node.val === 5)!, 2).sort((a, b) => a - b)).toEqual([1, 4, 7]);
});

test('distance zero returns the target', () => {
  const nodes = tree([1]);
  expect(solve(nodes[0], nodes[0], 0)).toEqual([1]);
});

test('k larger than the tree height returns nothing', () => {
  expect(distanceK(example, 3, 4)).toEqual([]);
  expect(distanceK(example, 7, 10)).toEqual([]);
  expect(distanceK([1], 1, 3)).toEqual([]);
});

test('a leaf target reaches other nodes only through its parent', () => {
  expect(distanceK(example, 7, 1)).toEqual([2]);
  expect(distanceK(example, 7, 2)).toEqual([4, 5]);
  expect(distanceK(example, 7, 3)).toEqual([3, 6]);
  expect(distanceK(example, 7, 4)).toEqual([1]);
  expect(distanceK(example, 7, 5)).toEqual([0, 8]);
});

test('root target looks only downward', () => {
  expect(distanceK(example, 3, 1)).toEqual([1, 5]);
  expect(distanceK(example, 3, 3)).toEqual([4, 7]);
});

test('distance zero on an inner node returns only that node', () => {
  expect(distanceK(example, 2, 0)).toEqual([2]);
});

test('a long skewed tree', () => {
  const nodes: TreeNode[] = Array.from({length: 3000}, (_, i) => ({val: i, left: null, right: null}));
  for (let i = 0; i + 1 < nodes.length; i++) nodes[i].right = nodes[i + 1];
  expect(solve(nodes[0], nodes[1500], 1000).sort((a, b) => a - b)).toEqual([500, 2500]);
  expect(solve(nodes[0], nodes[2999], 2999)).toEqual([0]);
});
