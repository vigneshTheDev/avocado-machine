import {Worker} from 'node:worker_threads';
import {expect, test} from 'vitest';
import {climbStairs} from './solution';

const cases = [
  {
    "args": [
      1
    ],
    "expected": 1,
    "name": "baseline: [1]"
  },
  {
    "name": "two ways to climb two steps",
    "args": [
      2
    ],
    "expected": 2
  },
  {
    "name": "n = 3 (example)",
    "args": [
      3
    ],
    "expected": 3
  },
  {
    "name": "five steps follow recurrence",
    "args": [
      5
    ],
    "expected": 8
  },
  {
    "name": "n = 10",
    "args": [
      10
    ],
    "expected": 89
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(climbStairs(...(args as any))).toEqual(expected);
});

// Upper-bound cases (1 <= n <= 45). A linear-time solution finishes these in a
// few milliseconds; an exponential one (e.g. memoization that never shares its
// cache) needs minutes. A plain Vitest timeout cannot interrupt synchronous
// code, so these run solution.ts in a worker thread that is terminated after
// TIME_LIMIT_MS, making a slow solution fail fast instead of hanging the run.
// The worker loads solution.ts with Node's built-in TypeScript type stripping
// (the repo package is CommonJS, so the hooks below mark .ts files as ESM).
const TIME_LIMIT_MS = 1000;

const WORKER_SOURCE = `
const {parentPort, workerData} = require('node:worker_threads');
const {registerHooks} = require('node:module');
const {readFileSync, existsSync} = require('node:fs');
const {fileURLToPath} = require('node:url');
registerHooks({
    resolve(specifier, context, nextResolve) {
        if (specifier.startsWith('.') && !/\\.[cm]?[jt]s$/.test(specifier)) {
            const candidate = new URL(specifier + '.ts', context.parentURL);
            if (existsSync(fileURLToPath(candidate))) return {url: candidate.href, shortCircuit: true};
        }
        return nextResolve(specifier, context);
    },
    load(url, context, nextLoad) {
        if (url.startsWith('file:') && url.endsWith('.ts')) {
            return {format: 'module-typescript', source: readFileSync(fileURLToPath(url), 'utf8'), shortCircuit: true};
        }
        return nextLoad(url, context);
    },
});
import(workerData.url).then(({climbStairs}) => {
    parentPort.postMessage(workerData.ns.map((n) => climbStairs(n)));
});
`;

function climbStairsWithinTimeLimit(ns: number[]): Promise<number[]> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(
            WORKER_SOURCE,
            {eval: true, workerData: {url: new URL('./solution.ts', import.meta.url).href, ns}},
        );
        const timer = setTimeout(() => {
            void worker.terminate();
            reject(new Error(`climbStairs did not finish n = ${ns.length === 1 ? ns[0] : `${ns[0]}..${ns[ns.length - 1]}`} within ${TIME_LIMIT_MS} ms; expected O(n) time`));
        }, TIME_LIMIT_MS);
        worker.once('message', (results: number[]) => {
            clearTimeout(timer);
            void worker.terminate();
            resolve(results);
        });
        worker.once('error', (error) => {
            clearTimeout(timer);
            reject(error);
        });
    });
}

const upperBoundCases = [
  {
    "name": "n = 44",
    "args": [
      44
    ],
    "expected": 1134903170
  },
  {
    "name": "upper bound n = 45 runs in linear time",
    "args": [
      45
    ],
    "expected": 1836311903
  }
];

test.each(upperBoundCases)('$name', async ({args, expected}) => {
    const [result] = await climbStairsWithinTimeLimit(args);
    expect(result).toEqual(expected);
}, TIME_LIMIT_MS * 5);

test('every n in 3..45 satisfies f(n) = f(n-1) + f(n-2)', async () => {
    const ns = Array.from({length: 45}, (_, i) => i + 1);
    const results = await climbStairsWithinTimeLimit(ns);
    expect(results[0]).toBe(1);
    expect(results[1]).toBe(2);
    for (let n = 3; n <= 45; n++) {
        expect(results[n - 1], `n = ${n}`).toBe(results[n - 2] + results[n - 3]);
    }
}, TIME_LIMIT_MS * 5);
