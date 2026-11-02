import {expect, test} from 'vitest';
import {updateMatrix} from './solution';
test('computes nearest zero distances', () => {
  expect(updateMatrix([[0,0,0],[0,1,0],[1,1,1]])).toEqual([[0,0,0],[0,1,0],[1,2,1]]);
  expect(updateMatrix([[0,1,1]])).toEqual([[0,1,2]]);
});
test('a single zero', () => {
  expect(updateMatrix([[0]])).toEqual([[0]]);
});
test('takes the nearest of several zeros', () => {
  expect(updateMatrix([[0,1,1,1,0]])).toEqual([[0,1,2,1,0]]);
  expect(updateMatrix([[1],[1],[0],[1],[1],[1],[0]])).toEqual([[2],[1],[0],[1],[2],[1],[0]]);
  expect(updateMatrix([
    [0,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,0],
  ])).toEqual([
    [0,1,2,3],
    [1,2,3,2],
    [2,3,2,1],
    [3,2,1,0],
  ]);
});
test('measures around walls of ones', () => {
  expect(updateMatrix([[1,1,1],[1,1,1],[1,1,0]])).toEqual([[4,3,2],[3,2,1],[2,1,0]]);
});
test('handles a 250 x 250 grid with a single zero in the corner', () => {
  const size = 250;
  const mat = Array.from({length: size}, () => Array(size).fill(1));
  mat[0][0] = 0;
  const expected = Array.from({length: size}, (_, r) => Array.from({length: size}, (_, c) => r + c));
  expect(updateMatrix(mat)).toEqual(expected);
});
