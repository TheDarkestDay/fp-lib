import { last } from './last';

export function compose(...fns: Function[]): Function {
  const resultFn = function(...args: any[]) {
    return fns.reduceRight((acc, curr) => {
      return curr.call(this, ...acc);
    }, args);
  };

  try {
    Object.defineProperty(resultFn, 'length', {
      value: last(fns).length
    });
  } catch(error) {
    throw new Error('compose requires at least one argument');
  }

  return resultFn;
}

