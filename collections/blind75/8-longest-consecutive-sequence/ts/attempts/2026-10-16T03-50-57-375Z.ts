export function longestConsecutive(nums: number[]): number {
  const numSet = new Set();
  for (let num of nums) numSet.add(num);

  let maxLength = 0;
  for (let num of nums) {
    if (numSet.has(num - 1)) continue;

    let len = 1;
    let curr = num;
    while (numSet.has(curr + 1)) {
      len++;
      curr++;
    }
    maxLength = Math.max(len, maxLength);
  }
  return maxLength;
}
