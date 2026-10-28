export function search(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length;

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;

    if (nums[mid] > nums[lo]) {
      if (target < nums[mid] && target >= nums[lo]) hi = mid;
      else lo = mid + 1;
    } else {
      if (target <= nums[hi - 1] && target > nums[mid]) lo = mid + 1;
      else hi = mid;
    }
  }
  return -1;
}
