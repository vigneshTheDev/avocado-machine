import {expect, test} from 'vitest';
import {Codec} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      []
    ],
    "expected": [],
    "name": "baseline: [[]]"
  },
  {
    "name": "round trip preserves missing left child",
    "args": [
      [
        1,
        null,
        2,
        3
      ]
    ],
    "expected": [
      1,
      null,
      2,
      3
    ]
  },
  {
    "name": "round trip preserves negative values and shape",
    "args": [
      [
        -1,
        0,
        2,
        null,
        3
      ]
    ],
    "expected": [
      -1,
      0,
      2,
      null,
      3
    ]
  },
  {
    "name": "multi-digit and negative values",
    "args": [
      [
        -123,
        45,
        -6789,
        null,
        1000,
        0,
        -1
      ]
    ],
    "expected": [
      -123,
      45,
      -6789,
      null,
      1000,
      0,
      -1
    ]
  },
  {
    "name": "single zero node",
    "args": [
      [
        0
      ]
    ],
    "expected": [
      0
    ]
  },
  {
    "name": "full tree",
    "args": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15
      ]
    ],
    "expected": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        3,
        null,
        null,
        4,
        5
      ]
    ],
    "expected": [
      1,
      2,
      3,
      null,
      null,
      4,
      5
    ]
  },
  {
    "name": "deep right-skewed tree",
    "args": [
      [0, ...Array.from({length: 999}, (_, i) => [null, i + 1]).flat()]
    ],
    "expected": [0, ...Array.from({length: 999}, (_, i) => [null, i + 1]).flat()]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const codec = new Codec();
    expect(treeToArray(codec.deserialize(codec.serialize(treeFrom(args[0]))))).toEqual(expected);
});

test('serialized data reconstructs the tree in another Codec instance', () => {
    const original = treeFrom([1, null, -2, 3]);
    const encoded = new Codec().serialize(original);
    const decoded = new Codec().deserialize(encoded);
    expect(treeToArray(decoded)).toEqual([1, null, -2, 3]);
    expect(decoded).not.toBe(original);
});
