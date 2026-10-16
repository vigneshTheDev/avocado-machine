# Graph Breadth First Search (Adjacency Matrix)

Implement `bfs(graph, source, needle)` using breadth-first search and return a path with the fewest edges. The graph is a square weighted adjacency matrix; zero means no edge and positive numbers denote edges. Scan each row in increasing vertex index order.

Vertices are array indices. Inputs contain at least one vertex and valid endpoint indices. Respect edge direction. Return the vertex path including both endpoints, [source] if source equals needle, or null if unreachable. Handle cycles and self-loops without revisiting vertices or modifying the graph. When multiple paths qualify, neighbor order determines which is returned.

Use O(V²) time and O(V) auxiliary space plus the result.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `BFSGraphMatrix`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
