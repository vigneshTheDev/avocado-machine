import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[3,2,1,5,6,4],2];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(5);
});

test("case 2", () => {
  const args = [[3,2,3,1,2,4,5,5,6],4];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test('a single element', () => { expect(solve([7], 1)).toBe(7); });

test('k = 1 and k = n', () => {
  expect(solve([3, -1, 9, 4], 1)).toBe(9);
  expect(solve([3, -1, 9, 4], 4)).toBe(-1);
});

test('all duplicates', () => {
  expect(solve([2, 2, 2, 2], 1)).toBe(2);
  expect(solve([2, 2, 2, 2], 3)).toBe(2);
});

test('negative values', () => { expect(solve([-5, -10, -1, -7], 2)).toBe(-5); });

test('large inputs, including sorted and constant arrays', () => {
  const n = 100000;
  const shuffled = Array.from({length: n}, (_, i) => i);
  let seed = 21;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 48271) % 2147483647;
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  expect(solve(shuffled, 1)).toBe(n - 1);
  expect(solve(shuffled, 50000)).toBe(50000);
  expect(solve(Array.from({length: n}, (_, i) => i), 12345)).toBe(n - 12345);
  expect(solve(new Array(n).fill(4), 77777)).toBe(4);
});
