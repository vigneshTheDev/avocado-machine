import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = ["III"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(3);
});

test("case 2", () => {
  const args = ["MCMXCIV"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(1994);
});

test('single symbols', () => {
  expect(['I', 'V', 'X', 'L', 'C', 'D', 'M'].map(solve)).toEqual([1, 5, 10, 50, 100, 500, 1000]);
});

test('every subtractive pair', () => {
  expect(['IV', 'IX', 'XL', 'XC', 'CD', 'CM'].map(solve)).toEqual([4, 9, 40, 90, 400, 900]);
});

test('LeetCode example without subtraction', () => { expect(solve('LVIII')).toBe(58); });

test('the largest and other mixed numerals', () => {
  expect(solve('MMMCMXCIX')).toBe(3999);
  expect(solve('CDXLIV')).toBe(444);
  expect(solve('MMXXVI')).toBe(2026);
});
