export function maxArea(heights: number[]): number {
  let l = 0;
  let r = heights.length - 1;
  let max = 0;
  while (l < r) {
    const width = r - l;
    const height = Math.min(heights[l], heights[r]);
    const area = width * height;
    max = Math.max(area, max);

    if (heights[l] < heights[r]) l++;
    else r--;
  }
  return max;
}
