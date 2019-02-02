export function curry(f: Function): (...args: any[]) => any {
  const curriedWrapper = function (...rest: any[]) {
    if (rest.length >= f.length) {
      return f.call(this, ...rest);
    }

    const curriedFn = function (...others: any[]) {
      return f.call(this, ...rest, ...others);
    }

    Object.defineProperty(curriedFn, 'length', {
      value: f.length - rest.length
    });

    return curry(curriedFn);
  };

  Object.defineProperty(curriedWrapper, 'length', {
    value: f.length,
  });

  return curriedWrapper;
}