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
        const newJob = jobsQueue.shift();
        if (newJob) {
          newJob().then((val) => {
            resolve({ index: ind, result: val });
          });
        }
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
        jobThreads.splice(threadResult.index, 1);
      }
    }

    return results;
  }
}

// export default class Parallel {
//   threadsCount: number;

//   constructor(threadsCount: number) {
//     this.threadsCount = threadsCount;
//   }

//   async jobs<T>(...args: CallBack<T>[]): Promise<T[]> {
//     return new Promise(async (resolve) => {
//       let results: T[] = [];
//       let jobsQueue = [...args];
//       let workingThreads: Promise<string>[] = [];

//       for (let i = 0; i < this.threadsCount; i++) {
//         workingThreads.push(
//           new Promise(async (resolve) => {
//             while (jobsQueue.length > 0) {
//               let nextJob = jobsQueue.shift();
//               if (!nextJob) {
//                 resolve("done");
//               }
//               let jobRes = await (nextJob as CallBack<T>)();
//               results.push(jobRes);
//             }
//             resolve("done");
//           })
//         );
//       }

//       console.log(workingThreads)
//       await Promise.all(workingThreads);
//       return results;
//     });
//   }
// }

// export default class Parallel {
//   threadsCount: number;

//   constructor(threadsCount: number) {
//     this.threadsCount = threadsCount;
//   }

//   async jobs<T>(...args: CallBack<T>[]): Promise<T[]> {
//     return new Promise(async (resolve) => {
//       let results: T[] = [];
//       let jobsQueue = [...args];
//       let workingThreads: Promise<string>[] = [];

//       async function startJob(cb: CallBack<T>): Promise<string> {
//         return cb().then((val) => {
//           results.push(val);
//           if (jobsQueue.length > 0) {
//             const nextJob = jobsQueue.shift() as CallBack<T>;
//             return startJob(nextJob);
//           }
//           return Promise.resolve("done");
//         });
//       }

//       for (let i = 0; i < this.threadsCount; i++) {
//         if (jobsQueue.length > 0) {
//           workingThreads.push(startJob(jobsQueue.shift() as CallBack<T>));
//         }
//       }

//       await Promise.all(workingThreads);
//       return results;
//     });
//   }
// }
