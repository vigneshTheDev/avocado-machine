export function missingNumber(nums: number[]): number {
  let out = 0;
  for (let i = 0; i < nums.length; i++) {
    out ^= i + 1;
    out ^= nums[i];
  }
  return out;
}
