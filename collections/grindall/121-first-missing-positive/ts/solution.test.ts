import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,2,0]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(3);
});

test("case 2", () => {
  const args = [[3,4,-1,1]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 3", () => {
  const args = [[7,8,9,11,12]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(1);
});

test('single elements', () => {
  expect(solve([1])).toBe(2);
  expect(solve([2])).toBe(1);
  expect(solve([-1])).toBe(1);
});

test('duplicates', () => {
  expect(solve([1, 1])).toBe(2);
  expect(solve([2, 2, 2, 1, 1])).toBe(3);
  expect(solve([3, 3, 1, 1, 4, 4])).toBe(2);
});

test('large values and extreme integers', () => {
  expect(solve([2147483647, -2147483648, 1])).toBe(2);
  expect(solve([1000000000, 2, 1])).toBe(3);
});

test('a complete permutation', () => { expect(solve([5, 3, 1, 4, 2])).toBe(6); });

test('a large shuffled input', () => {
  const n = 100000;
  const nums = Array.from({length: n}, (_, i) => i + 1);
  let seed = 9;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 48271) % 2147483647;
    const j = seed % (i + 1);
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  expect(solve([...nums])).toBe(n + 1);
  const missing = nums.map(v => v === 54321 ? -7 : v);
  expect(solve(missing)).toBe(54321);
});
