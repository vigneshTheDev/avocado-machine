import {expect, test} from 'vitest';
import {TimeMap} from './solution';
test('returns the latest value at or before each timestamp', () => {
  const store = new TimeMap();
  expect(store.get('foo', 1)).toBe('');
  store.set('foo', 'bar', 1);
  expect(store.get('foo', 1)).toBe('bar');
  expect(store.get('foo', 3)).toBe('bar');
  store.set('foo', 'baz', 4);
  expect(store.get('foo', 3)).toBe('bar');
  expect(store.get('foo', 4)).toBe('baz');
  store.set('other', 'x', 2);
  expect(store.get('other', 3)).toBe('x');
});
test('returns an empty string before the first timestamp of a key', () => {
  const store = new TimeMap();
  store.set('k', 'v', 10);
  expect(store.get('k', 9)).toBe('');
  expect(store.get('k', 1)).toBe('');
  expect(store.get('k', 10)).toBe('v');
  expect(store.get('missing', 10)).toBe('');
});
test('keeps keys independent when they share values and timestamps', () => {
  const store = new TimeMap();
  store.set('a', 'same', 5);
  store.set('b', 'same', 5);
  store.set('a', 'next', 6);
  expect(store.get('a', 6)).toBe('next');
  expect(store.get('b', 6)).toBe('same');
  expect(store.get('b', 4)).toBe('');
});
test('picks the right value between widely spaced timestamps', () => {
  const store = new TimeMap();
  store.set('t', 'one', 1);
  store.set('t', 'hundred', 100);
  store.set('t', 'million', 1_000_000);
  expect(store.get('t', 99)).toBe('one');
  expect(store.get('t', 100)).toBe('hundred');
  expect(store.get('t', 999_999)).toBe('hundred');
  expect(store.get('t', 10_000_000)).toBe('million');
});
test('answers 100,000 lookups over 100,000 timestamps quickly', () => {
  const store = new TimeMap();
  const n = 100_000;
  for (let i = 0; i < n; i++) store.set('key', `v${i}`, i * 2 + 1);
  let mismatches = 0;
  for (let t = 0; t < n; t++) {
    // Timestamp 2t + 2 sits between sets t and t + 1, so it sees set t.
    if (store.get('key', 2 * t + 2) !== `v${t}`) mismatches++;
  }
  expect(mismatches).toBe(0);
  expect(store.get('key', 0)).toBe('');
});
