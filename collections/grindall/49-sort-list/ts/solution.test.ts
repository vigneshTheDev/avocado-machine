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

function sorted(values: number[]): number[] { return fromList(solve(toList(values))); }

test("case 1", () => {
  const raw = [[4,2,1,3]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([1,2,3,4]);
});

test("case 2", () => {
  const raw = [[-1,5,3,4,0]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([-1,0,3,4,5]);
});

test('an empty list', () => { expect(solve(null)).toBeNull(); });

test('a single node', () => { expect(sorted([42])).toEqual([42]); });

test('already sorted and reversed lists', () => {
  expect(sorted([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(sorted([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
});

test('duplicates and negative values', () => {
  expect(sorted([3, -1, 3, 0, -1, 2])).toEqual([-1, -1, 0, 2, 3, 3]);
  expect(sorted([7, 7, 7])).toEqual([7, 7, 7]);
});

test('values are compared numerically', () => { expect(sorted([10, 9, 100, -20, -3])).toEqual([-20, -3, 9, 10, 100]); });

test('a long list needs O(n log n) sorting', () => {
  const n = 50000;
  const values: number[] = [];
  let seed = 13;
  for (let i = 0; i < n; i++) { seed = (seed * 48271) % 2147483647; values.push((seed % 200001) - 100000); }
  expect(sorted(values)).toEqual([...values].sort((a, b) => a - b));
  expect(sorted(Array.from({length: n}, (_, i) => n - i))).toEqual(Array.from({length: n}, (_, i) => i + 1));
});
