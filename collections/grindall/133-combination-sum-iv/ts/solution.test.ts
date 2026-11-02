import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,2,3],4];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(7);
});

test("case 2", () => {
  const args = [[9],3];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(0);
});

test('order matters', () => {
  expect(solve([1, 2], 3)).toBe(3);
  expect(solve([5, 1, 3], 10)).toBe(47);
});

test('a target equal to a single value', () => { expect(solve([4], 4)).toBe(1); });

test('an unreachable target', () => {
  expect(solve([2, 4], 7)).toBe(0);
  expect(solve([5, 10], 1)).toBe(0);
});

test('a large target needs memoisation', () => { expect(solve([1, 2, 3], 35)).toBe(1132436852); });
