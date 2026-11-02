import {expect, test} from 'vitest';
import {kClosest} from './solution';
const sorted = (points: number[][]) => points.map(p => p.join(',')).sort();
const dist = ([x, y]: number[]) => x * x + y * y;
// Accepts any valid answer: k input points, none farther than any point left out.
function expectValidClosest(points: number[][], k: number, result: number[][]) {
  expect(result).toHaveLength(k);
  const remaining = sorted(points);
  for (const key of sorted(result)) {
    const index = remaining.indexOf(key);
    expect(index).toBeGreaterThanOrEqual(0);
    remaining.splice(index, 1);
  }
  const chosenMax = Math.max(...result.map(dist));
  const leftMin = Math.min(...remaining.map(key => dist(key.split(',').map(Number))));
  expect(chosenMax).toBeLessThanOrEqual(leftMin);
}
test('selects closest points regardless of result order', () => {
  expect(sorted(kClosest([[1,3],[-2,2]], 1))).toEqual(sorted([[-2,2]]));
  expect(sorted(kClosest([[3,3],[5,-1],[-2,4]], 2))).toEqual(sorted([[3,3],[-2,4]]));
  expect(kClosest([[0,0]], 1)).toEqual([[0,0]]);
});
test('returns every point when k equals the length', () => {
  const points = [[5,5],[-1,0],[2,-3],[0,7]];
  expect(sorted(kClosest(points.map(p => [...p]), 4))).toEqual(sorted(points));
});
test('handles negative coordinates', () => {
  expect(sorted(kClosest([[-5,-5],[-1,-2],[3,-4],[-2,1]], 2))).toEqual(sorted([[-1,-2],[-2,1]]));
});
test('accepts any choice among points tied at the boundary', () => {
  const points = [[1,0],[0,1],[-1,0],[0,-1],[3,3]];
  for (const k of [1, 2, 3]) expectValidClosest(points, k, kClosest(points.map(p => [...p]), k));
  expect(sorted(kClosest(points.map(p => [...p]), 4))).toEqual(sorted(points.slice(0, 4)));
});
test('separates large coordinates with close squared distances', () => {
  const points = [[30000,30000],[30000,29999],[-29999,-30000],[0,-42426]];
  // Squared distances: 1,800,000,000; 1,799,940,001 (twice); 1,799,965,476.
  expect(sorted(kClosest(points.map(p => [...p]), 2))).toEqual(sorted([[30000,29999],[-29999,-30000]]));
  expect(sorted(kClosest(points.map(p => [...p]), 3))).toEqual(sorted([[30000,29999],[-29999,-30000],[0,-42426]]));
});
test('picks 1,000 closest of 20,000 pseudo-random points', () => {
  let seed = 13;
  const next = () => (seed = (seed * 48271) % 2147483647);
  const points = Array.from({length: 20_000}, () => [next() % 20001 - 10000, next() % 20001 - 10000]);
  expectValidClosest(points, 1000, kClosest(points.map(p => [...p]), 1000));
});
