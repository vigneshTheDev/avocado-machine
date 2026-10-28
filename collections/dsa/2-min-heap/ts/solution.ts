export class MinHeap {
  arr: number[] = [];
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

    const last = this.arr.pop() as number;
    const min = this.arr[0];

    this.arr[0] = last;
    this.heapifyDown(0);

    return min;
  }

  leftChild(idx: number) {
    return 2 * idx + 1;
  }
   
  rightChild(idx: number) {
    return 2 * idx + 2;
  }

  parent(idx: number) {
    return Math.ceil(idx / 2) - 1;
  }

  heapifyUp(idx: number) {
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

  heapifyDown(idx: number) {
    if (idx >= this.size) return;

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
