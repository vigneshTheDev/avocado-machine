import {expect, test} from 'vitest';
import {longestConsecutive} from './solution';

const cases = [
  {
    "args": [
      []
    ],
    "expected": 0,
    "name": "baseline: [[]]"
  },
  {
    "name": "duplicates do not extend a run",
    "args": [
      [
        1,
        2,
        2,
        3,
        10
      ]
    ],
    "expected": 3
  },
  {
    "name": "run crosses zero in unsorted input",
    "args": [
      [
        2,
        -1,
        1,
        0,
        -2
      ]
    ],
    "expected": 5
  },
  {
    "name": "single element",
    "args": [
      [
        5
      ]
    ],
    "expected": 1
  },
  {
    "name": "all duplicates",
    "args": [
      [
        0,
        0,
        0
      ]
    ],
    "expected": 1
  },
  {
    "name": "two runs of equal length",
    "args": [
      [
        10,
        1,
        11,
        2,
        12,
        3
      ]
    ],
    "expected": 3
  },
  {
    "name": "large values with a gap",
    "args": [
      [
        100,
        4,
        200,
        1,
        3,
        2
      ]
    ],
    "expected": 4
  },
  {
    "name": "description example",
    "args": [
      [
        2,
        20,
        4,
        10,
        3,
        4,
        5
      ]
    ],
    "expected": 4
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(longestConsecutive(...(args as any))).toEqual(expected);
});

test('100k shuffled values with one gap', () => {
    const nums = Array.from({length: 100000}, (_, i) => (i * 7919) % 100000).filter(value => value !== 60000);
    expect(longestConsecutive(nums)).toBe(60000);
});
