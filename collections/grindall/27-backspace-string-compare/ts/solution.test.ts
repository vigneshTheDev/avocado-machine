import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = ["ab#c","ad#c"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(true);
});

test("case 2", () => {
  const args = ["a#c","b"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(false);
});

test("case 3", () => {
  const args = ["xywrrmp","xywrrmu#p"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(true);
});

test('more backspaces than characters', () => {
  expect(solve('a##c', '#a#c')).toBe(true);
  expect(solve('###', '')).toBe(true);
  expect(solve('a###b', 'b')).toBe(true);
});

test('both strings become empty', () => {
  expect(solve('ab##', 'c#d#')).toBe(true);
  expect(solve('#', 'a#')).toBe(true);
});

test('one side empty, the other not', () => {
  expect(solve('a#', 'b')).toBe(false);
  expect(solve('abc', 'abc#')).toBe(false);
});

test('backspaces that skip across groups', () => {
  expect(solve('bxj##tw', 'bxo#j##tw')).toBe(true);
  expect(solve('bxj##tw', 'bxj###tw')).toBe(false);
  expect(solve('nzp#o#g', 'b#nzp#o#g')).toBe(true);
});

test('long strings', () => {
  const s = 'ab'.repeat(50000) + '#'.repeat(99999);
  expect(solve(s, 'a')).toBe(true);
  expect(solve(s, 'b')).toBe(false);
  expect(solve('x'.repeat(100000), 'x'.repeat(100001) + '#')).toBe(true);
});
