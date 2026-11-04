import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[-4,-1,0,3,10]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([0,1,9,16,100]);
});

test("case 2", () => {
  const args = [[-7,-3,2,3,11]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([4,9,9,49,121]);
});

test('a single element', () => {
  expect(solve([-5])).toEqual([25]);
  expect(solve([0])).toEqual([0]);
});

test('all negative values', () => { expect(solve([-9, -4, -2, -1])).toEqual([1, 4, 16, 81]); });

test('all non-negative values', () => { expect(solve([0, 2, 3, 3, 8])).toEqual([0, 4, 9, 9, 64]); });

test('equal magnitudes on both sides', () => { expect(solve([-3, -3, -2, 2, 3])).toEqual([4, 4, 9, 9, 9]); });

test('a large input', () => {
  const n = 100000;
  const nums = Array.from({length: n}, (_, i) => i - n / 2);
  const result = solve(nums);
  expect(result).toHaveLength(n);
  expect(result[0]).toBe(0);
  expect(result[1]).toBe(1);
  expect(result[2]).toBe(1);
  expect(result[n - 1]).toBe((n / 2) ** 2);
  expect(result.every((v, i) => i === 0 || result[i - 1] <= v)).toBe(true);
});
