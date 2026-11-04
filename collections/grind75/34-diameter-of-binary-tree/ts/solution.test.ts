import {expect, test} from 'vitest';
import {diameterOfBinaryTree, type TreeNode} from './solution';
const node = (val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode => ({val, left, right});
test('counts edges, including a path below the root', () => {
  expect(diameterOfBinaryTree(null)).toBe(0);
  expect(diameterOfBinaryTree(node(1))).toBe(0);
  expect(diameterOfBinaryTree(node(1, node(2, node(4), node(5)), node(3)))).toBe(3);
  expect(diameterOfBinaryTree(node(0, node(1, node(2, node(3), node(4)), node(5, node(6)))))).toBe(4);
});
test('two nodes have diameter 1', () => {
  expect(diameterOfBinaryTree(node(1, null, node(2)))).toBe(1);
});
test('finds the longest path entirely inside the left subtree', () => {
  const left = node(2, node(3, node(4, node(5))), node(6, null, node(7, null, node(8))));
  // Through node 2: 3 edges down each side. Through the root: 4 + 1.
  expect(diameterOfBinaryTree(node(1, left, node(9)))).toBe(6);
});
test('measures a skewed tree as a single chain', () => {
  let chain: TreeNode | null = null;
  for (let i = 0; i < 1000; i++) chain = node(i, chain);
  expect(diameterOfBinaryTree(chain)).toBe(999);
  expect(diameterOfBinaryTree(node(1, null, node(2, null, node(3, null, node(4)))))).toBe(3);
});
