import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {solutionPath} from './core.mjs';

export function getConfigPath() {
  return path.join(os.homedir(), '.config', 'avocado', 'config.json');
}

export function loadConfig() {
  try {
    const file = getConfigPath();
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch {
    // Ignore corrupt or unreadable config
  }
  return {};
}

export function saveConfig(updates) {
  try {
    const file = getConfigPath();
    const dir = path.dirname(file);
    fs.mkdirSync(dir, {recursive: true});
    const current = loadConfig();
    const merged = {...current, ...updates};
    fs.writeFileSync(file, JSON.stringify(merged, null, 2) + '\n');
    return merged;
  } catch {
    return null;
  }
}

export function isBinaryAvailable(name) {
  try {
    const res = spawnSync('which', [name], {stdio: 'ignore'});
    return res.status === 0;
  } catch {
    return false;
  }
}

export function detectDefaultEditor() {
  const candidates = ['nvim', 'vim', 'vi', 'nano'];
  for (const name of candidates) {
    if (isBinaryAvailable(name)) return name;
  }
  return 'vi';
}

export function resolveEditor(override) {
  if (override && override.trim()) return override.trim();
  if (process.env.AVOCADO_EDITOR && process.env.AVOCADO_EDITOR.trim()) {
    return process.env.AVOCADO_EDITOR.trim();
  }
  const config = loadConfig();
  if (config.editor && config.editor.trim()) {
    return config.editor.trim();
  }
  if (process.env.VISUAL && process.env.VISUAL.trim()) {
    return process.env.VISUAL.trim();
  }
  if (process.env.EDITOR && process.env.EDITOR.trim()) {
    return process.env.EDITOR.trim();
  }
  return detectDefaultEditor();
}

export function buildEditorInvocation(editorCmd, solutionFile) {
  const parts = editorCmd.trim().split(/\s+/);
  const bin = parts[0];
  const userArgs = parts.slice(1);
  const baseBin = path.basename(bin).toLowerCase();

  // VS Code: open solution file, wait for close
  if (baseBin === 'code' || baseBin === 'code-insiders') {
    const args = [...userArgs];
    if (!args.includes('-w') && !args.includes('--wait')) args.push('--wait');
    args.push(solutionFile);
    return {command: bin, args};
  }

  // Zed editor: open solution file, wait for close
  if (baseBin === 'zed') {
    const args = [...userArgs];
    if (!args.includes('-w') && !args.includes('--wait')) args.push('--wait');
    args.push(solutionFile);
    return {command: bin, args};
  }

  // Vim / Neovim / Vi / generic editor: open solution file directly
  return {command: bin, args: [...userArgs, solutionFile]};
}

export function launchEditor(problem, editorOverride) {
  const target = solutionPath(problem);
  const editorCmd = resolveEditor(editorOverride);
  const {command, args} = buildEditorInvocation(editorCmd, target);

  const beforeContent = fs.existsSync(target) ? fs.readFileSync(target) : null;

  const isTTY = Boolean(process.stdin.isTTY);
  const wasRaw = Boolean(process.stdin.isRaw);
  if (isTTY) {
    process.stdin.setRawMode(false);
    process.stdin.pause();
  }

  let code = 0;
  try {
    const res = spawnSync(command, args, {stdio: isTTY ? 'inherit' : 'pipe', env: process.env});
    code = res.status ?? 0;
  } catch (err) {
    code = 1;
  } finally {
    if (isTTY) {
      process.stdin.resume();
      process.stdin.setRawMode(wasRaw);
      process.stdout.write('\x1b[2J\x1b[H');
    }
  }

  const afterContent = fs.existsSync(target) ? fs.readFileSync(target) : null;
  const changed = beforeContent === null || afterContent === null
    ? beforeContent !== afterContent
    : !beforeContent.equals(afterContent);

  return {code, editor: editorCmd, solution: target, changed};
}
