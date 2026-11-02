import {expect, test} from 'vitest';
import {letterCombinations} from './solution';
const keypad: Record<string, string> = {2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz'};
const expectedCombinations = (digits: string) =>
  [...digits].reduce<string[]>((acc, d) => acc.flatMap(prefix => [...keypad[d]].map(c => prefix + c)), ['']).sort();
test('builds keypad combinations', () => {
  expect(letterCombinations('23').sort()).toEqual(['ad','ae','af','bd','be','bf','cd','ce','cf']);
  expect(letterCombinations('7').sort()).toEqual(['p','q','r','s']);
  expect(letterCombinations('')).toEqual([]);
});
test.each(['2', '9', '79', '234', '99', '2345', '6789'])('builds every combination for %j', digits => {
  const result = letterCombinations(digits);
  const expected = expectedCombinations(digits);
  expect(result).toHaveLength(expected.length);
  expect([...result].sort()).toEqual(expected);
});
test('uses four letters for 7 and 9', () => {
  expect(letterCombinations('79')).toHaveLength(16);
  expect(letterCombinations('234')).toHaveLength(27);
  expect(letterCombinations('9').sort()).toEqual(['w','x','y','z']);
});
