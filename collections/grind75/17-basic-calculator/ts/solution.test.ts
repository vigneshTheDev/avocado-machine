import {expect, test} from 'vitest';
import {calculate} from './solution';
test.each([
  ['1 + 1', 2],
  [' 2-1 + 2 ', 3],
  ['(1+(4+5+2)-3)+(6+8)', 23],
  ['-(3 + (2 - 1))', -4],
  ['1 + (2 - 3)', 0],
  ['-(-(2))', 2],
  ['2-(5-6)', 3],
  ['1-(-2)', 3],
  ['123 - 45 + 6', 84],
  ['2147483647 - 1000000000', 1147483647],
  ['  (  12  +  (  3 -  4 )  )  -  (  5  )  ', 6],
  ['42', 42],
])('evaluates %j', (expression, expected) => {
  expect(calculate(expression)).toBe(expected);
});
test('evaluates deeply nested parentheses', () => {
  const depth = 1000;
  expect(calculate('('.repeat(depth) + '7' + ')'.repeat(depth))).toBe(7);
  expect(calculate('-('.repeat(depth) + '7' + ')'.repeat(depth))).toBe(7);
});
test('evaluates a long flat expression', () => {
  expect(calculate(Array(10_000).fill('3').join(' - 1 + '))).toBe(3 * 10_000 - 9_999);
});
