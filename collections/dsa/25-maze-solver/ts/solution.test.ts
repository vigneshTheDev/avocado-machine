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
