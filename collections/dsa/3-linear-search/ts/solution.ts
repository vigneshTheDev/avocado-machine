export default function linear_search(
  haystack: number[],
  needle: number,
): boolean {
  for (let n of haystack) if (needle === n) return true;

  return false;
}
