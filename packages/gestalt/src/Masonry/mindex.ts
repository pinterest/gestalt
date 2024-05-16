export default function mindex(arr: ReadonlyArray<number>): number {
  let idx = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] < arr[idx]) {
      idx = i;
    }
  }
  return idx;
}
