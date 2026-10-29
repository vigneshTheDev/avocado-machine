export default function insertion_sort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    let j = i - 1;
    for (; j >= 0; j--) {
      if (element < arr[j]) arr[j + 1] = arr[j];
      else break;
    }
    arr[j + 1] = element;
  }
}
