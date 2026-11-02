import {expect, test} from 'vitest';
import {reverseList} from './solution';
import {listFrom, listToArray} from '../../support';

const cases = [
  {
    "args": [
      []
    ],
    "expected": [],
    "name": "baseline: [[]]"
  },
  {
    "name": "two nodes reverse their links",
    "args": [
      [
        1,
        2
      ]
    ],
    "expected": [
      2,
      1
    ]
  },
  {
    "name": "negative and repeated values preserve nodes",
    "args": [
      [
        -1,
        -1,
        2
      ]
    ],
    "expected": [
      2,
      -1,
      -1
    ]
  },
  {
    "name": "single node",
    "args": [
      [
        1
      ]
    ],
    "expected": [
      1
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        0,
        1,
        2,
        3
      ]
    ],
    "expected": [
      3,
      2,
      1,
      0
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(listToArray(reverseList(listFrom(args[0])))).toEqual(expected);
});

test('reversal reuses the nodes and the old head becomes the tail', () => {
    const head = listFrom([1, 2, 3])!;
    const second = head.next!;
    const third = second.next!;
    const reversed = reverseList(head);
    expect(reversed).toBe(third);
    expect(third.next).toBe(second);
    expect(second.next).toBe(head);
    expect(head.next).toBeNull();
});
