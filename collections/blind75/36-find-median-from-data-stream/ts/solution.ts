import {
  MinPriorityQueue,
  MaxPriorityQueue,
} from "@datastructures-js/priority-queue";

export class MedianFinder {
  private small = new MaxPriorityQueue<number>();
  private large = new MinPriorityQueue<number>();

  addNum(num: number): void {
    this.small.push(num);

    if (
      this.large.size() &&
      this.small.size() &&
      (this.large.front() as number) < (this.small.front() as number)
    ) {
      const val = this.small.pop() as number;
      this.large.push(val);
    }

    if (this.large.size() > this.small.size() + 1) {
      const val = this.large.pop() as number;
      this.small.push(val);
    }

    if (this.small.size() > this.large.size() + 1) {
      const val = this.small.pop() as number;
      this.large.push(val);
    }
  }

  findMedian(): number {
    if (this.large.size() === 0 && this.small.size() === 0) return 0;
    if (this.small.size() > this.large.size())
      return this.small.front() as number;
    if (this.large.size() > this.small.size())
      return this.large.front() as number;
    return (
      ((this.large.front() as number) + (this.small.front() as number)) / 2
    );
  }
}
