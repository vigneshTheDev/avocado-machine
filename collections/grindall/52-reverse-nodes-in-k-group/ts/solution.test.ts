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

/** Reverses k-groups and checks that the result reuses the original nodes, each keeping its own value. */
function reversed(values: number[], k: number): number[] {
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
  expect(fromList(result)).toEqual([2,1,4,3,5]);
});

test("case 2", () => {
  const raw = [[1,2,3,4,5],3];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([3,2,1,4,5]);
});

test('k = 1 leaves the list unchanged', () => { expect(reversed([1, 2, 3], 1)).toEqual([1, 2, 3]); });

test('k equal to the length reverses the whole list', () => { expect(reversed([1, 2, 3, 4], 4)).toEqual([4, 3, 2, 1]); });

test('a single node and an empty list', () => {
  expect(reversed([8], 1)).toEqual([8]);
  expect(solve(null, 2)).toBeNull();
});

test('k greater than the length leaves the list unchanged', () => { expect(reversed([1, 2], 3)).toEqual([1, 2]); });

test('a length that is a multiple of k', () => { expect(reversed([1, 2, 3, 4, 5, 6], 3)).toEqual([3, 2, 1, 6, 5, 4]); });

test('a length that is not a multiple of k keeps the tail in order', () => {
  expect(reversed([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([3, 2, 1, 6, 5, 4, 7, 8]);
  expect(reversed([1, 2, 3], 2)).toEqual([2, 1, 3]);
});

test('nodes are moved, not their values', () => { expect(reversed([5, 5, 6, 6], 2)).toEqual([5, 5, 6, 6]); });

test('a long list', () => {
  const values = Array.from({length: 100003}, (_, i) => i);
  const result = reversed(values, 1000);
  expect(result.slice(0, 3)).toEqual([999, 998, 997]);
  expect(result[1000]).toBe(1999);
  expect(result.slice(-3)).toEqual([100000, 100001, 100002]);
});
