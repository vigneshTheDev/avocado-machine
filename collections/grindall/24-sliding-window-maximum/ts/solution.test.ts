import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,3,-1,-3,5,3,6,7],3];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([3,3,5,5,6,7]);
});

test("case 2", () => {
  const args = [[1],1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([1]);
});

test('k = 1 returns every element', () => { expect(solve([4, -2, 7, 7, 0], 1)).toEqual([4, -2, 7, 7, 0]); });

test('k = n returns the overall maximum', () => { expect(solve([2, 9, -4, 9, 3], 5)).toEqual([9]); });

test('a decreasing array', () => { expect(solve([9, 8, 7, 6, 5, 4], 3)).toEqual([9, 8, 7, 6]); });

test('an increasing array', () => { expect(solve([1, 2, 3, 4, 5, 6], 4)).toEqual([4, 5, 6]); });

test('duplicates leaving the window', () => {
  expect(solve([5, 5, 1, 1, 1, 5], 2)).toEqual([5, 5, 1, 1, 5]);
  expect(solve([-7, -8, 7, 5, 7, 1, 6, 0], 4)).toEqual([7, 7, 7, 7, 7]);
});

test('a large input with a large window needs a deque', () => {
  const n = 100000;
  const k = 50000;
  const decreasing = Array.from({length: n}, (_, i) => n - i);
  const result = solve(decreasing, k);
  expect(result).toHaveLength(n - k + 1);
  expect(result[0]).toBe(n);
  expect(result[result.length - 1]).toBe(k);
  const zigzag = Array.from({length: n}, (_, i) => (i % 2 === 0 ? i : -i));
  const zigzagResult = solve(zigzag, k);
  expect(zigzagResult[0]).toBe(k - 2);
  expect(zigzagResult[zigzagResult.length - 1]).toBe(n - 2);
});
