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

/** Swaps pairs and checks that the result reuses the original nodes, each keeping its own value. */
function swapped(values: number[]): number[] {
  const head = toList(values);
  const original = nodesOf(head);
  const valueOf = new Map(original.map(node => [node, node.val]));
  const result = nodesOf(solve(head));
  expect(result).toHaveLength(original.length);
  expect(new Set(result).size).toBe(result.length);
  expect(result.filter(node => !valueOf.has(node) || node.val !== valueOf.get(node))).toHaveLength(0);
  return result.map(node => node.val);
}

test("case 1", () => {
  const raw = [[1,2,3,4]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([2,1,4,3]);
});

test("case 2", () => {
  const raw = [[1,2,3]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([2,1,3]);
});

test("case 3", () => {
  const raw = [[]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([]);
});

test('a single node is returned unchanged', () => {
  const head = toList([5]);
  expect(solve(head)).toBe(head);
  expect(fromList(head)).toEqual([5]);
});

test('nodes are swapped, not their values', () => {
  expect(swapped([1, 2])).toEqual([2, 1]);
  expect(swapped([1, 2, 3, 4, 5, 6])).toEqual([2, 1, 4, 3, 6, 5]);
  expect(swapped([1, 2, 3, 4, 5])).toEqual([2, 1, 4, 3, 5]);
});

test('duplicate values', () => { expect(swapped([7, 7, 8, 8, 7])).toEqual([7, 7, 8, 8, 7]); });

test('a long list', () => {
  const values = Array.from({length: 100001}, (_, i) => i);
  const result = swapped(values);
  expect(result.slice(0, 4)).toEqual([1, 0, 3, 2]);
  expect(result[result.length - 1]).toBe(100000);
});
