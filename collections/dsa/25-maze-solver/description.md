# Maze Solver

Implement `solve(maze, wall, start, end)`. The maze is a rectangular array of strings; wall is one character. Coordinates are `{ x, y }` (column, row); all other characters are walkable.

Return a path of orthogonally adjacent walkable cells from start to end, including both endpoints, with no repeated cells. Any valid path is accepted; a shortest path is not required. Return [] for no route, an empty maze, a blocked endpoint, or an endpoint outside the grid. If start equals an open end, return [start]. Do not modify the maze or endpoints.

Use depth-first search with a visited set to avoid cycles. Run in O(rows × columns) time and space.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `MazeSolver`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
