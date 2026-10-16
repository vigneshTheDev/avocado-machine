export function longestConsecutive(nums: number[]): number {
  const map: Record<number, number> = {};
  let maxLen = 0;
  for (let num of nums) {
    if (map[num] != null) continue;

    const pre = map[num - 1];
    const post = map[num + 1];
    map[num] = 1;
    if (pre != null) {
      map[num] += pre;
    }
    if (post != null) {
      map[num] += post;
    }
    if (pre != null) map[num - pre] = map[num];
    if (post != null) map[num + post] = map[num];
    maxLen = Math.max(maxLen, map[num]);
  }
  return maxLen;
}
