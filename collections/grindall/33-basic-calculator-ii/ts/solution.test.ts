import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = ["3+2*2"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(7);
});

test("case 2", () => {
  const args = [" 3/2 "];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(1);
});

test("case 3", () => {
  const args = [" 3+5 / 2 "];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(5);
});

test('a single number', () => {
  expect(solve('42')).toBe(42);
  expect(solve('  0 ')).toBe(0);
});

test('precedence chains', () => {
  expect(solve('14-3/2')).toBe(13);
  expect(solve('2*3+4*5-6/2')).toBe(23);
  expect(solve('1-1+1')).toBe(1);
  expect(solve('100/10/3')).toBe(3);
  expect(solve('2*3*4')).toBe(24);
});

test('division truncates toward zero for negative intermediate results', () => {
  expect(solve('1-3/2')).toBe(0);
  expect(solve('0-7/2')).toBe(-3);
  expect(solve('2-9/2*3')).toBe(-10);
});

test('multi-digit and large numbers', () => {
  expect(solve('1000000*2000-1')).toBe(1999999999);
  expect(solve('2147483647')).toBe(2147483647);
  expect(solve('123 + 456 * 7')).toBe(3315);
});

test('a long expression', () => {
  const expression = Array.from({length: 50000}, () => '3*2/2').join('+');
  expect(solve(expression)).toBe(150000);
  expect(solve('1' + '-1'.repeat(100000))).toBe(-99999);
});
