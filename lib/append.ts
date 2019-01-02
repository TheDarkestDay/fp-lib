import { curry } from './curry';

function _append(elem: any, arr: any[]): any[] {
  const result = arr.slice();
  result.push(elem);
  return result;
}

const append = curry(_append);

export { append };