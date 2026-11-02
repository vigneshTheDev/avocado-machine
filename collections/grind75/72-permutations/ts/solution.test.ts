import {expect, test} from 'vitest';
import {permute} from './solution';
const normalized = (items: number[][]) => items.map(item => item.join(',')).sort();
const sortedCopy = (nums: number[]) => [...nums].sort((a, b) => a - b);
test('returns all distinct permutations', () => {
  expect(normalized(permute([1,2,3]))).toEqual(normalized([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]));
  expect(permute([7])).toEqual([[7]]);
});
test('follows the description example', () => {
  expect(normalized(permute([1,2]))).toEqual(normalized([[1,2],[2,1]]));
});
test('handles negative values and zero', () => {
  expect(normalized(permute([-1,0,1]))).toEqual(normalized([[-1,0,1],[-1,1,0],[0,-1,1],[0,1,-1],[1,-1,0],[1,0,-1]]));
});
test('returns n! distinct permutations of the input for n = 6', () => {
  const nums = [4, -2, 9, 0, 7, -5];
  const result = permute([...nums]);
  expect(result).toHaveLength(720);
  expect(new Set(normalized(result)).size).toBe(720);
  for (const item of result) expect(sortedCopy(item)).toEqual(sortedCopy(nums));
});
