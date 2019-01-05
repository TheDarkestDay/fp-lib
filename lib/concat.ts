import { List } from './types';
import { isObject } from './internal';
import { curry } from './curry';

function _concat(a: List, b: List): List {
  if (isObject(a) && isObject(b)) {
    if (!a.concat) {
      throw new TypeError();
    }

    return (a as any).concat(b);
  }

  const result = a.slice();

  if (Array.isArray(a)) {
    (b as Array<any>).forEach((elem) => (result as Array<any>).push(elem));

    return result;
  }

  return a + b;
}

const concat = curry(_concat);

export { concat };