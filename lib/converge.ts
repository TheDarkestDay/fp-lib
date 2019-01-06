import { curry } from './curry';

function _converge(convergeFn: Function, branchFns: Array<Function>): Function {
  const resultFn = function (...args: any[]) {
    const branchResults = branchFns.map((fn) => fn.call(this, ...args));

    return convergeFn.call(this, ...branchResults);
  };

  const maxArity = Math.max(...branchFns.map((fn) => fn.length));

  Object.defineProperty(resultFn, 'length', {
    value: branchFns.length && maxArity
  });

  return resultFn;
}

const converge = curry(_converge);

export { converge };