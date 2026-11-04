import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[10,2]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("210");
});

test("case 2", () => {
  const args = [[3,30,34,5,9]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("9534330");
});

test("case 3", () => {
  const args = [[0,0]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("0");
});

test('a single number', () => {
  expect(solve([0])).toBe('0');
  expect(solve([1000000000])).toBe('1000000000');
});

test('many zeros collapse to one', () => { expect(solve([0, 0, 0])).toBe('0'); });

test('zero goes last', () => {
  expect(solve([0, 1])).toBe('10');
  expect(solve([0, 0, 1])).toBe('100');
});

test('shared prefixes compare by concatenation', () => {
  expect(solve([121, 12])).toBe('12121');
  expect(solve([12, 121])).toBe('12121');
  expect(solve([432, 43243])).toBe('43243432');
  expect(solve([824, 8247])).toBe('8248247');
  expect(solve([8308, 8308, 830])).toBe('83088308830');
});

test('large values do not lose digits', () => {
  expect(solve([999999998, 999999997, 999999999])).toBe('999999999999999998999999997');
  expect(solve([1000000000, 1])).toBe('11000000000');
});

test('a long input', () => {
  const nums = Array.from({length: 100}, (_, i) => i);
  const result = solve(nums);
  expect(result).toHaveLength(190);
  expect(result.startsWith('999989796959')).toBe(true);
  expect(result.endsWith('141312111100')).toBe(true);
});
