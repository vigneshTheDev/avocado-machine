export default function two_crystal_balls(breaks: boolean[]): number {
  const step = Math.floor(Math.sqrt(breaks.length));
  let i = 0;
  for (; i < breaks.length && !breaks[i]; i += step) {}
  for (let j = i - step; j <= i; j++) {
    if (breaks[j]) return j;
  }

  return -1;
}
