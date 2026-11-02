import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [["i","love","leetcode","i","love","coding"],2];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(["i","love"]);
});

test("case 2", () => {
  const args = [["the","day","is","sunny","the","the","the","sunny","is","is"],4];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(["the","is","sunny","day"]);
});

test('a single word', () => { expect(solve(['solo'], 1)).toEqual(['solo']); });

test('ties need lexicographic order beyond the first character', () => {
  expect(solve(['aa', 'a', 'ab', 'aaa'], 4)).toEqual(['a', 'aa', 'aaa', 'ab']);
  expect(solve(['b', 'aa', 'b', 'aa', 'a', 'a'], 2)).toEqual(['a', 'aa']);
});

test('a prefix sorts before the longer word', () => {
  expect(solve(['apple', 'app', 'apple', 'app', 'apply'], 2)).toEqual(['app', 'apple']);
});

test('k equal to the number of distinct words', () => {
  expect(solve(['c', 'b', 'a', 'b', 'c', 'c'], 3)).toEqual(['c', 'b', 'a']);
});

test('a large input', () => {
  const words: string[] = [];
  for (let i = 0; i < 5000; i++) for (let r = 0; r < (i % 10) + 1; r++) words.push('w' + String(i).padStart(4, '0'));
  const expected = Array.from({length: 500}, (_, i) => 'w' + String(i * 10 + 9).padStart(4, '0')).slice(0, 5);
  expect(solve(words, 5)).toEqual(expected);
});
