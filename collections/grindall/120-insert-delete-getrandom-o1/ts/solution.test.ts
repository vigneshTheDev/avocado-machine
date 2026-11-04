import {afterEach, expect, test, vi} from 'vitest';
import {RandomizedSet} from './solution';

afterEach(() => { vi.restoreAllMocks(); });

/** Draws Math.random() at the middle of each of `slots` equal buckets and collects the results. */
function drawEverySlot(set: RandomizedSet, slots: number): number[] {
  const random = vi.spyOn(Math, 'random');
  try {
    const seen: number[] = [];
    for (let i = 0; i < slots; i++) {
      random.mockReturnValueOnce((i + 0.5) / slots);
      seen.push(set.getRandom());
    }
    return seen;
  } finally { random.mockRestore(); }
}

test('insert and remove report whether the set changed', () => {
  const set = new RandomizedSet();
  expect(set.insert(1)).toBe(true);
  expect(set.insert(1)).toBe(false);
  expect(set.remove(2)).toBe(false);
  expect(set.insert(2)).toBe(true);
  expect([1, 2]).toContain(set.getRandom());
  expect(set.remove(1)).toBe(true);
  expect(set.getRandom()).toBe(2);
});

test('removing the first and last elements leaves the middle one', () => {
  const set = new RandomizedSet();
  for (const value of [1, 2, 3]) expect(set.insert(value)).toBe(true);
  expect(set.remove(1)).toBe(true);
  expect(set.remove(3)).toBe(true);
  for (let i = 0; i < 20; i++) expect(set.getRandom()).toBe(2);
});

test('an element swapped into a removed slot can still be removed and re-inserted', () => {
  const set = new RandomizedSet();
  for (const value of [1, 2, 3]) set.insert(value);
  expect(set.remove(2)).toBe(true);
  expect(set.remove(3)).toBe(true);
  expect(set.remove(3)).toBe(false);
  expect(set.insert(2)).toBe(true);
  expect(set.insert(1)).toBe(false);
  expect(drawEverySlot(set, 2).sort((a, b) => a - b)).toEqual([1, 2]);
});

test('getRandom can reach every stored element', () => {
  const set = new RandomizedSet();
  for (const value of [10, 20, 30, 40, 50]) set.insert(value);
  set.remove(20);
  set.insert(60);
  expect(drawEverySlot(set, 5).sort((a, b) => a - b)).toEqual([10, 30, 40, 50, 60]);
});

test('negative values and emptying the set', () => {
  const set = new RandomizedSet();
  expect(set.insert(-5)).toBe(true);
  expect(set.remove(-5)).toBe(true);
  expect(set.remove(-5)).toBe(false);
  expect(set.insert(-5)).toBe(true);
  expect(set.getRandom()).toBe(-5);
});

test('many interleaved operations stay consistent', () => {
  const set = new RandomizedSet();
  const model = new Set<number>();
  let seed = 7;
  const next = () => (seed = (seed * 1103515245 + 12345) % 2147483648);
  for (let i = 0; i < 20000; i++) {
    const value = next() % 500;
    if (next() % 2 === 0) {
      expect(set.insert(value)).toBe(!model.has(value));
      model.add(value);
    } else {
      expect(set.remove(value)).toBe(model.has(value));
      model.delete(value);
    }
    if (model.size > 0 && i % 50 === 0) expect(model.has(set.getRandom())).toBe(true);
  }
  expect(drawEverySlot(set, model.size).sort((a, b) => a - b)).toEqual([...model].sort((a, b) => a - b));
});
