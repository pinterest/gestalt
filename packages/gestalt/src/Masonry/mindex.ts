export default function mindex(arr: ReadonlyArray<number>): number {
  return arr.length ? arr.indexOf(Math.min(...arr)) : 0;
}
