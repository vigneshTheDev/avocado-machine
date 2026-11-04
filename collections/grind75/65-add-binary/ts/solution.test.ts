import {expect, test} from 'vitest';
import {addBinary} from './solution';
test.each([
  ['11', '1', '100'],
  ['1010', '1011', '10101'],
  ['0', '0', '0'],
  ['1111', '1', '10000'],
  ['1', '0', '1'],
  ['0', '101', '101'],
  ['1', '111', '1000'],
  ['100', '110010', '110110'],
])('adds %s and %s', (a, b, expected) => {
  expect(addBinary(a, b)).toBe(expected);
});
test('adds strings far beyond 2^53', () => {
  expect(addBinary('1'.repeat(100), '1')).toBe('1' + '0'.repeat(100));
  expect(addBinary('1', '1'.repeat(100))).toBe('1' + '0'.repeat(100));
  expect(addBinary('1' + '0'.repeat(99), '1' + '0'.repeat(99))).toBe('1' + '0'.repeat(100));
  expect(addBinary('10'.repeat(5000), '1'.repeat(10_000))).toBe('1' + '10'.repeat(4999) + '01');
});
