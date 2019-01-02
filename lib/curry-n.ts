import { curry } from './curry';

function _curryN(arity: number, f: Function) {
  Object.defineProperty(f, 'length', {
    value: arity
  });

  return curry(f);
};

const curryN = curry(_curryN);

export { curryN };