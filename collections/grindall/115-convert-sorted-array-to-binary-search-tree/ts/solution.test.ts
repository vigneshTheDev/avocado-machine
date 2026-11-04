import {expect, test} from 'vitest';
import {solve, type TreeNode} from './solution';

function inorder(node: TreeNode | null): number[] { return node ? [...inorder(node.left), node.val, ...inorder(node.right)] : []; }
function height(node: TreeNode | null): number { return node ? 1 + Math.max(height(node.left), height(node.right)) : 0; }
function balanced(node: TreeNode | null): boolean {
  return !node || (Math.abs(height(node.left) - height(node.right)) <= 1 && balanced(node.left) && balanced(node.right));
}

function expectBalancedBst(nums: number[]) {
  const root = solve(nums);
  expect(inorder(root)).toEqual(nums);
  expect(balanced(root)).toBe(true);
  return root;
}

test('preserves sorted order and balance', () => {
  const nums = [-10, -3, 0, 5, 9];
  const root = solve(nums);
  expect(inorder(root)).toEqual(nums);
  expect(balanced(root)).toBe(true);
});

test('empty input has no root', () => { expect(solve([])).toBeNull(); });

test('a single element becomes a leaf root', () => {
  expect(solve([7])).toEqual({val: 7, left: null, right: null});
});

test('two elements', () => {
  const root = expectBalancedBst([1, 3]);
  expect(height(root)).toBe(2);
});

test('even length arrays', () => {
  expectBalancedBst([1, 2, 3, 4]);
  expectBalancedBst([-5, -1, 0, 2, 8, 13]);
});

test('a large array stays height-balanced', () => {
  expectBalancedBst(Array.from({length: 10000}, (_, i) => i * 2 - 5000));
});
