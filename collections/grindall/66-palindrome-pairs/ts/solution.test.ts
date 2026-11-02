import {expect, test} from 'vitest';
import {solve} from './solution';

function normalise(pairs: number[][]): number[][] {
  return pairs.map(pair => [...pair]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function bruteForce(words: string[]): number[][] {
  const pairs: number[][] = [];
  for (let i = 0; i < words.length; i++) for (let j = 0; j < words.length; j++) {
    if (i === j) continue;
    const joined = words[i] + words[j];
    if (joined === [...joined].reverse().join('')) pairs.push([i, j]);
  }
  return pairs;
}

function expectPairs(words: string[], expected: number[][]) {
  const actual = solve(words);
  expect(new Set(actual.map(pair => JSON.stringify(pair))).size).toBe(actual.length);
  expect(normalise(actual)).toEqual(normalise(expected));
}

test('finds both orientations', () => { expectPairs(['bat', 'tab', 'cat'], [[0, 1], [1, 0]]); });

test('an empty word pairs with a palindrome', () => { expectPairs(['a', ''], [[0, 1], [1, 0]]); });

test('LeetCode example with prefix and suffix palindromes', () => {
  expectPairs(['abcd', 'dcba', 'lls', 's', 'sssll'], [[0, 1], [1, 0], [3, 2], [2, 4]]);
});

test('the empty word pairs with every palindrome but not with non-palindromes', () => {
  expectPairs(['', 'aba', 'ab', 'c', 'xyx'], [[0, 1], [1, 0], [0, 3], [3, 0], [0, 4], [4, 0], [2, 1]]);
});

test('no pairs', () => { expectPairs(['ab', 'cd', 'ef'], []); });

test('indices of ten and more are compared numerically', () => {
  const words = ['x0', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'abc', 'cba', 'zz', 'z'];
  expectPairs(words, [[9, 10], [10, 9], [11, 12], [12, 11]]);
});

test('matches brute force on a larger word list', () => {
  const words: string[] = [];
  for (let length = 0; length <= 5; length++) {
    for (let mask = 0; mask < 1 << length; mask++) {
      let word = '';
      for (let i = 0; i < length; i++) word += mask & (1 << i) ? 'b' : 'a';
      words.push(word);
    }
  }
  words.reverse();
  expectPairs(words, bruteForce(words));
});

test('long words stay fast', () => {
  const words: string[] = [];
  for (let i = 0; i < 3000; i++) words.push(String(i).split('').map(d => 'abcdefghij'[+d]).join('') + 'q'.repeat(50));
  words.push('q'.repeat(50) + 'bc');
  // Only pairs involving the last word can be palindromes: every other word starts with a letter other than q and ends with q.
  const last = words.length - 1;
  const isPalindrome = (s: string) => s === [...s].reverse().join('');
  const expected: number[][] = [];
  for (let i = 0; i < last; i++) {
    if (isPalindrome(words[i] + words[last])) expected.push([i, last]);
    if (isPalindrome(words[last] + words[i])) expected.push([last, i]);
  }
  expect(expected.length).toBeGreaterThan(0);
  expectPairs(words, expected);
});
