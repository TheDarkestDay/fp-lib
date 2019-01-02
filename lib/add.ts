import { curry } from './curry';

function _add(a: any, b: any): number {
  return Number(a) + Number(b);
}

const add = curry(_add);

export { add };