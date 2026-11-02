import {expect, test} from 'vitest';
import {floodFill} from './solution';
test('fills only the connected component', () => {
  expect(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2)).toEqual([[2,2,2],[2,2,0],[2,0,1]]);
  expect(floodFill([[0,0],[0,0]], 0, 0, 0)).toEqual([[0,0],[0,0]]);
});
test('recolors a single cell', () => {
  expect(floodFill([[5]], 0, 0, 3)).toEqual([[3]]);
});
test('starts from a border cell', () => {
  expect(floodFill([[0,0,0],[0,1,1]], 1, 2, 3)).toEqual([[0,0,0],[0,3,3]]);
  expect(floodFill([[4,4,1],[1,4,1],[4,1,4]], 0, 0, 9)).toEqual([[9,9,1],[1,9,1],[4,1,4]]);
});
test('does not spread diagonally', () => {
  expect(floodFill([[1,0,1],[0,1,0],[1,0,1]], 1, 1, 2)).toEqual([[1,0,1],[0,2,0],[1,0,1]]);
});
test('a new color equal to an adjacent color does not join that region', () => {
  expect(floodFill([[1,2],[2,1]], 0, 0, 2)).toEqual([[2,2],[2,1]]);
  expect(floodFill([[1,1,2],[2,2,2]], 0, 0, 2)).toEqual([[2,2,2],[2,2,2]]);
  expect(floodFill([[3,3,2,3]], 0, 1, 2)).toEqual([[2,2,2,3]]);
});
test('fills a winding region and leaves the rest alone', () => {
  const image = [
    [1,1,1,1],
    [0,0,0,1],
    [1,1,0,1],
    [1,0,1,1],
  ];
  expect(floodFill(image, 0, 0, 7)).toEqual([
    [7,7,7,7],
    [0,0,0,7],
    [1,1,0,7],
    [1,0,7,7],
  ]);
});
