import {expect, test} from 'vitest';
import {hammingWeight} from './solution';

const cases = [
  {
    "args": [
      0
    ],
    "expected": 0,
    "name": "baseline: [0]"
  },
  {
    "name": "highest unsigned bit is counted",
    "args": [
      2147483648
    ],
    "expected": 1
  },
  {
    "name": "all 32 bits set",
    "args": [
      4294967295
    ],
    "expected": 32
  },
  {
    "name": "alternating bits",
    "args": [
      2863311530
    ],
    "expected": 16
  },
  {
    "name": "one",
    "args": [
      1
    ],
    "expected": 1
  },
  {
    "name": "description example",
    "args": [
      23
    ],
    "expected": 4
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(hammingWeight(...(args as any))).toEqual(expected);
});
