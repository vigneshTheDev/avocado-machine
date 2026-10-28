export function canAttendMeetings(intervals: number[][]): boolean {
  intervals.sort((a, b) => a[0] - b[0]);
  return intervals.every(
    (interval, i, arr) =>
      i === intervals.length - 1 || interval[1] <= arr[i + 1][0],
  );
}
