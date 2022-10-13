import { equalizeLength, compareVersions, semverSort } from "./semverSort";

describe("equalizeLength", () => {
  it("returns [[1,2,0,0],[1,2,3,4]] for equalizeLength([1,2], [1,2,3,4])", () => {
    expect(equalizeLength([1, 2], [1, 2, 3, 4])).toEqual([
      [1, 2, 0, 0],
      [1, 2, 3, 4],
    ]);
  });

  it("returns [[1,2],[1,2]] for equalizeLength([1,2], [1,2])", () => {
    expect(equalizeLength([1, 2], [1, 2])).toEqual([
      [1, 2],
      [1, 2],
    ]);
  });

  it("returns [[1,2,3],[1,2,0]] for equalizeLength([1,2,3], [1,2])", () => {
    expect(equalizeLength([1, 2, 3], [1, 2])).toEqual([
      [1, 2, 3],
      [1, 2, 0],
    ]);
  });
});

describe("compareVersions", () => {
  it(`returns -1 for compareVersion("1.23", "2.46")`, () => {
    expect(compareVersions("1.23", "2.46")).toBe(-1);
  });

  it(`returns -1 for compareVersion("1", "2")`, () => {
    expect(compareVersions("1", "2")).toBe(-1);
  });

  it(`returns -1 for compareVersion("1", "1.3")`, () => {
    expect(compareVersions("1", "1.3")).toBe(-1);
  });

  it(`returns 0 for compareVersion("1.23", "1.23")`, () => {
    expect(compareVersions("1.23", "1.23")).toBe(0);
  });

  it(`returns 1 for compareVersion("1.34.2", "1.3")`, () => {
    expect(compareVersions("1.34.2", "1.3")).toBe(1);
  });

  it(`returns 1 for compareVersion("2.34.2.1", "2")`, () => {
    expect(compareVersions("2.34.2.1", "2")).toBe(1);
  });
});

describe("semverSort", () => {
  it(`returns [ "0.12.0", "1", "1.0.5", "1.2.3.4.5.6.7", "1.4.50", "1.23.45", "2.5.0" ]`, () => {
    const testArr = [
      "1.0.5",
      "2.5.0",
      "0.12.0",
      "1",
      "1.23.45",
      "1.4.50",
      "1.2.3.4.5.6.7",
    ];
    expect(semverSort(testArr)).toEqual([
      "0.12.0",
      "1",
      "1.0.5",
      "1.2.3.4.5.6.7",
      "1.4.50",
      "1.23.45",
      "2.5.0",
    ]);
  });

  it(`returns [ "1", "1.15", "2", "3" ]`, () => {
    const testArr = ["1", "2", "3", "1.15"];
    expect(semverSort(testArr)).toEqual(["1", "1.15", "2", "3"]);
  });

  it(`returns [ "1", "1.0", "1.15", "2", "3" ]`, () => {
    const testArr = ["1", "1.0", "2", "3", "1.15"];
    expect(semverSort(testArr)).toEqual(["1", "1.0", "1.15", "2", "3"]);
  });

  it(`returns []`, () => {
    expect(semverSort([])).toEqual([]);
  });
});
