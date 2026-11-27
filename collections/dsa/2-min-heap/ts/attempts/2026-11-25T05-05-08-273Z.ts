export class MinHeap {
  private arr: number[] = [];
  constructor() {}

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

    const last = this.arr.pop();
    if (last == null) throw new Error("last value not found");

    this.arr[0] = last;

    this.heapifyDown(0);
    return min;
  }

  private leftChild(idx: number) {
    return 2 * idx + 1;
  }

  private rightChild(idx: number) {
    return 2 * idx + 2;
  }

  private parent(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  private heapifyUp(idx: number) {
    const pIdx = this.parent(idx);

    const val = this.arr[idx];
    const pVal = this.arr[pIdx];

    if (pVal > val) {
      this.arr[idx] = pVal;
      this.arr[pIdx] = val;
      this.heapifyUp(pIdx);
    }
  }

  private heapifyDown(idx: number) {
    const lIdx = this.leftChild(idx);
    const rIdx = this.rightChild(idx);

    if (lIdx >= this.size) return;

    const val = this.arr[idx];
    const lVal = this.arr[lIdx];
    const rVal = this.arr[rIdx];

    if (lVal < val && (rIdx >= this.size || lVal <= rVal)) {
      this.arr[idx] = lVal;
      this.arr[lIdx] = val;
      this.heapifyDown(lIdx);
    } else if (rIdx < this.size && rVal < val && rVal < lVal) {
      this.arr[idx] = rVal;
      this.arr[rIdx] = val;
      this.heapifyDown(rIdx);
    }
  }
}
