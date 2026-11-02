import {expect, test} from 'vitest';
import {MedianFinder} from './solution';

const cases = [
  {
    "args": [
      [
        -9
      ]
    ],
    "expected": [
      -9
    ],
    "name": "baseline: [[-9]]"
  },
  {
    "name": "median after every insertion across both heaps",
    "args": [
      [
        5,
        1,
        9,
        0
      ]
    ],
    "expected": [
      5,
      3,
      5,
      3
    ]
  },
  {
    "name": "duplicates and negatives",
    "args": [
      [
        -2,
        -2,
        3
      ]
    ],
    "expected": [
      -2,
      -2,
      -2
    ]
  },
  {
    "name": "even count averages to a fraction",
    "args": [
      [
        1,
        2
      ]
    ],
    "expected": [
      1,
      1.5
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        3
      ]
    ],
    "expected": [
      1,
      2
    ]
  },
  {
    "name": "strictly increasing stream",
    "args": [
      [
        1,
        2,
        3,
        4,
        5
      ]
    ],
    "expected": [
      1,
      1.5,
      2,
      2.5,
      3
    ]
  },
  {
    "name": "strictly decreasing stream",
    "args": [
      [
        5,
        4,
        3,
        2,
        1
      ]
    ],
    "expected": [
      5,
      4.5,
      4,
      3.5,
      3
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const finder = new MedianFinder();
    args[0].forEach((value: number, j: number) => { finder.addNum(value); expect(finder.findMedian()).toBe(expected[j]); });
});

test('10k increasing and 10k decreasing inserts keep the median exact', () => {
    const up = new MedianFinder();
    for (let i = 1; i <= 10000; i++) {
        up.addNum(i);
        expect(up.findMedian()).toBe((i + 1) / 2);
    }
    const down = new MedianFinder();
    for (let i = 1; i <= 10000; i++) {
        down.addNum(10001 - i);
        expect(down.findMedian()).toBe((20001 - i) / 2);
    }
});
