export function climbStairs(n: number): number {
  return dfs(n);
}

function dfs(n: number, cache: Record<number, number> = {}): number {
  if (n < 1) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;

  if (cache[n] != null) return cache[n];

  cache[n] = dfs(n - 1) + dfs(n - 2);
  return cache[n];
}
