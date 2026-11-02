import {expect, test} from 'vitest';
import {leastInterval} from './solution';
test.each([
  [['A','A','A','B','B','B'], 2, 8],
  [['A','A','A','B','B','B'], 0, 6],
  [['A','A','A','B','B','B'], 3, 10],
  [['A'], 4, 1],
  [['A','B','C','D','E','A'], 2, 6],
  [['A','C','A','B','D','B'], 1, 6],
  [['A','A','A','B','B','B','C','C','C'], 2, 9],
  [['A','A','A','B','B','B','C','C','C'], 3, 11],
  [['A','A','A','B','B','B','C','C','C','D','D','E'], 2, 12],
  [['A','A','A','A','A','A','B','C','D','E','F','G'], 2, 16],
  [['A','A','A'], 2, 7],
])('schedules %j with cooldown %i', (tasks, n, expected) => {
  expect(leastInterval(tasks as string[], n as number)).toBe(expected);
});
test('schedules 10,000 tasks', () => {
  const tasks = Array.from({length: 10_000}, (_, i) => String.fromCharCode(65 + (i % 26)));
  // 385 copies of the first 16 letters, 384 of the rest: no idle slots needed with n = 25.
  expect(leastInterval(tasks, 25)).toBe(10_000);
  expect(leastInterval(Array(10_000).fill('Z'), 3)).toBe(4 * 9_999 + 1);
});
