import {expect, test} from 'vitest';
import {isAnagram} from './solution';

const cases = [
  {
    "args": [
      "ab",
      "b"
    ],
    "expected": false,
    "name": "baseline: [\"ab\",\"b\"]"
  },
  {
    "name": "same counts in different order",
    "args": [
      "aabbc",
      "cbaba"
    ],
    "expected": true
  },
  {
    "name": "same length but different multiplicities",
    "args": [
      "aabc",
      "abbc"
    ],
    "expected": false
  },
  {
    "name": "equal strings are anagrams",
    "args": [
      "listen",
      "listen"
    ],
    "expected": true
  },
  {
    "name": "two empty strings are anagrams",
    "args": [
      "",
      ""
    ],
    "expected": true
  },
  {
    "name": "same letters but one extra copy",
    "args": [
      "aab",
      "abb"
    ],
    "expected": false
  },
  {
    "name": "description example",
    "args": [
      "racecar",
      "carrace"
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(isAnagram(...(args as any))).toEqual(expected);
});
