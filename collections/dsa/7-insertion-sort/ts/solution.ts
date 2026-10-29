export default function insertion_sort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    let element = arr[i];
    let j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] <= element) break;

      arr[j + 1] = arr[j];
    }
    arr[j + 1] = element;
  }
}
