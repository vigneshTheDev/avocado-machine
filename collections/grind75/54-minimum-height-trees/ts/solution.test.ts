import {expect, test} from 'vitest';
import {findMinHeightTrees} from './solution';
const path = (n: number) => Array.from({length: n - 1}, (_, i) => [i, i + 1]);
test.each([
  [1, [], [0]],
  [4, [[1,0],[1,2],[1,3]], [1]],
  [6, [[3,0],[3,1],[3,2],[3,4],[5,4]], [3,4]],
  [2, [[0,1]], [0,1]],
  [3, [[0,1],[1,2]], [1]],
  [7, path(7), [3]],
  [8, path(8), [3,4]],
  [6, [[0,1],[0,2],[0,3],[0,4],[0,5]], [0]],
  [7, [[0,1],[1,2],[1,3],[2,4],[3,5],[4,6]], [1,2]],
])('finds minimum-height roots for %i nodes', (n, edges, expected) => {
  expect(findMinHeightTrees(n, edges as number[][]).sort((a,b) => a-b)).toEqual(expected);
});
test('handles a 20,000-node path with shuffled labels', () => {
  const n = 20_000;
  let seed = 9;
  const next = () => (seed = (seed * 48271) % 2147483647);
  const label = Array.from({length: n}, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = next() % (i + 1);
    [label[i], label[j]] = [label[j], label[i]];
  }
  const edges = path(n).map(([a, b]) => [label[a], label[b]]);
  expect(findMinHeightTrees(n, edges).sort((a,b) => a-b)).toEqual([label[n / 2 - 1], label[n / 2]].sort((a,b) => a-b));
});
