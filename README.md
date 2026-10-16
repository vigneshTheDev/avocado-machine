# Avocado Machine

A repository-local coding practice library with SM-2 review scheduling and an Ink terminal interface.

## Setup

Use Node.js 24 (see `.nvmrc`), then run:

```sh
npm install
npm link
```

Run the commands from this repository. `npm link` makes the `avocado` command available in your shell.

## Start fresh after forking

The repository includes the original learner's review history, solutions, and saved attempts. To see what a reset would affect, run:

```sh
avocado reset
```

Then reset every problem and language variant:

```sh
avocado reset --yes
```

This clears all SM-2 review history, replaces each `solution.ts` with its `solution.template.ts`, and deletes the files in `attempts/`. Problems shared across collections are reset once. Descriptions, tests, templates, and collection entries remain available. The changes are local to your fork; commit them if you want your fork to start from this clean state.

## Practice

```sh
avocado                  # Open the TUI
avocado practice         # Open the collection picker
avocado practice dsa     # Show 3 due reviews and 3 new problems
avocado practice dsa 15  # Show 15 problems, due first
avocado new dsa          # Show up to 3 new problems
avocado review dsa       # Show up to 3 due reviews
avocado new dsa 15       # Show up to 15 new problems
avocado review dsa 15    # Show up to 15 due reviews
```

Within the TUI, use `/practice`, `/new`, or `/review` to choose a collection, or add a collection and optional count, such as `/new dsa 15`. Use `/done 1 5` to grade a problem. The equivalent shell command is `avocado done dsa 1 5`. A grade is an integer from 0 (complete blackout) to 5 (easy recall). Grading is manual and is the only action that changes scheduling metadata. Grades belong to a language variant; the current runner and commands use TypeScript (`ts`).

Use the arrow keys to highlight a problem. Press Enter to show its solution path, or `t` to run its tests immediately. To start a fresh attempt, press `a`: this explicitly saves a changed `ts/solution.ts` under `ts/attempts/` and copies `ts/solution.template.ts` into `ts/solution.ts`. An unchanged starter needs no archive. Press `x` to clear the test output. Press `s` to search the whole collection, including problems outside the initial suggestions; those extra matches appear under **In current collection**. Press `c` to clear search, `/` for commands, and `q` to quit.

`collections/dsa` contains 30 exercises: the existing LFU Cache and Min Heap, plus 28 adapted from [kata-machine](https://github.com/ThePrimeagen/kata-machine). The additions have blank TypeScript starters, focused tests, fresh review schedules, and links to the algorithms course. See the [DSA inventory](collections/dsa/README.md) for problem numbers and source names.

`collections/blind75` contains the 75 problems in NeetCode Blind 75 order. Each has a local description, a TypeScript starter, and focused tests for distinct edge cases. The 47 problems marked solved in the linked NeetCode account were imported with grade 5 on September 27, 2026, and initially scheduled for review on September 28.

`collections/grind75` contains the [Grind 75](https://www.techinterviewhandbook.org/grind75/?weeks=8&hours=8&grouping=none) selection for 8 weeks at 8 hours per week. Its 75 entries are numbered by topic, with titles such as `Array: Two Sum (Easy)`. Forty entries reference Blind 75 problems, so their solution files and review schedules are shared. The other 35 have their own descriptions, TypeScript starters, and tests.

`collections/grindall` contains all 169 questions shown by [Grind 75 at 4 weeks and 40 hours per week](https://www.techinterviewhandbook.org/grind75/?hours=40&weeks=4&grouping=topics). Its numbers follow the site's topic-grouped order, and titles include topic and difficulty. It directly references the original exercise for 105 questions already in Blind 75 or Grind 75; the other 64 have local practice files.

Language files live under short, lowercase language folders: `ts/` today, with `py/` and `go/` reserved for future runners. A collection entry has its own number and display title; referenced entries use the underlying problem's description and language files. Each language folder holds its own starter, solution, tests, and attempt archive. The underlying problem's `metadata.json` keeps a separate review schedule for each language. Python and Go execution are not implemented yet.

Reviews due today or earlier remain eligible. The default practice view shows the three oldest due reviews and three new problems, filling empty slots from the other category. A numeric count shows that many problems total, taking due reviews first. The `new` and `review` views show up to three problems from their category by default; their optional count applies only to that category. Search in those views stays within the selected category. SM-2 uses 1-day and 6-day initial intervals, then ease-based intervals; weak grades restart at tomorrow with no same-day retry.

## Add a problem

```sh
avocado add dsa "Binary Search"
```

This assigns the next permanent number in `dsa` and creates `description.md`, `metadata.json`, and a `ts/` directory containing a pending `solution.test.ts`, `solution.template.ts`, and `solution.ts`. The current runner is TypeScript/Vitest. Complete the description, tests, and template to make the problem useful. Each language variant has its own review schedule and attempt archive.

Run the framework checks with `node --test tests/*.test.mjs`. `npm test` also runs every exercise test; fresh starters intentionally fail those tests until you solve them. To test one problem from the shell, run the command shown in its TUI preview, for example:

```sh
npx vitest run collections/dsa/1-lfu-cache/ts/solution.test.ts
```
