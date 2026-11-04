import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [2,1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(1);
});

test("case 2", () => {
  const args = [5,5];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test("case 3", () => {
  const args = [0,0];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(0);
});

test('negative coordinates are symmetric', () => {
  expect(solve(-2, -1)).toBe(1);
  expect(solve(-5, 5)).toBe(4);
  expect(solve(2, -1)).toBe(1);
});

test('squares near the origin that need detours', () => {
  expect(solve(1, 1)).toBe(2);
  expect(solve(1, 0)).toBe(3);
  expect(solve(0, 1)).toBe(3);
  expect(solve(2, 2)).toBe(4);
});

test('distant targets along an axis', () => {
  expect(solve(300, 0)).toBe(150);
  expect(solve(0, -300)).toBe(150);
  expect(solve(-299, 0)).toBe(151);
});

test('distant diagonal targets', () => {
  expect(solve(300, 300)).toBe(200);
  expect(solve(-150, 298)).toBe(150);
});
