import {expect, test} from 'vitest';
import {orangesRotting} from './solution';
test.each([
  [[[2,1,1],[1,1,0],[0,1,1]], 4],
  [[[2,1,1],[0,1,1],[1,0,1]], -1],
  [[[0,2]], 0],
  [[[1]], -1],
  [[[0]], 0],
  [[[2]], 0],
  [[[2,1,1,1,2]], 2],
  [[[2,1,1,1,1,1,2]], 3],
  [[[2,0,1]], -1],
  [[[1,0,2],[0,0,0],[2,1,1]], -1],
  [[[2,2],[1,1],[0,0],[2,0]], 1],
  [[[1,1,1],[1,2,1],[1,1,1]], 2],
])('counts minutes for %j', (grid, expected) => {
  expect(orangesRotting(grid as number[][])).toBe(expected);
});
