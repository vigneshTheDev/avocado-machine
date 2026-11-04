import {expect, test} from 'vitest';
import {LRUCache} from './solution';
test('evicts least recently used key', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1); cache.put(2, 2);
  expect(cache.get(1)).toBe(1);
  cache.put(3, 3);
  expect(cache.get(2)).toBe(-1);
  cache.put(4, 4);
  expect(cache.get(1)).toBe(-1);
  expect(cache.get(3)).toBe(3);
  expect(cache.get(4)).toBe(4);
});
test('updating an existing key refreshes it', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1); cache.put(2, 2); cache.put(1, 9); cache.put(3, 3);
  expect(cache.get(1)).toBe(9);
  expect(cache.get(2)).toBe(-1);
});
test('capacity 1 keeps only the latest key', () => {
  const cache = new LRUCache(1);
  expect(cache.get(1)).toBe(-1);
  cache.put(1, 10);
  expect(cache.get(1)).toBe(10);
  cache.put(2, 20);
  expect(cache.get(1)).toBe(-1);
  expect(cache.get(2)).toBe(20);
  cache.put(2, 21);
  expect(cache.get(2)).toBe(21);
});
test('get on a missing key does not change recency', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1); cache.put(2, 2);
  expect(cache.get(3)).toBe(-1);
  cache.put(3, 3);
  expect(cache.get(1)).toBe(-1);
  expect(cache.get(2)).toBe(2);
  expect(cache.get(3)).toBe(3);
});
test('put on an existing key at capacity does not evict', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1); cache.put(2, 2);
  cache.put(2, 22);
  expect(cache.get(1)).toBe(1);
  expect(cache.get(2)).toBe(22);
});
test('stores values of 0 and negative numbers', () => {
  const cache = new LRUCache(2);
  cache.put(0, 0); cache.put(-1, -5);
  expect(cache.get(0)).toBe(0);
  expect(cache.get(-1)).toBe(-5);
});
test('matches a Map-based model over 50,000 random operations', () => {
  let seed = 3;
  const next = () => (seed = (seed * 48271) % 2147483647);
  const capacity = 50;
  const cache = new LRUCache(capacity);
  const model = new Map<number, number>();
  const actual: number[] = [];
  const expected: number[] = [];
  for (let i = 0; i < 50_000; i++) {
    const key = next() % 120;
    if (next() % 2 === 0) {
      actual.push(cache.get(key));
      if (model.has(key)) {
        const value = model.get(key)!;
        model.delete(key); model.set(key, value);
        expected.push(value);
      } else {
        expected.push(-1);
      }
    } else {
      const value = next() % 1000;
      cache.put(key, value);
      model.delete(key); model.set(key, value);
      if (model.size > capacity) model.delete(model.keys().next().value!);
    }
  }
  expect(actual).toEqual(expected);
});
