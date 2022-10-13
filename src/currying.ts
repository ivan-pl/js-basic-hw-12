export default function curry<T>(cb: Function): Function {
  return function curried(this: any, ...args: T[]): Function | T {
    if (args.length >= cb.length) {
      return cb.apply(this, args);
    }

    const context = this;
    return function curriedConcatArgs(...args2: T[]) {
      return curried.apply(context, args.concat(args2));
    };
  };
}
