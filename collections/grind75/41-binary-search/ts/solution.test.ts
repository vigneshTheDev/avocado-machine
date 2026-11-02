import {expect, test} from 'vitest';
import {search} from './solution';
test.each([
  [[-1, 0, 3, 5, 9, 12], 9, 4],
  [[-1, 0, 3, 5, 9, 12], 2, -1],
  [[7], 7, 0],
  [[], 1, -1],
  [[7], 3, -1],
  [[-1, 0, 3, 5, 9, 12], -1, 0],
  [[-1, 0, 3, 5, 9, 12], 12, 5],
  [[-1, 0, 3, 5, 9, 12], -5, -1],
  [[-1, 0, 3, 5, 9, 12], 13, -1],
  [[1, 2], 1, 0],
  [[1, 2], 2, 1],
  [[1, 3], 2, -1],
  [[-30, -20, -10], -20, 1],
])('searches %j', (nums, target, expected) => {
  expect(search(nums as number[], target as number)).toBe(expected);
});
test.each([0, 1, 31_337, 99_999, -1])('reads O(log n) elements of a 100,000-value array (target index %i)', index => {
  const n = 100_000;
  const values = Array.from({length: n}, (_, i) => i * 2);
  const target = index === -1 ? 77_777 : values[index];
  let reads = 0;
  const nums = new Proxy(values, {
    get(arr, key, receiver) {
      if (typeof key === 'string' && /^\d+$/.test(key)) reads++;
      return Reflect.get(arr, key, receiver);
    },
  });
  expect(search(nums, target)).toBe(index);
  expect(reads).toBeLessThanOrEqual(2 * (Math.ceil(Math.log2(n)) + 1));
});
