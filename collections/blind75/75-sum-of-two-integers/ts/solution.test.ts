import {expect, test} from 'vitest';
import {getSum} from './solution';

const cases = [
  {
    "args": [
      -650,
      -290
    ],
    "expected": -940,
    "name": "baseline: [-650,-290]"
  },
  {
    "name": "carry crosses multiple bits",
    "args": [
      7,
      1
    ],
    "expected": 8
  },
  {
    "name": "negative and positive sum",
    "args": [
      -4,
      7
    ],
    "expected": 3
  },
  {
    "name": "zero plus zero",
    "args": [
      0,
      0
    ],
    "expected": 0
  },
  {
    "name": "opposites cancel",
    "args": [
      -1000,
      1000
    ],
    "expected": 0
  },
  {
    "name": "largest inputs",
    "args": [
      1000,
      1000
    ],
    "expected": 2000
  },
  {
    "name": "smallest inputs",
    "args": [
      -1000,
      -1000
    ],
    "expected": -2000
  },
  {
    "name": "carry propagates through the sign bit",
    "args": [
      -1,
      1
    ],
    "expected": 0
  },
  {
    "name": "description example",
    "args": [
      4,
      7
    ],
    "expected": 11
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(getSum(...(args as any))).toEqual(expected);
});
