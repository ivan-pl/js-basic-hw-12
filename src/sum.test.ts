import sum from "./sum";

describe("sum", () => {
  it("returns 0", () => {
    expect(String(sum())).toBe("0");
  });

  it("returns 1", () => {
    const s = sum();
    expect(String(s(1))).toBe("1");
  });

  it("returns 3", () => {
    const s = sum();
    expect(String(s(1)(2))).toBe("3");
  });

  it("returns 12", () => {
    const s = sum();
    expect(String(s(3)(4)(5))).toBe("12");
  });

  it("returns 8", () => {
    const s3 = sum(3);
    expect(String(s3(5))).toBe("8");
  });

  it("returns 9", () => {
    const s3 = sum(3);
    expect(String(s3(6))).toBe("9");
  });
});
