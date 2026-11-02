import {expect, test} from 'vitest';
import {minWindow} from './solution';

const cases = [
  {
    "args": [
      "x",
      "xy"
    ],
    "expected": "",
    "name": "baseline: [\"x\",\"xy\"]"
  },
  {
    "name": "target requires repeated letters",
    "args": [
      "AAABBC",
      "AABC"
    ],
    "expected": "AABBC"
  },
  {
    "name": "shortest window is inside source",
    "args": [
      "ADOBECODEBANC",
      "ABC"
    ],
    "expected": "BANC"
  },
  {
    "name": "source equals target",
    "args": [
      "abc",
      "abc"
    ],
    "expected": "abc"
  },
  {
    "name": "target needs more copies than source has",
    "args": [
      "a",
      "aa"
    ],
    "expected": ""
  },
  {
    "name": "matching is case-sensitive",
    "args": [
      "a",
      "A"
    ],
    "expected": ""
  },
  {
    "name": "window at the very start",
    "args": [
      "abxxxx",
      "ab"
    ],
    "expected": "ab"
  },
  {
    "name": "window at the very end",
    "args": [
      "xxxxab",
      "ba"
    ],
    "expected": "ab"
  },
  {
    "name": "description example",
    "args": [
      "OUZODYXAZV",
      "XYZ"
    ],
    "expected": "YXAZ"
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(minWindow(...(args as any))).toEqual(expected);
});
