import Parallel from "./parallel";

describe("Parallel", () => {
  describe(".jobs", () => {
    it("returns [1, 3, 2, 5, 4]", async () => {
      const runner = new Parallel(2);
      const result = runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 100, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 500, 2)),
        () => new Promise((resolve) => setTimeout(resolve, 200, 3)),
        () => new Promise((resolve) => setTimeout(resolve, 900, 4)),
        () => new Promise((resolve) => setTimeout(resolve, 300, 5))
      );
      expect(await result).toEqual([1, 3, 2, 5, 4]);
    });

    it("returns [1, 2, 3, 4, 5] in Parallel(5)", async () => {
      const runner = new Parallel(5);
      const result = runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 100, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 200, 2)),
        () => new Promise((resolve) => setTimeout(resolve, 300, 3)),
        () => new Promise((resolve) => setTimeout(resolve, 400, 4)),
        () => new Promise((resolve) => setTimeout(resolve, 500, 5))
      );
      expect(await result).toEqual([1, 2, 3, 4, 5]);
    });

    it("returns [1, 2, 3, 4, 5] in Parallel(1)", async () => {
      const runner = new Parallel(1);
      const result = runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 200, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 100, 2)),
        () => new Promise((resolve) => setTimeout(resolve, 300, 3)),
        () => new Promise((resolve) => setTimeout(resolve, 100, 4)),
        () => new Promise((resolve) => setTimeout(resolve, 100, 5))
      );
      expect(await result).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
