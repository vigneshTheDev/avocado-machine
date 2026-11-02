import type { Point } from "./types";
import { test, expect } from "vitest";
import maze_solver from "./solution";

test("maze solver", function () {
    const maze = [
        "xxxxxxxxxx x",
        "x        x x",
        "x        x x",
        "x xxxxxxxx x",
        "x          x",
        "x xxxxxxxxxx",
    ];

    const mazeResult = [
        { x: 10, y: 0 },
        { x: 10, y: 1 },
        { x: 10, y: 2 },
        { x: 10, y: 3 },
        { x: 10, y: 4 },
        { x: 9, y: 4 },
        { x: 8, y: 4 },
        { x: 7, y: 4 },
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },
        { x: 1, y: 5 },
    ];
    const result = maze_solver(maze, "x", { x: 10, y: 0 }, { x: 1, y: 5 });
    expect(drawPath(maze, result)).toEqual(drawPath(maze, mazeResult));
});

function drawPath(data: string[], path: Point[]) {
    const data2 = data.map((row) => row.split(''));
    path.forEach((p) => {
        if (data2[p.y] && data2[p.y][p.x]) {
            data2[p.y][p.x] = '*';
        }
    });
    return data2.map(d => d.join(''));
}

function expectPath(maze: string[], start: Point, end: Point) {
  const before = [...maze];
  const path = maze_solver(maze, "#", start, end);
  expect(path[0]).toEqual(start);
  expect(path.at(-1)).toEqual(end);
  const seen = new Set<string>();
  path.forEach((point, i) => {
    expect(point.x).toBeGreaterThanOrEqual(0);
    expect(point.y).toBeGreaterThanOrEqual(0);
    expect(point.y).toBeLessThan(maze.length);
    expect(point.x).toBeLessThan(maze[0].length);
    expect(maze[point.y][point.x]).not.toBe("#");
    const key = `${point.x},${point.y}`;
    expect(seen.has(key)).toBe(false);
    seen.add(key);
    if (i) expect(Math.abs(point.x - path[i - 1].x) + Math.abs(point.y - path[i - 1].y)).toBe(1);
  });
  expect(maze).toEqual(before);
}

test("valid ordered paths in cyclic mazes and nonmutation", () => {
  expectPath(["   ", " # ", "   "], {x: 0, y: 0}, {x: 2, y: 2});
  expectPath([" "], {x: 0, y: 0}, {x: 0, y: 0});
  expectPath(["   "], {x: 2, y: 0}, {x: 0, y: 0});
});

test("empty, unreachable, blocked, and outside endpoints", () => {
  const p = {x: 0, y: 0};
  expect(maze_solver([], "#", p, p)).toEqual([]);
  expect(maze_solver([""], "#", p, p)).toEqual([]);
  expect(maze_solver(["#"], "#", p, p)).toEqual([]);
  expect(maze_solver([" # "], "#", p, {x: 2, y: 0})).toEqual([]);
  expect(maze_solver([" #"], "#", p, {x: 1, y: 0})).toEqual([]);
  for (const outside of [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}]) {
    expect(maze_solver([" "], "#", outside, p)).toEqual([]);
    expect(maze_solver([" "], "#", p, outside)).toEqual([]);
  }
});

// Validates any accepted path for an arbitrary wall character. The maze and
// endpoints are frozen, so attempts to modify them throw.
function expectValidPath(maze: string[], wall: string, start: Point, end: Point) {
  const frozenMaze = Object.freeze([...maze]);
  const path = maze_solver(frozenMaze as string[], wall, Object.freeze({ ...start }), Object.freeze({ ...end }));
  expect(path[0]).toEqual(start);
  expect(path.at(-1)).toEqual(end);
  const seen = new Set<string>();
  path.forEach((point, i) => {
    expect(maze[point.y]?.[point.x], `cell ${point.x},${point.y}`).toBeDefined();
    expect(maze[point.y][point.x]).not.toBe(wall);
    const key = `${point.x},${point.y}`;
    expect(seen.has(key), `repeated cell ${key}`).toBe(false);
    seen.add(key);
    if (i) expect(Math.abs(point.x - path[i - 1].x) + Math.abs(point.y - path[i - 1].y)).toBe(1);
  });
  return path;
}

// A plus-shaped maze: four arms leave the center and each ends in a short
// spur. Only the `exit` arm leads to the end, so whichever direction a DFS
// tries first, most variants force it to back out of dead ends.
function plusMaze(exit: "up" | "down" | "left" | "right") {
  const grid = Array.from({ length: 13 }, () => Array.from({ length: 13 }, () => "#"));
  const c = 6;
  const dirs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] } as const;
  let end: Point = { x: c, y: c };
  grid[c][c] = " ";
  for (const [name, [dx, dy]] of Object.entries(dirs)) {
    for (let step = 1; step <= 4; step++) grid[c + dy * step][c + dx * step] = " ";
    // Spur turning off the tip of the arm.
    const tipX = c + dx * 4, tipY = c + dy * 4;
    for (let step = 1; step <= 2; step++) grid[tipY + dx * step][tipX + dy * step] = " ";
    if (name === exit) end = { x: tipX + dy * 2, y: tipY + dx * 2 };
  }
  return { maze: grid.map((row) => row.join("")), start: { x: c, y: c }, end };
}

test.each(["up", "down", "left", "right"] as const)("backtracks out of dead ends when the exit is %s", (exit) => {
  const { maze, start, end } = plusMaze(exit);
  const path = expectValidPath(maze, "#", start, end);
  // The plus maze is a tree, so the only valid path is the shortest one: 4 + 2 moves.
  expect(path).toHaveLength(7);
});

test("backtracks through a comb of dead-end corridors", () => {
  const maze = [
    "S #   #   #   ",
    " ## # # # # # ",
    " #  # # # # # ",
    " # ## # # # # ",
    "   #    #   #E",
  ];
  expectValidPath(maze, "#", { x: 0, y: 0 }, { x: 13, y: 4 });
  expectValidPath(maze, "#", { x: 13, y: 4 }, { x: 0, y: 0 });
});

test("finds a path across an open 30x30 grid full of cycles", () => {
  const maze = Array.from({ length: 30 }, () => " ".repeat(30));
  expectValidPath(maze, "#", { x: 0, y: 0 }, { x: 29, y: 29 });
  expectValidPath(maze, "#", { x: 29, y: 0 }, { x: 0, y: 29 });
  expectValidPath(maze, "#", { x: 15, y: 15 }, { x: 15, y: 16 });
});

test("follows a long spiral corridor", () => {
  const maze = [
    "           ",
    "########## ",
    "         # ",
    " ####### # ",
    " #     # # ",
    " # ### # # ",
    " # #E  # # ",
    " # ##### # ",
    " #       # ",
    " ######### ",
    "           ",
  ];
  const path = expectValidPath(maze, "#", { x: 0, y: 0 }, { x: 4, y: 6 });
  expect(path.length).toBeGreaterThan(50);
});

test("uses the given wall character and treats other characters as open", () => {
  const maze = [
    "#x...",
    "#x.x.",
    "##.x#",
  ];
  expectValidPath(maze, "x", { x: 0, y: 0 }, { x: 4, y: 2 });
  expect(maze_solver(maze, "x", { x: 0, y: 0 }, { x: 1, y: 0 })).toEqual([]);
});

test("returns [] when the end is sealed off inside a larger maze with cycles", () => {
  const maze = [
    "      ",
    " #### ",
    " #  # ",
    " #### ",
    "      ",
  ];
  expect(maze_solver(maze, "#", { x: 0, y: 0 }, { x: 2, y: 2 })).toEqual([]);
  expect(maze_solver(maze, "#", { x: 3, y: 2 }, { x: 5, y: 4 })).toEqual([]);
  expect(maze_solver(maze, "#", { x: 2, y: 2 }, { x: 3, y: 2 })).toEqual([{ x: 2, y: 2 }, { x: 3, y: 2 }]);
  expect(maze_solver(maze, "#", { x: 5, y: 4 }, { x: 5, y: 4 })).toEqual([{ x: 5, y: 4 }]);
});
