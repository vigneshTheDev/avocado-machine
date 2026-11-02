import {expect, test} from 'vitest';
import {rightSideView, type TreeNode} from './solution';
const node = (val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode => ({val, left, right});
test('views rightmost node at each level', () => {
  expect(rightSideView(null)).toEqual([]);
  expect(rightSideView(node(1, node(2, null, node(5)), node(3, null, node(4))))).toEqual([1, 3, 4]);
  expect(rightSideView(node(1, node(2, node(3))))).toEqual([1, 2, 3]);
});
test('a single node views itself', () => {
  expect(rightSideView(node(9))).toEqual([9]);
});
test('takes deep levels from the left subtree when it is deeper', () => {
  const root = node(1, node(2, node(4, node(7), node(8, node(9)))), node(3, null, node(5)));
  expect(rightSideView(root)).toEqual([1, 3, 5, 8, 9]);
});
test('picks the rightmost node of a full level', () => {
  const root = node(1, node(2, node(4), node(5)), node(3, node(6), node(7)));
  expect(rightSideView(root)).toEqual([1, 3, 7]);
});
test('a right-leaning chain shows every node', () => {
  expect(rightSideView(node(1, null, node(2, null, node(3))))).toEqual([1, 2, 3]);
});
