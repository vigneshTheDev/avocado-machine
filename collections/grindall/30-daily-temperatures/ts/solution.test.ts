import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[73,74,75,71,69,72,76,73]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([1,1,4,2,1,1,0,0]);
});

test("case 2", () => {
  const args = [[30,40,50,60]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([1,1,1,0]);
});

test('LeetCode example with a short list', () => { expect(solve([30, 60, 90])).toEqual([1, 1, 0]); });

test('a single day', () => { expect(solve([50])).toEqual([0]); });

test('strictly decreasing temperatures never warm up', () => { expect(solve([90, 80, 70, 60])).toEqual([0, 0, 0, 0]); });

test('equal temperatures are not warmer', () => {
  expect(solve([70, 70, 70])).toEqual([0, 0, 0]);
  expect(solve([70, 70, 71])).toEqual([2, 1, 0]);
});

test('a warmer day far ahead', () => { expect(solve([55, 38, 53, 81, 61, 93, 97, 32, 43, 78])).toEqual([3, 1, 1, 2, 1, 1, 0, 1, 1, 0]); });

test('a large input needs a monotonic stack', () => {
  const n = 100000;
  const temps = Array.from({length: n}, (_, i) => (i === 0 ? 99 : i === n - 1 ? 100 : 30 + (i % 2)));
  const result = solve(temps);
  expect(result[0]).toBe(n - 1);
  expect(result[1]).toBe(n - 2);
  expect(result[2]).toBe(1);
  expect(result[n - 2]).toBe(1);
  expect(result[n - 1]).toBe(0);
  expect(solve(new Array(n).fill(30)).every(v => v === 0)).toBe(true);
});
