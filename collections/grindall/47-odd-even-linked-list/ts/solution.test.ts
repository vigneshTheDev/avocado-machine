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

/** Regroups the list and checks that the result reuses the original nodes, each keeping its own value. */
function regrouped(values: number[]): number[] {
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
  const raw = [[1,2,3,4,5]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([1,3,5,2,4]);
});

test("case 2", () => {
  const raw = [[2,1,3,5,6,4,7]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([2,3,6,7,1,5,4]);
});

test('an empty list', () => { expect(solve(null)).toBeNull(); });

test('one and two nodes are unchanged', () => {
  expect(regrouped([9])).toEqual([9]);
  expect(regrouped([1, 2])).toEqual([1, 2]);
});

test('even length lists', () => {
  expect(regrouped([1, 2, 3, 4])).toEqual([1, 3, 2, 4]);
  expect(regrouped([10, 20, 30, 40, 50, 60])).toEqual([10, 30, 50, 20, 40, 60]);
});

test('groups by position, not by value parity', () => {
  expect(regrouped([2, 4, 6, 1, 3, 5])).toEqual([2, 6, 3, 4, 1, 5]);
});

test('a long list', () => {
  const values = Array.from({length: 100001}, (_, i) => i);
  const result = regrouped(values);
  expect(result.slice(0, 3)).toEqual([0, 2, 4]);
  expect(result[50000]).toBe(100000);
  expect(result[50001]).toBe(1);
  expect(result[result.length - 1]).toBe(99999);
});
