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

test("case 1", () => {
  const raw = [[1,2,2,1]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(result).toEqual(true);
});

test("case 2", () => {
  const raw = [[1,2]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(result).toEqual(false);
});

test("case 3", () => {
  const raw = [[]];
  const args = raw.map((value, index) => [0].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(result).toEqual(true);
});

test('a single node', () => { expect(solve(toList([7]))).toBe(true); });

test('odd length palindromes and near misses', () => {
  expect(solve(toList([1, 2, 3, 2, 1]))).toBe(true);
  expect(solve(toList([1, 2, 3, 1, 1]))).toBe(false);
  expect(solve(toList([1, 2, 1, 2]))).toBe(false);
});

test('a mismatch only in the middle', () => {
  expect(solve(toList([1, 2, 3, 4, 2, 1]))).toBe(false);
  expect(solve(toList([0, 0]))).toBe(true);
});

test('long lists', () => {
  const half = Array.from({length: 50000}, (_, i) => i % 10);
  expect(solve(toList([...half, ...[...half].reverse()]))).toBe(true);
  const broken = [...half, ...[...half].reverse()];
  broken[60000] = 99;
  expect(solve(toList(broken))).toBe(false);
});
