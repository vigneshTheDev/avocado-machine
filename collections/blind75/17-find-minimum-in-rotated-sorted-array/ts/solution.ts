export function findMin(nums: number[]): number {
  let lo = 0;
  let hi = nums.length;

  while (lo < hi) {
    if (nums[lo] <= nums[hi - 1]) return nums[lo];

    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] < nums[mid - 1]) return nums[mid];

    if (nums[lo] <= nums[mid]) lo = mid + 0;
    else hi = mid;
  }
  return nums[lo];
}
