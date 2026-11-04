import {expect, test} from 'vitest';
import {FileSystem} from './solution';

test('directories list in sorted order and files append content', () => {
  const fs = new FileSystem();
  expect(fs.ls('/')).toEqual([]);
  fs.mkdir('/a/b/c');
  fs.addContentToFile('/a/b/c/file', 'hello');
  fs.addContentToFile('/a/b/c/file', ' world');
  expect(fs.readContentFromFile('/a/b/c/file')).toBe('hello world');
  expect(fs.ls('/a/b/c')).toEqual(['file']);
  expect(fs.ls('/a/b/c/file')).toEqual(['file']);
});

test('sibling directory names sort alphabetically', () => {
  const fs = new FileSystem();
  fs.mkdir('/z');
  fs.mkdir('/a');
  expect(fs.ls('/')).toEqual(['a', 'z']);
});

test('LeetCode example', () => {
  const fs = new FileSystem();
  expect(fs.ls('/')).toEqual([]);
  fs.mkdir('/a/b/c');
  fs.addContentToFile('/a/b/c/d', 'hello');
  expect(fs.ls('/')).toEqual(['a']);
  expect(fs.readContentFromFile('/a/b/c/d')).toBe('hello');
});

test('ls lists files and directories together in lexicographic order', () => {
  const fs = new FileSystem();
  fs.mkdir('/docs/b');
  fs.addContentToFile('/docs/ba', 'x');
  fs.mkdir('/docs/aa');
  fs.addContentToFile('/docs/a', 'y');
  fs.mkdir('/docs/ab');
  expect(fs.ls('/docs')).toEqual(['a', 'aa', 'ab', 'b', 'ba']);
  expect(fs.ls('/docs/b')).toEqual([]);
});

test('mkdir on an existing path keeps its contents', () => {
  const fs = new FileSystem();
  fs.mkdir('/x/y');
  fs.addContentToFile('/x/y/f', 'data');
  fs.mkdir('/x/y');
  fs.mkdir('/x');
  fs.mkdir('/x/y/z');
  expect(fs.ls('/x/y')).toEqual(['f', 'z']);
  expect(fs.readContentFromFile('/x/y/f')).toBe('data');
});

test('a file at the root and appending to an existing file', () => {
  const fs = new FileSystem();
  fs.addContentToFile('/notes', 'a');
  fs.addContentToFile('/notes', 'b');
  fs.addContentToFile('/notes', 'c');
  expect(fs.ls('/')).toEqual(['notes']);
  expect(fs.ls('/notes')).toEqual(['notes']);
  expect(fs.readContentFromFile('/notes')).toBe('abc');
});

test('files with the same name in different directories are separate', () => {
  const fs = new FileSystem();
  fs.mkdir('/p');
  fs.mkdir('/q');
  fs.addContentToFile('/p/same', 'one');
  fs.addContentToFile('/q/same', 'two');
  expect(fs.readContentFromFile('/p/same')).toBe('one');
  expect(fs.readContentFromFile('/q/same')).toBe('two');
  expect(fs.ls('/')).toEqual(['p', 'q']);
});

test('many entries in one directory', () => {
  const fs = new FileSystem();
  const letters = (n: number) => { let s = ''; do { s = String.fromCharCode(97 + (n % 26)) + s; n = Math.floor(n / 26); } while (n > 0); return s; };
  const names = Array.from({length: 2000}, (_, i) => letters((i * 7919) % 2000));
  fs.mkdir('/big');
  for (const name of names) fs.addContentToFile(`/big/${name}`, name);
  fs.mkdir('/big/zzz');
  expect(fs.ls('/big')).toEqual([...names, 'zzz'].sort());
  expect(fs.readContentFromFile('/big/' + letters(1999))).toBe(letters(1999));
});
