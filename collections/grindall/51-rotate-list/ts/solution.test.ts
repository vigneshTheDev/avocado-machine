import {expect, test} from 'vitest';
import {solve, type ListNode} from './solution';

function toList(values: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = {val: values[i], next: head};
  return head;
}

function fromList(head: ListNode | null): number[] {
  const values: number[] = [];
  for (let node = head; node; node = node.next) {
    values.push(node.val);
    if (values.length > 200000) throw new Error('Unexpected cycle');
  }
  return values;
}

function nodesOf(head: ListNode | null): ListNode[] {
  const nodes: ListNode[] = [];
  for (let node = head; node; node = node.next) {
    nodes.push(node);
    if (nodes.length > 200000) throw new Error('Unexpected cycle');
  }
  return nodes;
}

/** Rotates the list and checks that the result reuses the original nodes, each keeping its own value. */
function rotated(values: number[], k: number): number[] {
  const head = toList(values);
  const original = nodesOf(head);
  const valueOf = new Map(original.map(node => [node, node.val]));
  const result = nodesOf(solve(head, k));
  expect(result).toHaveLength(original.length);
  expect(new Set(result).size).toBe(result.length);
  expect(result.filter(node => !valueOf.has(node) || node.val !== valueOf.get(node))).toHaveLength(0);
  return result.map(node => node.val);
}

test("case 1", () => {
  const raw = [[1,2,3,4,5],2];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([4,5,1,2,3]);
});

test("case 2", () => {
  const raw = [[0,1,2],4];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([2,0,1]);
});

test('an empty list', () => {
  expect(solve(null, 0)).toBeNull();
  expect(solve(null, 5)).toBeNull();
});

test('a single node', () => { expect(rotated([1], 99)).toEqual([1]); });

test('k = 0 leaves the list unchanged', () => { expect(rotated([1, 2, 3], 0)).toEqual([1, 2, 3]); });

test('k equal to or a multiple of the length leaves the list unchanged', () => {
  expect(rotated([1, 2, 3], 3)).toEqual([1, 2, 3]);
  expect(rotated([1, 2, 3], 6)).toEqual([1, 2, 3]);
});

test('k greater than the length wraps around', () => {
  expect(rotated([1, 2], 3)).toEqual([2, 1]);
  expect(rotated([1, 2, 3, 4, 5], 7)).toEqual([4, 5, 1, 2, 3]);
  expect(rotated([1, 2, 3, 4, 5], 4)).toEqual([2, 3, 4, 5, 1]);
});

test('a huge k must not be simulated step by step', () => {
  expect(rotated([1, 2, 3, 4, 5], 2000000000)).toEqual([1, 2, 3, 4, 5]);
  expect(rotated([1, 2, 3, 4, 5], 2000000001)).toEqual([5, 1, 2, 3, 4]);
});

test('a long list', () => {
  const values = Array.from({length: 100000}, (_, i) => i);
  const result = rotated(values, 123456);
  expect(result[0]).toBe(100000 - 23456);
  expect(result[23456]).toBe(0);
  expect(result[result.length - 1]).toBe(100000 - 23457);
});
