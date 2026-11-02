import {expect, test} from 'vitest';
import {isPalindrome} from './solution';

const cases = [
  {
    "args": [
      "Ac!"
    ],
    "expected": false,
    "name": "baseline: [\"Ac!\"]"
  },
  {
    "name": "only punctuation becomes an empty palindrome",
    "args": [
      "., !"
    ],
    "expected": true
  },
  {
    "name": "case and punctuation are ignored",
    "args": [
      "A man, a plan, a canal: Panama"
    ],
    "expected": true
  },
  {
    "name": "non-ASCII letters are not alphanumeric (U+212A KELVIN SIGN)",
    "args": [
      "\u212Aa"
    ],
    "expected": true
  },
  {
    "name": "dotted capital I (U+0130) is ignored",
    "args": [
      "\u0130a"
    ],
    "expected": true
  },
  {
    "name": "digits count and are compared",
    "args": [
      "0P"
    ],
    "expected": false
  },
  {
    "name": "mixed digits palindrome",
    "args": [
      "1a2 2A1"
    ],
    "expected": true
  },
  {
    "name": "empty string",
    "args": [
      ""
    ],
    "expected": true
  },
  {
    "name": "single character",
    "args": [
      "a"
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(isPalindrome(...(args as any))).toEqual(expected);
});
