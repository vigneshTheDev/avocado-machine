export default function two_crystal_balls(breaks: boolean[]): number {
  const sqrt = Math.floor(Math.sqrt(breaks.length));

  let i = 0;
  while (i < breaks.length && breaks[i] === false) i += sqrt;

  for (let j = i - sqrt; j <= i; j++) if (breaks[j]) return j;
  return -1;
}
