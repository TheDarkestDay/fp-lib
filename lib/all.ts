import { curry } from './curry';

function _all(predicate: (elem: any) => boolean, arr: any[]): boolean {
  return arr.every(predicate);
}

const all = curry(_all);

export { all };