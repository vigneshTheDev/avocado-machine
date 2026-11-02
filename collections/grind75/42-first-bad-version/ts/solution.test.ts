import {expect, test} from 'vitest';
import {firstBadVersion} from './solution';
const MAX = 2 ** 31 - 1;
test.each([
  [1, 1], [5, 4], [1000, 783],
  [2, 1], [2, 2], [5, 1], [5, 5],
  [MAX, MAX], [MAX, 1], [MAX, 1_702_766_719],
])('finds first bad version among %i versions (first bad %i)', (n, firstBad) => {
  let calls = 0;
  const found = firstBadVersion(n, version => {
    calls++;
    expect(Number.isInteger(version) && version >= 1 && version <= n).toBe(true);
    return version >= firstBad;
  });
  expect(found).toBe(firstBad);
  expect(calls).toBeLessThanOrEqual(Math.ceil(Math.log2(n)) + 2);
});
