import curry from "./currying";

describe("currying", () => {
  let hof: Function;

  beforeEach(() => {
    const func = (a: number, b: number, c: number, d: number, e: number) =>
      a + b + c + d + e;

    hof = curry<number>(func);
  });

  it("returns 15", () => {
    expect(hof(1, 2, 3, 4, 5)).toBe(15);
  });

  it("returns 20", () => {
    expect(hof(2, 3, 4)(5, 6)).toBe(20);
  });

  it("returns 25", () => {
    expect(hof(3, 4)(5, 6)(7)).toBe(25);
  });

  it("returns 30", () => {
    expect(hof(4, 5)(6)(7, 8)).toBe(30);
  });

  it("returns 35", () => {
    expect(hof(5)(6)(7)(8)(9)).toBe(35);
  });
});
