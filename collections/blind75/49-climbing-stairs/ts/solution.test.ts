import {expect, test} from 'vitest';
import {climbStairs} from './solution';

const cases = [
  {
    "args": [
      1
    ],
    "expected": 1,
    "name": "baseline: [1]"
  },
  {
    "name": "two ways to climb two steps",
    "args": [
      2
    ],
    "expected": 2
  },
  {
    "name": "n = 3 (example)",
    "args": [
      3
    ],
    "expected": 3
  },
  {
    "name": "five steps follow recurrence",
    "args": [
      5
    ],
    "expected": 8
  },
  {
    "name": "n = 10",
    "args": [
      10
    ],
    "expected": 89
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(climbStairs(...(args as any))).toEqual(expected);
});

// Upper bound (1 <= n <= 45). A linear-time solution finishes in a few
// milliseconds; an exponential one (e.g. memoization that never shares its
// cache) needs over a minute. Vitest cannot interrupt synchronous code, so a
// slow solution runs to completion before this test is reported as timed out.
test('upper bound n = 45 runs in linear time', () => {
    expect(climbStairs(45)).toEqual(1836311903);
}, 1000);

// Kept to n <= 30 so a slow solution still finishes this check quickly; the
// upper-bound test above covers performance.
test('every n in 3..30 satisfies f(n) = f(n-1) + f(n-2)', () => {
    const results = Array.from({length: 30}, (_, i) => climbStairs(i + 1));
    expect(results[0]).toBe(1);
    expect(results[1]).toBe(2);
    for (let n = 3; n <= 30; n++) {
        expect(results[n - 1], `n = ${n}`).toBe(results[n - 2] + results[n - 3]);
    }
});
