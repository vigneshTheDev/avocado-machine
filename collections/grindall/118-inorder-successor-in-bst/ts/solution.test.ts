import {expect, test} from 'vitest';
import {solve, type TreeNode} from './solution';

function insertAll(values: number[]): {root: TreeNode | null; nodes: TreeNode[]} {
  let root: TreeNode | null = null;
  const nodes: TreeNode[] = [];
  for (const val of values) {
    const node: TreeNode = {val, left: null, right: null};
    nodes.push(node);
    if (!root) { root = node; continue; }
    let current = root;
    for (;;) {
      if (val < current.val) { if (!current.left) { current.left = node; break; } current = current.left; }
      else { if (!current.right) { current.right = node; break; } current = current.right; }
    }
  }
  return {root, nodes};
}

function expectEverySuccessor(values: number[]) {
  const {root, nodes} = insertAll(values);
  const sorted = [...nodes].sort((a, b) => a.val - b.val);
  sorted.forEach((node, i) => expect(solve(root, node)).toBe(sorted[i + 1] ?? null));
}

test('finds an ancestor successor', () => {
  const left: TreeNode = {val: 1, left: null, right: null};
  const right: TreeNode = {val: 3, left: null, right: null};
  const root: TreeNode = {val: 2, left, right};
  expect(solve(root, left)).toBe(root);
  expect(solve(root, right)).toBeNull();
});

test('finds the leftmost node of a right subtree', () => {
  const next: TreeNode = {val: 4, left: null, right: null};
  const p: TreeNode = {val: 3, left: null, right: {val: 5, left: next, right: null}};
  expect(solve(p, p)).toBe(next);
});

test('a single node has no successor', () => {
  const root: TreeNode = {val: 1, left: null, right: null};
  expect(solve(root, root)).toBeNull();
});

test('the successor can be a distant ancestor', () => {
  const {root, nodes} = insertAll([20, 8, 22, 4, 12, 10, 14]);
  const fourteen = nodes.find(node => node.val === 14)!;
  expect(solve(root, fourteen)).toBe(root);
  expect(solve(root, nodes.find(node => node.val === 22)!)).toBeNull();
});

test('every node of the LeetCode example', () => { expectEverySuccessor([5, 3, 6, 2, 4, 1]); });

test('every node of a larger tree, returning nodes rather than copies', () => {
  const values: number[] = [];
  let seed = 5;
  for (let i = 0; i < 2000; i++) { seed = (seed * 48271) % 2147483647; values.push(seed % 1000000); }
  expectEverySuccessor([...new Set(values)]);
});

test('a skewed tree', () => { expectEverySuccessor(Array.from({length: 500}, (_, i) => 500 - i)); });
