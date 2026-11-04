import {expect, test} from 'vitest';
import {lowestCommonAncestor, type TreeNode} from './solution';
const node = (val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode => ({val, left, right});
test('finds shared ancestor by node identity', () => {
  const p = node(5, node(6), node(2));
  const q = node(1, node(0), node(8));
  const root = node(3, p, q);
  expect(lowestCommonAncestor(root, p, q)).toBe(root);
  expect(lowestCommonAncestor(root, p.left!, p.right!)).toBe(p);
  expect(lowestCommonAncestor(root, p, p.left!)).toBe(p);
});
test('a node is its own ancestor when both targets are the same node', () => {
  const leaf = node(4);
  const root = node(1, node(2, leaf), node(3));
  expect(lowestCommonAncestor(root, leaf, leaf)).toBe(leaf);
  expect(lowestCommonAncestor(root, root, leaf)).toBe(root);
});
test('uses identity when every node has the same value', () => {
  const a = node(7, node(7), node(7));
  const b = node(7, node(7), node(7));
  const root = node(7, a, b);
  expect(lowestCommonAncestor(root, a.left!, b.right!)).toBe(root);
  expect(lowestCommonAncestor(root, a.left!, a.right!)).toBe(a);
  expect(lowestCommonAncestor(root, b.right!, b)).toBe(b);
});
test('finds the ancestor of targets deep in different subtrees', () => {
  const deepLeft = node(10);
  const deepRight = node(20);
  const split = node(5, node(6, node(7, node(8, deepLeft))), node(9, null, node(11, node(12, null, deepRight))));
  const root = node(1, node(2, node(3), split), node(4));
  expect(lowestCommonAncestor(root, deepLeft, deepRight)).toBe(split);
  expect(lowestCommonAncestor(root, deepRight, root.right!)).toBe(root);
});
