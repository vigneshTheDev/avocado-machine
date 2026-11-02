import {expect, test} from 'vitest';
import {jobScheduling} from './solution';
test.each([
  [[1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70], 120],
  [[1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60], 150],
  [[1, 1, 1], [2, 3, 4], [5, 6, 4], 6],
  [[4], [5], [9], 9],
  [[6, 3, 3, 1, 2], [9, 5, 6, 3, 4], [60, 40, 70, 50, 10], 180],
  [[1, 2, 3, 4], [2, 3, 4, 5], [5, 5, 5, 5], 20],
  [[1, 1, 2, 3, 4], [100, 2, 3, 4, 5], [100, 5, 5, 5, 5], 100],
  [[1, 1, 2, 3, 4], [100, 2, 3, 4, 5], [10, 5, 5, 5, 5], 20],
  [[1, 3], [3, 5], [7, 8], 15],
])('finds maximum profit', (start, end, profit, expected) => {
  expect(jobScheduling(start as number[], end as number[], profit as number[])).toBe(expected);
});
test('schedules 20,000 shuffled jobs', () => {
  // Unit jobs [i, i+1) earn 2 and jobs [i, i+2) earn 3, so the best plan takes every unit job
  // except the last, which is swapped for the 3-profit job that runs past the end.
  const n = 10_000;
  const jobs: number[][] = [];
  for (let i = 0; i < n; i++) jobs.push([i, i + 1, 2], [i, i + 2, 3]);
  let seed = 5;
  const next = () => (seed = (seed * 48271) % 2147483647);
  for (let i = jobs.length - 1; i > 0; i--) {
    const j = next() % (i + 1);
    [jobs[i], jobs[j]] = [jobs[j], jobs[i]];
  }
  expect(jobScheduling(jobs.map(j => j[0]), jobs.map(j => j[1]), jobs.map(j => j[2]))).toBe(2 * (n - 1) + 3);
});
