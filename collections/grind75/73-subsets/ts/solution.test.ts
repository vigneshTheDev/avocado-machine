import {expect, test} from 'vitest';
import {subsets} from './solution';
const normalized = (items: number[][]) => items.map(item => [...item].sort((a,b) => a-b).join(',')).sort();
test('returns the power set', () => {
  expect(normalized(subsets([1,2,3]))).toEqual(normalized([[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]));
  expect(subsets([])).toEqual([[]]);
});
test('follows the description example', () => {
  expect(normalized(subsets([1,2]))).toEqual(normalized([[],[1],[2],[1,2]]));
});
test('a single value gives the empty and full sets', () => {
  expect(normalized(subsets([5]))).toEqual(normalized([[],[5]]));
});
test('handles negative values and zero', () => {
  expect(normalized(subsets([-1,0]))).toEqual(normalized([[],[-1],[0],[-1,0]]));
});
test('returns 2^n distinct subsets of the input for n = 10', () => {
  const nums = [3, -7, 12, 0, 5, -1, 8, 21, -4, 9];
  const result = subsets([...nums]);
  expect(result).toHaveLength(1024);
  expect(new Set(normalized(result)).size).toBe(1024);
  for (const item of result) {
    expect(new Set(item).size).toBe(item.length);
    for (const value of item) expect(nums).toContain(value);
  }
});
