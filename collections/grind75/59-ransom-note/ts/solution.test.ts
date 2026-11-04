import {expect, test} from 'vitest';
import {canConstruct} from './solution';
test.each([
  ['a', 'b', false],
  ['aa', 'ab', false],
  ['aa', 'aab', true],
  ['', 'abc', true],
  ['', '', true],
  ['a', '', false],
  ['abc', 'ab', false],
  ['aab', 'baa', true],
  ['abc', 'cba', true],
  ['zzz', 'zzyzz', true],
  ['aabbcc', 'abcabz', false],
])('checks %j against %j', (note, magazine, expected) => {
  expect(canConstruct(note, magazine)).toBe(expected);
});
test('checks long strings', () => {
  const magazine = 'abcdefghijklmnopqrstuvwxyz'.repeat(4000);
  expect(canConstruct('q'.repeat(4000), magazine)).toBe(true);
  expect(canConstruct('q'.repeat(4001), magazine)).toBe(false);
});
