import {expect, test} from 'vitest';
import {alienOrder} from './solution';

const cases = [
  {
    "args": [
      [
        "aba",
        "a"
      ]
    ],
    "expected": false,
    "name": "baseline: [[\"aba\",\"a\"]]"
  },
  {
    "name": "invalid prefix ordering",
    "args": [
      [
        "abc",
        "ab"
      ]
    ],
    "expected": false
  },
  {
    "name": "single word still yields every distinct letter",
    "args": [
      [
        "abca"
      ]
    ],
    "expected": true
  },
  {
    "name": "cycle contradiction",
    "args": [
      [
        "z",
        "x",
        "z"
      ]
    ],
    "expected": false
  },
  {
    "name": "duplicate words",
    "args": [
      [
        "abc",
        "abc"
      ]
    ],
    "expected": true
  },
  {
    "name": "LeetCode example",
    "args": [
      [
        "wrt",
        "wrf",
        "er",
        "ett",
        "rftt"
      ]
    ],
    "expected": true
  },
  {
    "name": "description example",
    "args": [
      [
        "z",
        "o"
      ]
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const order = alienOrder(args[0]);
    if (!expected) expect(order).toBe('');
    else { const chars = [...new Set(args[0].join(''))]; expect(order.length).toBe(chars.length); expect(new Set(order).size).toBe(chars.length); expect(chars.every(c => order.includes(c))).toBe(true); const rank = new Map([...order].map((c, j) => [c, j])); for (let j = 0; j + 1 < args[0].length; j++) { const a = args[0][j], b = args[0][j + 1]; let k = 0; while (k < a.length && k < b.length && a[k] === b[k]) k++; if (k < a.length && k < b.length) expect(rank.get(a[k])!).toBeLessThan(rank.get(b[k])!); else expect(a.length).toBeLessThanOrEqual(b.length); } }
});
