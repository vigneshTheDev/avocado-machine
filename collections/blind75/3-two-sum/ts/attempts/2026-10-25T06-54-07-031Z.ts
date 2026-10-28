export function twoSum(nums: number[], target: number): number[] {
  const complementary: Record<number, number> = {};
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (complementary[comp] != null) return [complementary[comp], i];
    complementary[nums[i]] = i;
  }
  return [-1, -1];
}
