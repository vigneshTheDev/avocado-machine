import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[0,1]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [[0,1,0]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 3", () => {
  const args = [[0,0,1,1,0,1]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(6);
});

test('a single element has no balanced subarray', () => {
  expect(solve([0])).toBe(0);
  expect(solve([1])).toBe(0);
});

test('all zeros or all ones', () => {
  expect(solve([0, 0, 0, 0])).toBe(0);
  expect(solve([1, 1, 1])).toBe(0);
});

test('the answer starts at index 0', () => { expect(solve([1, 0, 1, 0, 1, 1, 1])).toBe(4); });

test('the answer is in the middle', () => {
  expect(solve([1, 1, 1, 0, 1, 0, 0, 1, 1, 1])).toBe(6);
  expect(solve([0, 0, 0, 1, 1, 0, 0, 0])).toBe(4);
});

test('a large input needs prefix sums', () => {
  const n = 100000;
  const nums = Array.from({length: n}, (_, i) => (i < 30000 ? 1 : i % 2));
  expect(solve(nums)).toBe(70000);
  const ones = new Array(n).fill(1);
  ones[50000] = 0;
  expect(solve(ones)).toBe(2);
});
