export function twoSum(nums: number[], target: number): number[] {
  const visited = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const complement = target - n;
    if (visited.has(complement)) return [visited.get(complement) as number, i];
    visited.set(n, i);
  }
  return [-1, -1];
}
