import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = ["3[a]2[bc]"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("aaabcbc");
});

test("case 2", () => {
  const args = ["3[a2[c]]"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("accaccacc");
});

test("case 3", () => {
  const args = ["2[abc]3[cd]ef"];
  expect(solve(...args as Parameters<typeof solve>)).toEqual("abcabccdcdcdef");
});

test('a string without brackets is unchanged', () => { expect(solve('abc')).toBe('abc'); });

test('multi-digit repeat counts', () => {
  expect(solve('10[a]')).toBe('aaaaaaaaaa');
  expect(solve('12[xy]z')).toBe('xy'.repeat(12) + 'z');
  expect(solve('100[b]')).toBe('b'.repeat(100));
});

test('letters before, between, and after groups', () => {
  expect(solve('ab2[c]de3[f]g')).toBe('abccdefffg');
  expect(solve('3[z]2[2[y]pq4[2[jk]e1[f]]]ef')).toBe('zzz' + ('yypq' + 'jkjkef'.repeat(4)).repeat(2) + 'ef');
});

test('deep nesting', () => {
  expect(solve('2[2[2[2[2[a]]]]]')).toBe('a'.repeat(32));
  expect(solve('1[1[1[1[1[1[1[1[1[1[x]]]]]]]]]]')).toBe('x');
});

test('a long output', () => {
  const result = solve('100[100[ab]c]');
  expect(result).toHaveLength(100 * 201);
  expect(result.slice(0, 201)).toBe('ab'.repeat(100) + 'c');
});
