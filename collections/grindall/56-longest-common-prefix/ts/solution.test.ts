import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [["flower","flow","flight"]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("fl");
});

test("case 2", () => {
  const args = [["dog","racecar","car"]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("");
});

test('a single string is its own prefix', () => {
  expect(solve(['alone'])).toBe('alone');
  expect(solve([''])).toBe('');
});

test('an empty string in the list', () => {
  expect(solve(['abc', '', 'abd'])).toBe('');
  expect(solve(['', 'x'])).toBe('');
});

test('one string is a prefix of another', () => {
  expect(solve(['interview', 'inter', 'internet'])).toBe('inter');
  expect(solve(['ab', 'abc', 'abcd'])).toBe('ab');
  expect(solve(['abcd', 'abc', 'ab'])).toBe('ab');
});

test('identical strings', () => { expect(solve(['same', 'same', 'same'])).toBe('same'); });

test('the mismatch is in the last string', () => { expect(solve(['prefix', 'prefix', 'pretty'])).toBe('pre'); });

test('many long strings', () => {
  const base = 'a'.repeat(200);
  const words = Array.from({length: 200}, (_, i) => base + String.fromCharCode(97 + (i % 26)));
  expect(solve(words)).toBe(base);
});
