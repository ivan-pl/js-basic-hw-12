import Parallel from "./parallel";

describe("Parallel", () => {
  it(".jobs", async () => {
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
});
