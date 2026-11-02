import { expect, test } from "vitest";
import { numIslands } from "./solution";

const SIZE = 300;

function buildGrid(
  rows: number,
  cols: number,
  isLand: (i: number, j: number) => boolean,
): string[][] {
  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (isLand(i, j) ? "1" : "0")),
  );
}

// Even rows are fully land; each odd row has a single land cell that links
// the two even rows around it, alternating between the right and left edge.
// The result is one connected, one-cell-wide path snaking through every row.
function serpentine(rows: number, cols: number): string[][] {
  return buildGrid(rows, cols, (i, j) => {
    if (i % 2 === 0) return true;
    const connectorCol = Math.floor(i / 2) % 2 === 0 ? cols - 1 : 0;
    return j === connectorCol;
  });
}

const cases = [
  {
    args: [["1"]],
    expected: 1,
    name: 'baseline: [[["1"]]]',
  },
  {
    name: "diagonal contact does not join islands",
    args: [
      ["1", "0"],
      ["0", "1"],
    ],
    expected: 2,
  },
  {
    name: "all water has no islands",
    args: [
      ["0", "0"],
      ["0", "0"],
    ],
    expected: 0,
  },
  {
    name: "bigger surface",
    args: [
      ["0", "1", "1", "1", "0"],
      ["0", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    expected: 1,
  },
  {
    name: "single row with several islands",
    args: [["1", "0", "1", "1", "0", "1"]],
    expected: 3,
  },
  {
    name: "single column with several islands",
    args: [["1"], ["0"], ["1"], ["1"], ["0"], ["0"], ["1"]],
    expected: 3,
  },
  {
    name: "ring of land around a lake is one island",
    args: [
      ["1", "1", "1", "1", "1"],
      ["1", "0", "0", "0", "1"],
      ["1", "0", "0", "0", "1"],
      ["1", "1", "1", "1", "1"],
    ],
    expected: 1,
  },
  {
    name: "non-square grid with land touching every border",
    args: [
      ["1", "1", "0", "1"],
      ["0", "0", "0", "1"],
      ["1", "0", "1", "1"],
    ],
    expected: 3,
  },
  {
    name: `${SIZE}x${SIZE} all land is one island`,
    args: buildGrid(SIZE, SIZE, () => true),
    expected: 1,
  },
  {
    name: `${SIZE}x${SIZE} serpentine single island (deep one-cell-wide path)`,
    args: serpentine(SIZE, SIZE),
    expected: 1,
  },
  {
    name: `${SIZE}x${SIZE} checkerboard has many tiny islands`,
    args: buildGrid(SIZE, SIZE, (i, j) => (i + j) % 2 === 0),
    expected: (SIZE * SIZE) / 2,
  },
];

test.each(cases)("$name", ({ args, expected }: (typeof cases)[0]) => {
  expect(numIslands(args)).toEqual(expected);
});
