import {expect, test} from 'vitest';
import {solve} from './solution';

function next(nums: number[]): number[] {
  const copy = [...nums];
  const result = solve(copy);
  expect(result).toBeUndefined();
  return copy;
}

test("case 1", () => {
  const args = [[1,2,3]];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([1,3,2]);
});

test("case 2", () => {
  const args = [[3,2,1]];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([1,2,3]);
});

test("case 3", () => {
  const args = [[1,1,5]];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([1,5,1]);
});

test('a single element is unchanged', () => { expect(next([7])).toEqual([7]); });

test('two elements swap and wrap', () => {
  expect(next([1, 2])).toEqual([2, 1]);
  expect(next([2, 1])).toEqual([1, 2]);
});

test('the pivot is not the first element', () => {
  expect(next([1, 3, 2])).toEqual([2, 1, 3]);
  expect(next([2, 3, 1])).toEqual([3, 1, 2]);
  expect(next([1, 5, 8, 4, 7, 6, 5, 3, 1])).toEqual([1, 5, 8, 5, 1, 3, 4, 6, 7]);
});

test('duplicates', () => {
  expect(next([1, 5, 1])).toEqual([5, 1, 1]);
  expect(next([5, 1, 1])).toEqual([1, 1, 5]);
  expect(next([2, 2, 2])).toEqual([2, 2, 2]);
  expect(next([1, 3, 3, 2])).toEqual([2, 1, 3, 3]);
});

test('the same array object is rearranged in place', () => {
  const nums = [1, 2, 3];
  const before = nums;
  solve(nums);
  expect(nums).toBe(before);
  expect(nums).toEqual([1, 3, 2]);
});

test('iterating visits every permutation in order', () => {
  const nums = [1, 2, 3, 4, 5];
  const seen: string[] = [];
  for (let i = 0; i < 120; i++) { seen.push(nums.join('')); solve(nums); }
  expect(nums).toEqual([1, 2, 3, 4, 5]);
  expect(new Set(seen).size).toBe(120);
  expect([...seen].sort()).toEqual(seen);
});

test('a long descending suffix', () => {
  const nums = [1, ...Array.from({length: 99999}, (_, i) => 100000 - i)];
  solve(nums);
  expect(nums[0]).toBe(2);
  expect(nums[1]).toBe(1);
  expect(nums[2]).toBe(3);
  expect(nums[nums.length - 1]).toBe(100000);
});
