import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {buildEditorInvocation, resolveEditor, detectDefaultEditor, launchEditor} from '../src/editor.mjs';

test('detectDefaultEditor returns an available system editor', () => {
  const editor = detectDefaultEditor();
  assert.equal(['nvim', 'vim', 'vi', 'nano'].includes(editor), true);
});

test('resolveEditor prioritizes override argument', () => {
  const editor = resolveEditor('custom-editor');
  assert.equal(editor, 'custom-editor');
});

test('resolveEditor prioritizes AVOCADO_EDITOR environment variable', () => {
  const prev = process.env.AVOCADO_EDITOR;
  try {
    process.env.AVOCADO_EDITOR = 'my-editor';
    assert.equal(resolveEditor(), 'my-editor');
  } finally {
    if (prev === undefined) delete process.env.AVOCADO_EDITOR;
    else process.env.AVOCADO_EDITOR = prev;
  }
});

test('buildEditorInvocation passes only solution file to vim', () => {
  const inv = buildEditorInvocation('vim', '/path/to/solution.ts');
  assert.equal(inv.command, 'vim');
  assert.deepEqual(inv.args, ['/path/to/solution.ts']);
});

test('buildEditorInvocation passes only solution file to nvim', () => {
  const inv = buildEditorInvocation('nvim', '/path/to/solution.ts');
  assert.equal(inv.command, 'nvim');
  assert.deepEqual(inv.args, ['/path/to/solution.ts']);
});

test('buildEditorInvocation appends --wait for code with only solution file', () => {
  const inv = buildEditorInvocation('code', '/path/to/solution.ts');
  assert.equal(inv.command, 'code');
  assert.deepEqual(inv.args, ['--wait', '/path/to/solution.ts']);
});

test('buildEditorInvocation preserves existing -w or --wait for code', () => {
  const inv = buildEditorInvocation('code -w', '/path/to/solution.ts');
  assert.equal(inv.command, 'code');
  assert.deepEqual(inv.args, ['-w', '/path/to/solution.ts']);
});

test('buildEditorInvocation appends --wait for zed with only solution file', () => {
  const inv = buildEditorInvocation('zed', '/path/to/solution.ts');
  assert.equal(inv.command, 'zed');
  assert.deepEqual(inv.args, ['--wait', '/path/to/solution.ts']);
});

test('launchEditor detects when file was not changed', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'avocado-test-'));
  const tsDir = path.join(tmpDir, 'ts');
  fs.mkdirSync(tsDir);
  const solutionFile = path.join(tsDir, 'solution.ts');
  fs.writeFileSync(solutionFile, 'initial content');

  const dummyProblem = {
    id: 1,
    dir: tmpDir,
    language: 'ts',
    variants: {ts: {runner: 'vitest', sm2: {}}}
  };

  // Run 'true' command (no-op, exits 0 without touching file)
  const res = launchEditor(dummyProblem, 'true');
  assert.equal(res.code, 0);
  assert.equal(res.changed, false);
  fs.rmSync(tmpDir, {recursive: true, force: true});
});

test('launchEditor detects when file was modified', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'avocado-test-'));
  const tsDir = path.join(tmpDir, 'ts');
  fs.mkdirSync(tsDir);
  const solutionFile = path.join(tsDir, 'solution.ts');
  fs.writeFileSync(solutionFile, 'initial content');

  const dummyProblem = {
    id: 1,
    dir: tmpDir,
    language: 'ts',
    variants: {ts: {runner: 'vitest', sm2: {}}}
  };

  const scriptFile = path.join(tmpDir, 'append.mjs');
  fs.writeFileSync(scriptFile, "import fs from 'node:fs'; fs.appendFileSync(process.argv[2], ' modified');\n");

  const res = launchEditor(dummyProblem, `${process.execPath} ${scriptFile}`);
  assert.equal(res.code, 0);
  assert.equal(res.changed, true);
  fs.rmSync(tmpDir, {recursive: true, force: true});
});
