import { copyShallow } from './internal';
import { curry } from './curry';

function _map(fn: (value: any) => any, functor: any): any {
  if (Array.isArray(functor)) {
    return functor.map(fn);
  }

  const result = copyShallow(functor);

  Object.keys(result).forEach((key) => {
    result[key] = fn(result[key]);
  });

  return result;
}

const map = curry(_map);

export { map };