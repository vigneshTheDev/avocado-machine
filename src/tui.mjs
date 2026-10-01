import React, {useState} from 'react';
import {Box, Text, render, useApp, useInput, useWindowSize} from 'ink';
import fs from 'node:fs';
import path from 'node:path';
import {Marked} from 'marked';
import {markedTerminal} from 'marked-terminal';
import {collections, gradeProblem, isDue, localDate, problems, runTests, searchGroups, solutionPath, startProblem, status, suggestions, testCommand} from './core.mjs';
import {launchEditor, resolveEditor, saveConfig} from './editor.mjs';

const h = React.createElement;

export function renderMarkdownLines(content, maxLines, width = 80) {
  if (!content) return ['Select a problem to see its description.'];
  try {
    const m = new Marked().use(markedTerminal({
      width: Math.max(20, width),
      reflowText: true,
      showSectionPrefix: false
    }));
    const rendered = m.parse(content).trim();
    const lines = rendered.split('\n');
    return lines.slice(0, maxLines);
  } catch {
    return content.split('\n').slice(0, maxLines);
  }
}

function formatBadge(item, today) {
  if (item.sm2.lastGrade === null) {
    return {text: 'NEW', color: 'green'};
  }
  const due = item.sm2.dueDate && item.sm2.dueDate <= today;
  if (due) {
    return {text: item.sm2.lastGrade !== null ? `DUE·${item.sm2.lastGrade}` : 'DUE', color: 'yellow'};
  }
  const dateStr = item.sm2.dueDate?.slice(5) || 'sched';
  return {text: item.sm2.lastGrade !== null ? `${dateStr}·${item.sm2.lastGrade}` : dateStr, color: 'dim'};
}

function renderItemRow(item, isSelected, today, maxTitleWidth) {
  const badge = formatBadge(item, today);
  const cursor = isSelected ? '›' : ' ';
  const num = String(item.id).padStart(3, ' ');
  let title = item.title;
  if (title.length > maxTitleWidth) {
    title = title.slice(0, Math.max(1, maxTitleWidth - 1)) + '…';
  } else {
    title = title.padEnd(maxTitleWidth, ' ');
  }

  return h(Box, {
    key: `${item.collection}-${item.id}`,
    flexDirection: 'row',
    flexShrink: 0,
    backgroundColor: isSelected ? 'cyan' : undefined
  },
    h(Text, {color: isSelected ? 'black' : 'cyan', bold: isSelected, wrap: 'truncate-end'}, `${cursor} ${num} `),
    h(Text, {color: isSelected ? 'black' : undefined, dimColor: !isSelected, bold: isSelected, wrap: 'truncate-end'}, title),
    h(Box, {flexGrow: 1}),
    h(Text, {
      color: isSelected ? 'black' : badge.color === 'dim' ? undefined : badge.color,
      dimColor: !isSelected && badge.color === 'dim',
      bold: isSelected || badge.color !== 'dim',
      wrap: 'truncate-end'
    }, `[${badge.text}]`)
  );
}

function renderSectionHeader(title, count, color, paneWidth, key) {
  const label = count !== undefined ? ` ${title} (${count}) ` : ` ${title} `;
  return h(Text, {key: key ?? `sec-${title}`, bold: true, color, wrap: 'truncate-end'}, label.padEnd(paneWidth, '─'));
}

function renderPracticeList(groups, highlightedId, safeIndex, today, capacity, maxTitleWidth, paneWidth) {
  const activeSections = [
    {title: 'Due', items: groups.due, color: 'yellow'},
    {title: 'New', items: groups.fresh, color: 'green'},
    {title: 'Collection', items: groups.current, color: 'cyan'}
  ].filter(s => s.items.length > 0);

  if (!activeSections.length) return null;

  const totalLines = activeSections.reduce((acc, s) => acc + 1 + s.items.length, 0);
  if (totalLines <= capacity) {
    return activeSections.map(s => h(Box, {key: s.title, flexDirection: 'column'},
      renderSectionHeader(s.title, s.items.length, s.color, paneWidth),
      ...s.items.map(item => renderItemRow(item, item.id === highlightedId, today, maxTitleWidth))));
  }

  const allRows = activeSections.flatMap(s => s.items.map(item => ({...item, sectionTitle: s.title, sectionColor: s.color, sectionCount: s.items.length})));
  const windowSize = Math.max(1, capacity - 2);
  let start = Math.max(0, Math.min(safeIndex - Math.floor(windowSize / 2), Math.max(0, allRows.length - windowSize)));
  let end = Math.min(allRows.length, start + windowSize);

  function buildElements(s, e) {
    const res = [];
    if (s > 0) res.push(h(Text, {key: 'scroll-up', dimColor: true, wrap: 'truncate-end'}, `▲ ${s} more above`));
    let lastSection = null;
    for (let i = s; i < e; i++) {
      const item = allRows[i];
      if (item.sectionTitle !== lastSection) {
        lastSection = item.sectionTitle;
        res.push(renderSectionHeader(item.sectionTitle, item.sectionCount, item.sectionColor, paneWidth, `sec-${item.sectionTitle}`));
      }
      res.push(renderItemRow(item, item.id === highlightedId, today, maxTitleWidth));
    }
    if (e < allRows.length) res.push(h(Text, {key: 'scroll-down', dimColor: true, wrap: 'truncate-end'}, `▼ ${allRows.length - e} more below`));
    return res;
  }

  let elements = buildElements(start, end);
  while (elements.length > capacity && end - start > 1) {
    if (safeIndex - start < end - 1 - safeIndex) end--;
    else start++;
    elements = buildElements(start, end);
  }
  return elements;
}

export const practiceShortcuts = [
  ['↑↓', 'navigate'],
  ['Enter', 'path'],
  ['e', 'edit'],
  ['t', 'test'],
  ['a', 'reset attempt'],
  ['x', 'clear output'],
  ['s', 'search'],
  ['c', 'clear search'],
  ['/', 'command'],
  ['Esc', 'collections'],
  ['q', 'quit']
];

export const generalShortcuts = [
  ['↑↓', 'navigate'],
  ['Enter', 'select'],
  ['/', 'command'],
  ['q', 'quit']
];

export function calculateShortcutLines(items, availWidth) {
  if (!items.length) return 0;
  let lines = 1;
  let currentWidth = 0;
  for (let i = 0; i < items.length; i++) {
    const [key, label] = items[i];
    const itemLen = key.length + 3 + label.length + (i < items.length - 1 ? 2 : 0);
    if (currentWidth + itemLen > availWidth && currentWidth > 0) {
      lines++;
      currentWidth = itemLen;
    } else {
      currentWidth += itemLen;
    }
  }
  return lines;
}

function renderShortcuts(items) {
  return h(Box, {flexDirection: 'row', flexWrap: 'wrap'},
    ...items.map(([key, label], i) => h(Text, {key: `${key}-${label}`},
      h(Text, {bold: true, color: 'cyan'}, `[${key}]`),
      h(Text, {dimColor: true}, ` ${label}${i < items.length - 1 ? '  ' : ''}`)
    ))
  );
}

function renderCollectionRow(name, isSelected) {
  return h(Box, {
    key: name,
    flexDirection: 'row',
    flexShrink: 0,
    backgroundColor: isSelected ? 'cyan' : undefined
  },
    h(Text, {color: isSelected ? 'black' : 'cyan', bold: true, wrap: 'truncate-end'}, `${isSelected ? '›' : ' '} `),
    h(Text, {color: isSelected ? 'black' : undefined, bold: isSelected, wrap: 'truncate-end'}, name)
  );
}

function renderCollectionsList(names, selectedIndex, capacity) {
  if (!names.length) {
    return [h(Text, {key: 'empty'}, 'No collections yet. Use avocado add <collection> "Title".')];
  }
  const totalNeeded = 1 + names.length;
  if (totalNeeded <= capacity) {
    return [
      h(Text, {key: 'title', bold: true, color: 'cyan', wrap: 'truncate-end'}, 'Collections'),
      ...names.map((name, index) => renderCollectionRow(name, index === selectedIndex))
    ];
  }
  const windowSize = Math.max(1, capacity - 3);
  const start = Math.max(0, Math.min(selectedIndex - Math.floor(windowSize / 2), Math.max(0, names.length - windowSize)));
  const end = Math.min(names.length, start + windowSize);
  const elements = [h(Text, {key: 'title', bold: true, color: 'cyan', wrap: 'truncate-end'}, 'Collections')];
  if (start > 0) elements.push(h(Text, {key: 'scroll-up', dimColor: true, wrap: 'truncate-end'}, `▲ ${start} more above`));
  for (let i = start; i < end; i++) {
    elements.push(renderCollectionRow(names[i], i === selectedIndex));
  }
  if (end < names.length) elements.push(h(Text, {key: 'scroll-down', dimColor: true, wrap: 'truncate-end'}, `▼ ${names.length - end} more below`));
  return elements;
}

function App({initialCollection, initialCount, initialMode = 'practice'}) {
  const {exit} = useApp();
  const {columns: termColumns = 80, rows: termRows = 24} = useWindowSize();
  const [screen, setScreen] = useState(initialCollection ? 'practice' : 'home');
  const [collection, setCollection] = useState(initialCollection ?? null);
  const [count, setCount] = useState(initialCount);
  const [practiceMode, setPracticeMode] = useState(initialMode);
  const [items, setItems] = useState(initialCollection ? problems(initialCollection) : []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState(null);
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const today = localDate();
  const eligible = practiceMode === 'new' ? items.filter(item => item.sm2.lastGrade === null) : practiceMode === 'review' ? items.filter(item => isDue(item, today)) : items;
  const selected = screen === 'practice' ? suggestions(eligible, count, today, practiceMode) : {due: [], fresh: []};
  const groups = screen === 'practice' ? searchGroups(eligible, selected, query, today) : {due: [], fresh: [], current: []};
  const rows = [...groups.due, ...groups.fresh, ...groups.current];
  const safeIndex = Math.min(selectedIndex, Math.max(0, rows.length - 1));
  const highlighted = rows[safeIndex];
  const names = collections();

  function openPractice(name, limit, kind = practiceMode) {
    const loaded = problems(name);
    setCollection(name);
    setCount(limit);
    setPracticeMode(kind);
    setItems(loaded);
    setSelectedIndex(0);
    setQuery('');
    setTestResult(null);
    setScreen('practice');
    setMessage(`Opened ${name}`);
  }

  function executeCommand(command) {
    const parts = command.trim().split(/\s+/);
    const verb = parts[0]?.toLowerCase();
    try {
      if (['/practice', '/new', '/review'].includes(verb)) {
        const kind = verb.slice(1);
        if (parts.length === 1) {
          setPracticeMode(kind);
          setScreen('collections');
          setSelectedIndex(0);
          setMessage('Choose a collection');
        } else if (parts.length <= 3) {
          const limit = parts[2] === undefined ? undefined : Number(parts[2]);
          if (parts[2] !== undefined && (!Number.isSafeInteger(limit) || limit < 1)) throw new Error('Count must be a positive integer');
          openPractice(parts[1], limit, kind);
        } else throw new Error(`Usage: ${verb} [collection] [count]`);
      } else if (verb === '/done') {
        if (!collection || parts.length !== 3) throw new Error('Usage: /done <number> <grade> from a collection');
        const id = Number(parts[1]);
        const grade = Number(parts[2]);
        if (!Number.isSafeInteger(id) || !items.some(item => item.id === id)) throw new Error('Choose a valid problem number in this collection');
        const updated = gradeProblem(collection, id, grade);
        setItems(problems(collection));
        setMessage(`#${id} graded ${grade}; next review ${updated.sm2.dueDate}`);
      } else if (verb === '/editor') {
        if (parts.length === 1) {
          setMessage(`Current editor: ${resolveEditor()}`);
        } else {
          const newEditor = parts.slice(1).join(' ');
          saveConfig({editor: newEditor});
          setMessage(`Editor set to ${newEditor}`);
        }
      } else if (verb === '/help') {
        setMessage('/practice, /new, /review [collection] [count] · /done <number> <grade> · /editor [cmd] · /quit');
      } else if (verb === '/quit') exit();
      else throw new Error(`Unknown command: ${verb || command}`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function selectHighlighted() {
    if (screen === 'collections') {
      const name = names[Math.min(selectedIndex, names.length - 1)];
      if (name) openPractice(name);
      return;
    }
    if (screen === 'home') {
      setScreen('collections');
      setSelectedIndex(0);
      return;
    }
    if (!highlighted) return;
    setMessage(`#${highlighted.id} solution: ${path.relative(process.cwd(), solutionPath(highlighted))}`);
  }

  function archiveAndResetHighlighted() {
    if (!highlighted) return;
    try {
      const result = startProblem(collection, highlighted.id);
      setMessage(`#${highlighted.id} new attempt: ${path.relative(process.cwd(), result.solution)}${result.archive ? ` · archived ${path.relative(process.cwd(), result.archive)}` : ' · no changed solution to archive'}`);
      setTestResult(null);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function editHighlighted() {
    if (!highlighted || testing) return;
    const problem = highlighted;
    const editorName = resolveEditor();
    setMessage(`Opening #${problem.id} in ${editorName}…`);
    const {code, changed} = launchEditor(problem);
    if (code !== 0) {
      setMessage(`Editor exited with code ${code}`);
      return;
    }
    if (!changed) {
      setMessage(`#${problem.id} closed without changes`);
      return;
    }
    setMessage(`Saved #${problem.id} · running tests…`);
    testHighlighted();
  }

  function testHighlighted() {
    if (!highlighted) return;
    const problem = highlighted;
    setTesting(true);
    setTestResult(null);
    setMessage(`Running tests for #${problem.id}…`);
    runTests(problem).then(result => {
      setTesting(false);
      setTestResult(result);
      setMessage(`Tests for #${problem.id} ${result.code === 0 ? 'passed' : 'failed'}`);
    }).catch(error => {
      setTesting(false);
      setMessage(`Test runner failed: ${error.message}`);
    });
  }

  useInput((input, key) => {
    if (mode) {
      if (key.escape) {
        setMode(null);
        setDraft('');
        return;
      }
      if (key.return) {
        if (mode === 'command') executeCommand(draft);
        else setQuery(draft);
        setMode(null);
        setDraft('');
        setSelectedIndex(0);
        return;
      }
      if (key.backspace || key.delete) {
        const next = draft.slice(0, -1);
        setDraft(next);
        if (mode === 'search') { setQuery(next); setSelectedIndex(0); }
        return;
      }
      if (input && !key.ctrl && !key.meta && !key.upArrow && !key.downArrow) {
        const next = draft + input;
        setDraft(next);
        if (mode === 'search') { setQuery(next); setSelectedIndex(0); }
      }
      return;
    }
    if (input.startsWith('/')) { setMode('command'); setDraft(input); return; }
    if (input === 's' && screen === 'practice') { setMode('search'); setDraft(query); return; }
    if (input === 'c' && screen === 'practice') { setQuery(''); setSelectedIndex(0); return; }
    if ((input === 'e' || input === 'v') && screen === 'practice' && !testing) { editHighlighted(); return; }
    if (input === 't' && screen === 'practice' && !testing) { testHighlighted(); return; }
    if (input === 'a' && screen === 'practice' && !testing) { archiveAndResetHighlighted(); return; }
    if (input === 'x' && screen === 'practice') { setTestResult(null); setMessage(''); return; }
    if (input === 'q') { exit(); return; }
    if (key.upArrow || input === 'k') setSelectedIndex(index => Math.max(0, index - 1));
    else if (key.downArrow || input === 'j') setSelectedIndex(index => Math.min((screen === 'collections' ? names.length : rows.length) - 1, index + 1));
    else if (key.return) selectHighlighted();
    else if (key.escape && screen === 'practice') { setScreen('collections'); setSelectedIndex(0); setQuery(''); }
  });

  if (termColumns < 60 || termRows < 15) {
    return h(Box, {flexDirection: 'column', width: termColumns, height: termRows, justifyContent: 'center', alignItems: 'center'},
      h(Text, {color: 'yellow', bold: true}, 'Terminal too small'),
      h(Text, {dimColor: true}, `Current: ${termColumns}x${termRows} · Minimum: 60x15`),
      h(Text, {dimColor: true}, 'Please enlarge your terminal window (or press q to exit)'));
  }

  const output = testResult?.output;
  const testBoxHeight = output ? Math.min(Math.max(4, Math.floor(termRows * 0.28)), 10) : 0;
  const activeShortcuts = screen === 'practice' ? practiceShortcuts : generalShortcuts;
  const availWidth = Math.max(10, termColumns - 2);
  const shortcutLines = calculateShortcutLines(activeShortcuts, availWidth);
  const messageLines = message ? 1 : 0;
  const footerHeight = (mode ? 1 : shortcutLines) + messageLines;
  const bodyHeight = Math.max(4, termRows - 2 - testBoxHeight - footerHeight);
  const innerCapacity = Math.max(2, bodyHeight - 2);
  const leftPaneWidth = Math.min(42, Math.max(30, Math.floor((termColumns - 3) * 0.35)));
  const rightPaneWidth = Math.max(20, (termColumns - 2) - leftPaneWidth - 1);
  const paneInnerWidth = leftPaneWidth - 4;
  const rightPaneInnerWidth = rightPaneWidth - 4;
  const maxTitleWidth = Math.max(8, paneInnerWidth - 16);
  const descLines = Math.max(1, bodyHeight - 6);
  const rawDesc = highlighted && fs.existsSync(path.join(highlighted.dir, 'description.md'))
    ? fs.readFileSync(path.join(highlighted.dir, 'description.md'), 'utf8').trim()
    : '';
  const previewLines = renderMarkdownLines(rawDesc, descLines, rightPaneInnerWidth);

  const listLabel = practiceMode === 'practice'
    ? count === undefined ? '3 due + 3 new' : `${count} suggestions`
    : `${count ?? 3} ${practiceMode === 'new' ? `new problem${count === 1 ? '' : 's'}` : `due review${count === 1 ? '' : 's'}`}`;

  return h(Box, {flexDirection: 'column', width: termColumns, height: termRows, paddingX: 1},
    h(Box, {height: 2, flexDirection: 'column'},
      h(Text, {bold: true, color: 'green'}, '🥑 AVOCADO MACHINE  ·  local code kata practice'),
      h(Text, {dimColor: true}, screen === 'practice' ? `${collection}  ·  TypeScript (ts)  ·  ${listLabel}  ·  ${items.length} problems` : screen === 'collections' ? 'Practice collections' : 'Home')),
    screen === 'home' ? h(Box, {flexDirection: 'column', height: bodyHeight, borderStyle: 'round', borderColor: 'green', paddingX: 1, paddingY: 1},
      h(Text, {bold: true, color: 'green'}, 'Welcome to Avocado Machine'),
      h(Text, null, ''),
      h(Text, null, '• Press Enter or type /practice to choose a collection.'),
      h(Text, null, '• Type /practice dsa 15 to open a list directly.'),
      h(Text, null, '• Use /new dsa or /review dsa for one category.'),
      h(Text, null, ''),
      h(Text, {dimColor: true}, `${names.length} collection${names.length === 1 ? '' : 's'} available`)) : null,
    screen === 'collections' ? h(Box, {flexDirection: 'column', height: bodyHeight, borderStyle: 'round', borderColor: 'cyan', paddingX: 1},
      ...renderCollectionsList(names, selectedIndex, innerCapacity)) : null,
    screen === 'practice' ? h(Box, {flexDirection: 'row', gap: 1, height: bodyHeight},
      h(Box, {flexDirection: 'column', width: leftPaneWidth, flexShrink: 0, height: bodyHeight, borderStyle: 'round', borderColor: 'green', paddingX: 1},
        renderPracticeList(groups, highlighted?.id, safeIndex, today, innerCapacity, maxTitleWidth, paneInnerWidth),
        rows.length === 0 ? h(Text, {dimColor: true}, query ? 'No matching problems' : 'No problems to practice') : null),
      h(Box, {flexDirection: 'column', width: rightPaneWidth, flexShrink: 0, height: bodyHeight, borderStyle: 'round', borderColor: 'cyan', paddingX: 1},
        h(Text, {bold: true, color: 'cyan', wrap: 'truncate-end'}, highlighted ? `#${highlighted.id} ${highlighted.title}` : 'Preview'),
        highlighted ? h(Text, {dimColor: true, wrap: 'truncate-end'}, `${status(highlighted, today)} · last grade ${highlighted.sm2.lastGrade ?? '—'}`) : null,
        h(Box, {flexGrow: 1, flexDirection: 'column'},
          ...previewLines.map((line, idx) => h(Text, {key: idx, wrap: 'truncate-end'}, line))),
        highlighted ? h(Text, {color: 'blue', wrap: 'truncate-end'}, testCommand(highlighted)) : null,
        highlighted ? h(Text, {color: 'green', wrap: 'truncate-end'}, path.relative(process.cwd(), solutionPath(highlighted))) : null)) : null,
    output ? h(Box, {flexDirection: 'column', height: testBoxHeight, borderStyle: 'round', borderColor: testResult.code === 0 ? 'green' : 'red', paddingX: 1},
      h(Text, {bold: true}, `Test output · exit ${testResult.code} · press x to clear`),
      h(Text, null, output.split('\n').slice(-Math.max(1, testBoxHeight - 3)).join('\n'))) : null,
    h(Box, {height: footerHeight, flexDirection: 'column'},
      message ? h(Text, {color: 'yellow', wrap: 'truncate-end'}, message) : null,
      mode === 'command'
        ? h(Box, {flexDirection: 'row'},
            h(Text, {bold: true, color: 'yellow', wrap: 'truncate-end'}, 'Command: '),
            h(Text, {wrap: 'truncate-end'}, draft),
            h(Text, {dimColor: true}, '  ·  '),
            h(Text, {bold: true, color: 'cyan'}, '[Enter]'),
            h(Text, {dimColor: true}, ' execute  '),
            h(Text, {bold: true, color: 'cyan'}, '[Esc]'),
            h(Text, {dimColor: true}, ' cancel'))
        : mode === 'search'
        ? h(Box, {flexDirection: 'row'},
            h(Text, {bold: true, color: 'yellow', wrap: 'truncate-end'}, 'Search: '),
            h(Text, {wrap: 'truncate-end'}, draft),
            h(Text, {dimColor: true}, '  ·  '),
            h(Text, {bold: true, color: 'cyan'}, '[Enter]'),
            h(Text, {dimColor: true}, ' apply  '),
            h(Text, {bold: true, color: 'cyan'}, '[Esc]'),
            h(Text, {dimColor: true}, ' cancel'))
        : renderShortcuts(activeShortcuts)));
}

export function startTui(options = {}) {
  const instance = render(h(App, options), {alternateScreen: true});
  return instance.waitUntilExit();
}

