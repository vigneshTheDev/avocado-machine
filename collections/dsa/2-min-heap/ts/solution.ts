export class MinHeap {
  private list: number[] = [];
  constructor() {}

  get size(): number {
    return this.list.length;
  }

  insert(value: number): void {
    this.list.push(value);
    this.heapifyUp(this.size - 1);
  }

  peek(): number | undefined {
    return this.list[0];
  }

  extractMin(): number | undefined {
    if (this.size === 0) return;

    const min = this.list[0];
    const lastVal = this.list.pop() as number;
    if (this.size === 0) return min;

    this.list[0] = lastVal;
    this.heapifyDown(0);
    return min;
  }

  private parent(idx: number): number {
    return Math.ceil(idx / 2) - 1;
  }
  private lChild(idx: number): number {
    return 2 * idx + 1;
  }
  private rChild(idx: number): number {
    return 2 * idx + 2;
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) return;

    const pIdx = this.parent(idx);

    const val = this.list[idx];
    const pVal = this.list[pIdx];

    if (pVal > val) {
      this.list[idx] = pVal;
      this.list[pIdx] = val;
      this.heapifyUp(pIdx);
    }
  }

  private heapifyDown(idx: number): void {
    if (idx === this.size - 1) return;

    const lIdx = this.lChild(idx);
    const rIdx = this.rChild(idx);

    if (lIdx >= this.size) return;

    const val = this.list[idx];
    const lVal = this.list[lIdx];
    const rVal = this.list[rIdx];

    if ((rIdx >= this.size || lVal <= rVal) && lVal < val) {
      this.list[idx] = lVal;
      this.list[lIdx] = val;
      this.heapifyDown(lIdx);
    } else if (rVal <= lVal && rVal < val) {
      this.list[idx] = rVal;
      this.list[rIdx] = val;
      this.heapifyDown(rIdx);
    }
  }
}
