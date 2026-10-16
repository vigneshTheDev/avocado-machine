export default function bs_list(haystack: number[], needle: number): boolean {
  let lo = 0;
  let hi = haystack.length;

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (haystack[mid] === needle) return true;
    if (haystack[mid] > needle) hi = mid;
    else lo = mid + 1;
  }
  return false;
}
