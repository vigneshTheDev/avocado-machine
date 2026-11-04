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

function leaf(val = 0): TreeNode { return {val, left: null, right: null}; }

/** Builds a chain of `depth` nodes following `step` ('left' or 'right'), returning the root and the last node. */
function chain(depth: number, step: (i: number) => 'left' | 'right'): {root: TreeNode; last: TreeNode} {
  const root = leaf();
  let last = root;
  for (let i = 1; i < depth; i++) last = last[step(i)] = leaf(i);
  return {root, last};
}

test("case 1", () => {
  const raw = [[1,3,2,5,3,null,9]];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test("case 2", () => {
  const raw = [[1,3,null,5,3]];
  const args = raw.map((value, index) => [0].includes(index) ? toTree(value as Array<number | null>) : value);
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test('a single node', () => { expect(solve(leaf(1))).toBe(1); });

test('gaps between the outermost nodes count, even on a lower level', () => {
  // LeetCode example 3: [1,3,2,5,null,null,9,6,null,7]
  const root: TreeNode = {val: 1, left: {val: 3, left: {val: 5, left: leaf(6), right: null}, right: null}, right: {val: 2, left: null, right: {val: 9, left: leaf(7), right: null}}};
  expect(solve(root)).toBe(7);
});

test('a full level', () => { expect(solve(toTree([1, 2, 3, 4, 5, 6, 7]))).toBe(4); });

test('a skewed tree has width one', () => {
  expect(solve(chain(3000, () => 'left').root)).toBe(1);
  expect(solve(chain(3000, i => (i % 2 ? 'left' : 'right')).root)).toBe(1);
});

test('very deep trees need per-level index normalisation', () => {
  // Two children at the bottom of a 100-level zigzag chain: heap indices there exceed 2^53.
  const zigzag = chain(100, i => (i % 2 ? 'right' : 'left'));
  zigzag.last.left = leaf();
  zigzag.last.right = leaf();
  expect(solve(zigzag.root)).toBe(2);

  // Two long chains hanging from the root: the bottom level spans the whole tree.
  const root = leaf();
  const left = chain(80, () => 'right');
  const right = chain(80, () => 'left');
  root.left = left.root;
  root.right = right.root;
  expect(solve(root)).toBe(2);

  const rightmost = chain(100, () => 'right');
  rightmost.last.left = leaf();
  rightmost.last.right = leaf();
  expect(solve(rightmost.root)).toBe(2);
});
