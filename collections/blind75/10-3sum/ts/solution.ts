export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);

  const outStrings = new Set<string>();
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i - 1] === nums[i]) continue;

    const map: Record<number, number> = {};
    const target = -nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      const complement = target - nums[j];

      if (map[complement] != null) {
        outStrings.add(
          JSON.stringify([nums[i], nums[j], nums[map[complement]]]),
        );
      }

      map[nums[j]] = j;
    }
  }

  return [...outStrings.keys()].map((k) => JSON.parse(k));
}
