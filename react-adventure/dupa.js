function sum(sum: number, item: number): number {
  return sum + item;
}
const list = [1,2,3];
const result = Array.prototype.reduce.call(list, sum); // -> 6