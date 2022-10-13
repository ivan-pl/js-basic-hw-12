type CallBack<T> = () => Promise<T>;
type ThreadResult<T> = {
  index: number;
  result: T;
};

export default class Parallel {
  threadsCount: number;

  constructor(threadsCount: number) {
    this.threadsCount = threadsCount;
  }

  async jobs<T>(...args: CallBack<T>[]): Promise<T[]> {
    const results: T[] = [];
    const jobsQueue = [...args];
    const jobThreads: Promise<ThreadResult<T>>[] = [];
    const makePromise: (ind: number) => Promise<ThreadResult<T>> = (
      ind: number
    ) =>
      new Promise((resolve) => {
        const newJob = jobsQueue.shift() as CallBack<T>;
        newJob().then((val) => {
          resolve({ index: ind, result: val });
        });
      });

    for (let i = 0; i < this.threadsCount && i < args.length; i++) {
      jobThreads.push(makePromise(i));
    }

    while (results.length < args.length) {
      const threadResult: ThreadResult<T> = await Promise.race(jobThreads);
      results.push(threadResult.result);
      // console.log(
      //   `Result: ${results}; Queue: ${jobsQueue}; Threads Result: ${[
      //     threadResult.index,
      //     threadResult.result,
      //   ]}; Threads: ${jobThreads}`
      // );
      if (jobsQueue.length > 0) {
        jobThreads[threadResult.index] = makePromise(threadResult.index);
      } else {
        jobThreads[threadResult.index] = new Promise(() => {});
      }
    }

    return results;
  }
}
