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

function add(a: number[], b: number[]): number[] { return fromList(solve(toList(a), toList(b))); }

test("case 1", () => {
  const raw = [[2,4,3],[5,6,4]];
  const args = raw.map((value, index) => [0,1].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([7,0,8]);
});

test("case 2", () => {
  const raw = [[9,9,9],[1]];
  const args = raw.map((value, index) => [0,1].includes(index) ? toList(value as number[]) : value);
  const result = solve(...args as Parameters<typeof solve>);
  expect(fromList(result)).toEqual([0,0,0,1]);
});

test('zero plus zero', () => { expect(add([0], [0])).toEqual([0]); });

test('lists of different lengths in either order', () => {
  expect(add([1], [9, 9, 9, 9])).toEqual([0, 0, 0, 0, 1]);
  expect(add([5, 6, 4, 2], [3])).toEqual([8, 6, 4, 2]);
});

test('a final carry adds a node', () => {
  expect(add([5], [5])).toEqual([0, 1]);
  expect(add([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
});

test('the inputs are not required to be numbers that fit in a double', () => {
  const a = new Array(1000).fill(9);
  expect(add(a, [1])).toEqual([...new Array(1000).fill(0), 1]);
  const b = Array.from({length: 100}, (_, i) => i % 10);
  const c = Array.from({length: 100}, (_, i) => 9 - (i % 10));
  expect(add(b, c)).toEqual(new Array(100).fill(9));
});
