import {expect, test} from 'vitest';
import {isBalanced, type TreeNode} from './solution';
const node = (val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode => ({val, left, right});
test('balanced and unbalanced trees', () => {
  expect(isBalanced(null)).toBe(true);
  expect(isBalanced(node(3, node(9), node(20, node(15), node(7))))).toBe(true);
  expect(isBalanced(node(1, node(2, node(3, node(4)))))).toBe(false);
});
test('a single node is balanced', () => {
  expect(isBalanced(node(1))).toBe(true);
});
test('allows a height difference of exactly one at every node', () => {
  expect(isBalanced(node(1, node(2, node(4), node(5, node(6))), node(3, node(7))))).toBe(true);
  expect(isBalanced(node(1, node(2)))).toBe(true);
});
test('detects imbalance below a root whose subtrees have equal height', () => {
  const root = node(1, node(2, node(3, node(4)), null), node(2, null, node(3, null, node(4))));
  expect(isBalanced(root)).toBe(false);
});
test('detects imbalance at the root when both subtrees are balanced', () => {
  const left = node(2, node(3, node(5), node(6)), node(4, node(7), node(8)));
  expect(isBalanced(node(1, left, null))).toBe(false);
});
