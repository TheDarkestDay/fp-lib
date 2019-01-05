import { curry } from './curry';

function _equals(a: any, b: any): boolean {
  return a === b;
};

const equals = curry(_equals);

export { equals };