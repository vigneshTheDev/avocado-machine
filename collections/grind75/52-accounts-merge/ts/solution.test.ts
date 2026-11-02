import {expect, test} from 'vitest';
import {accountsMerge} from './solution';
const normalized = (groups: string[][]) => groups.map(([name, ...emails]) => [name, ...emails.sort()]).sort((a, b) => a.join('|').localeCompare(b.join('|')));
const recordsAreSorted = (groups: string[][]) => groups.every(([, ...emails]) => emails.join('\n') === [...emails].sort().join('\n'));
test('merges transitively and keeps unrelated accounts separate', () => {
  const accounts = [
    ['John', 'a@x', 'b@x'],
    ['John', 'c@x', 'b@x'],
    ['John', 'd@x'],
    ['John', 'c@x', 'e@x'],
    ['Mary', 'z@x'],
  ];
  expect(normalized(accountsMerge(accounts))).toEqual(normalized([
    ['John', 'a@x', 'b@x', 'c@x', 'e@x'],
    ['John', 'd@x'],
    ['Mary', 'z@x'],
  ]));
});
test('merges the description example', () => {
  expect(accountsMerge([['A', 'a@x'], ['A', 'a@x', 'b@x']])).toEqual([['A', 'a@x', 'b@x']]);
});
test('a single record with one email is returned as is', () => {
  expect(accountsMerge([['Solo', 's@x']])).toEqual([['Solo', 's@x']]);
});
test('keeps people with the same name but different emails separate', () => {
  const result = accountsMerge([['Alex', 'one@x'], ['Alex', 'two@x'], ['Alex', 'three@x']]);
  expect(normalized(result)).toEqual(normalized([['Alex', 'one@x'], ['Alex', 'two@x'], ['Alex', 'three@x']]));
});
test('links records that only connect through a later record', () => {
  const accounts = [
    ['Kim', 'k1@x'],
    ['Kim', 'k2@x'],
    ['Kim', 'k3@x'],
    ['Kim', 'k3@x', 'k1@x'],
    ['Kim', 'k2@x', 'k3@x'],
  ];
  expect(accountsMerge(accounts)).toEqual([['Kim', 'k1@x', 'k2@x', 'k3@x']]);
});
test('removes duplicate emails within and across records', () => {
  const accounts = [['Lee', 'l@x', 'l@x', 'm@x'], ['Lee', 'm@x', 'l@x']];
  expect(accountsMerge(accounts)).toEqual([['Lee', 'l@x', 'm@x']]);
});
test('sorts emails by code point, not by locale', () => {
  const accounts = [['Pat', 'ab@x', 'a_x@x'], ['Pat', 'Zed@x', 'ab@x'], ['Pat', 'a@x']];
  const result = accountsMerge(accounts);
  expect(recordsAreSorted(result)).toBe(true);
  expect(normalized(result)).toEqual(normalized([['Pat', 'Zed@x', 'a_x@x', 'ab@x'], ['Pat', 'a@x']]));
  expect(result.find(record => record.length === 4)).toEqual(['Pat', 'Zed@x', 'a_x@x', 'ab@x']);
});
