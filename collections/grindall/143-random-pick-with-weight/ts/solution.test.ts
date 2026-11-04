import {afterEach, expect, test, vi} from 'vitest';
import {WeightedPicker} from './solution';

afterEach(() => { vi.restoreAllMocks(); });

function pickWith(picker: WeightedPicker, draws: number[]): number[] {
  const random = vi.spyOn(Math, 'random');
  try {
    return draws.map(draw => {
      random.mockReturnValueOnce(draw);
      return picker.pickIndex();
    });
  } finally { random.mockRestore(); }
}

test('a single positive weight always selects index zero', () => {
  const picker = new WeightedPicker([5]);
  expect(picker.pickIndex()).toBe(0);
});

test('boundary draws select the correct weighted bucket', () => {
  const random = vi.spyOn(Math, 'random');
  try {
    const picker = new WeightedPicker([1, 3]);
    random.mockReturnValueOnce(0).mockReturnValueOnce(0.25).mockReturnValueOnce(0.999);
    expect([picker.pickIndex(), picker.pickIndex(), picker.pickIndex()]).toEqual([0, 1, 1]);
  } finally { random.mockRestore(); }
});

test('three buckets use half-open boundaries [0,3), [3,4), [4,6)', () => {
  const picker = new WeightedPicker([3, 1, 2]);
  expect(pickWith(picker, [0, 0.49, 0.5, 0.66, 0.67, 0.9999])).toEqual([0, 0, 1, 1, 2, 2]);
});

test('equal weights split the range evenly', () => {
  const picker = new WeightedPicker([2, 2, 2, 2]);
  expect(pickWith(picker, [0, 0.24, 0.25, 0.49, 0.5, 0.74, 0.75, 0.99])).toEqual([0, 0, 1, 1, 2, 2, 3, 3]);
});

test('a heavy weight next to light ones', () => {
  const picker = new WeightedPicker([1, 98, 1]);
  expect(pickWith(picker, [0, 0.0099, 0.01, 0.5, 0.9899, 0.99, 0.9999])).toEqual([0, 0, 1, 1, 1, 2, 2]);
});

test('every index is reachable with many weights', () => {
  const weights = Array.from({length: 10000}, (_, i) => (i % 7) + 1);
  const total = weights.reduce((a, b) => a + b, 0);
  const picker = new WeightedPicker(weights);
  let prefix = 0;
  const draws: number[] = [];
  for (const w of weights) { draws.push((prefix + w / 2) / total); prefix += w; }
  expect(pickWith(picker, draws)).toEqual(weights.map((_, i) => i));
});

test('real draws stay in range', () => {
  const picker = new WeightedPicker([3, 1, 2]);
  for (let i = 0; i < 1000; i++) expect([0, 1, 2]).toContain(picker.pickIndex());
});
