import {expect, test} from 'vitest';
import {isValid} from './solution';

const cases = [
  {
    "args": [
      "()"
    ],
    "expected": true,
    "name": "baseline: [\"()\"]"
  },
  {
    "name": "crossed pairs are invalid",
    "args": [
      "([)]"
    ],
    "expected": false
  },
  {
    "name": "unclosed opener is invalid",
    "args": [
      "(()"
    ],
    "expected": false
  },
  {
    "name": "lone closer",
    "args": [
      ")"
    ],
    "expected": false
  },
  {
    "name": "closer before opener",
    "args": [
      "]["
    ],
    "expected": false
  },
  {
    "name": "empty string",
    "args": [
      ""
    ],
    "expected": true
  },
  {
    "name": "sequential pairs of every kind",
    "args": [
      "()[]{}"
    ],
    "expected": true
  },
  {
    "name": "description example",
    "args": [
      "([{}])"
    ],
    "expected": true
  },
  {
    "name": "long nesting",
    "args": [
      "([{".repeat(2000) + "}])".repeat(2000)
    ],
    "expected": true
  },
  {
    "name": "long nesting missing one closer",
    "args": [
      "(".repeat(5000) + ")".repeat(4999)
    ],
    "expected": false
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(isValid(...(args as any))).toEqual(expected);
});
