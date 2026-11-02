import {expect, test} from 'vitest';
import {evalRPN} from './solution';
test.each([
  [['2', '1', '+', '3', '*'], 9],
  [['4', '13', '5', '/', '+'], 6],
  [['-7', '2', '/'], -3],
  [['5'], 5],
  [['7', '-2', '/'], -3],
  [['7', '2', '/'], 3],
  [['-7', '-2', '/'], 3],
  [['-12', '-34', '-'], 22],
  [['-100', '25', '*', '3', '-'], -2503],
  [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], 22],
  [['0', '-3', '/'], 0],
  [['-1', '3', '/'], 0],
])('evaluates %j', (tokens, expected) => {
  // `+ 0` turns a truncated `-0` into `0`, so either is accepted.
  expect(evalRPN(tokens as string[]) + 0).toBe(expected);
});
