import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = ["(()"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [")()())"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test("case 3", () => {
  const args = [""];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(0);
});

test('single characters and no valid pair', () => {
  expect(solve('(')).toBe(0);
  expect(solve(')')).toBe(0);
  expect(solve(')(')).toBe(0);
  expect(solve('((((')).toBe(0);
  expect(solve('))))')).toBe(0);
});

test('an unmatched opener splits the valid parts', () => {
  expect(solve('()(()')).toBe(2);
  expect(solve('()(()()')).toBe(4);
});

test('adjacent and nested groups join together', () => {
  expect(solve('()(())')).toBe(6);
  expect(solve('(()())')).toBe(6);
  expect(solve('()()()')).toBe(6);
});

test('an unmatched closer splits the valid parts', () => {
  expect(solve('()())()()()')).toBe(6);
  expect(solve('(()))())(')).toBe(4);
});

test('long strings', () => {
  expect(solve('('.repeat(15000) + ')'.repeat(15000))).toBe(30000);
  expect(solve('()'.repeat(7000) + '(' + '()'.repeat(7499))).toBe(14998);
  expect(solve(')('.repeat(15000))).toBe(29998);
  expect(solve(')'.repeat(15000) + '('.repeat(15000))).toBe(0);
});
