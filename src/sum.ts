export default function sum(num: number = 0): Function {
  const newSumFunc = function newSum(nextNum: number): Function {
    // eslint-disable-next-line no-param-reassign
    num += nextNum;
    return newSumFunc;
  };

  newSumFunc.toString = () => String(num);

  // TS не дает переопределить вот так:
  // newSumFunc[Symbol.toPrimitive] = (hint: string) =>
  //   hint === "number" ? num : String(num);

  return newSumFunc;
}
