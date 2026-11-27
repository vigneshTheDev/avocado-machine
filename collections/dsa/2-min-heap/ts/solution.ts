export class MinHeap {
  private arr: number[] = [];

  get size(): number {
    return this.arr.length;
  }

  insert(value: number): void {
    this.arr.push(value);
    this.heapifyUp(this.size - 1);
  }

  peek(): number | undefined {
    return this.arr[0];
  }

  extractMin(): number | undefined {
    if (this.size <= 1) return this.arr.pop();

    const min = this.arr[0];
    const last = this.arr.pop()!;

    this.arr[0] = last;
    this.heapifyDown(0);
    return min;
  }

  private leftChild(idx: number): number {
    return 2 * idx + 1;
  }

  private rightChild(idx: number): number {
    return 2 * idx + 2;
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) return;

    const pIdx = this.parent(idx);
    const val = this.arr[idx];
    const pVal = this.arr[pIdx];

    if (pVal > val) {
      this.arr[idx] = pVal;
      this.arr[pIdx] = val;
      this.heapifyUp(pIdx);
    }
  }

  private heapifyDown(idx: number): void {
    if (idx >= this.size) return;

    const lIdx = this.leftChild(idx);
    const rIdx = this.rightChild(idx);

    if (lIdx >= this.size) return;

    const val = this.arr[idx];
    const lVal = this.arr[lIdx];
    const rVal = this.arr[rIdx];

    if (lVal < val && (rIdx >= this.size || lVal <= rVal)) {
      this.arr[lIdx] = val;
      this.arr[idx] = lVal;
      this.heapifyDown(lIdx);
    } else if (rIdx < this.size && rVal < val) {
      this.arr[rIdx] = val;
      this.arr[idx] = rVal;
      this.heapifyDown(rIdx);
    }
  }
}
