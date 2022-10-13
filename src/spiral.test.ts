import spiral from "./spiral";

describe("spiral", () => {
  it("returns [0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11]", () => {
    const testArray = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
    ];
    expect(spiral(testArray)).toEqual([
      0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11,
    ]);
  });

  it("returns [0, 1, 2, 3, 7, 11, 10, 9, 8, 4, 5, 6]", () => {
    const testArray = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
    ];
    expect(spiral(testArray)).toEqual([0, 1, 2, 3, 7, 11, 10, 9, 8, 4, 5, 6]);
  });

  it("returns [0, 1, 2, 5, 8, 7, 6, 3, 4]", () => {
    const testArray = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    expect(spiral(testArray)).toEqual([0, 1, 2, 5, 8, 7, 6, 3, 4]);
  });

  it("returns []", () => {
    expect(spiral([[]])).toEqual([]);
    expect(spiral([])).toEqual([]);
  });

  it("returns [1]", () => {
    expect(spiral([[1]])).toEqual([1]);
  });
});
