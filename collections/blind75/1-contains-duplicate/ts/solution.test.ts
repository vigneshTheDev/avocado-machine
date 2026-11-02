import {expect, test} from 'vitest';
import {containsDuplicate} from './solution';

const cases = [
  {
    "args": [
      []
    ],
    "expected": false,
    "name": "baseline: [[]]"
  },
  {
    "name": "duplicate zero among distinct values",
    "args": [
      [
        0,
        1,
        2,
        0
      ]
    ],
    "expected": true
  },
  {
    "name": "negative and positive values are distinct",
    "args": [
      [
        -1,
        1,
        0
      ]
    ],
    "expected": false
  },
  {
    "name": "single element has no duplicate",
    "args": [
      [
        7
      ]
    ],
    "expected": false
  },
  {
    "name": "duplicates at the first and last index",
    "args": [
      [
        5,
        1,
        2,
        3,
        4,
        6,
        7,
        8,
        9,
        5
      ]
    ],
    "expected": true
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        3,
        3
      ]
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(containsDuplicate(...(args as any))).toEqual(expected);
});

test('100k distinct values, then the same values plus one far-apart duplicate', () => {
    const nums = Array.from({length: 100000}, (_, i) => i * 3 - 150000);
    expect(containsDuplicate([...nums])).toBe(false);
    expect(containsDuplicate([...nums, nums[0]])).toBe(true);
});
