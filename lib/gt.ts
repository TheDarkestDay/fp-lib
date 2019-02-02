import { curry } from './curry';

function _gt(a: number, b: number): boolean {
  return a > b;
}

const gt = curry(_gt);

export { gt };