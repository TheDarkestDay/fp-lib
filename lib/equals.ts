import { curry } from './curry';

function _equals(a: any, b: any): boolean {

  // Case #1: Two NaNs as primitive numbers
  if ((typeof a === 'number' && typeof b === 'number') && isNaN(a) && isNaN(b)) {
    return true;
  }

  // Case #2: Two NaNs as Number instances
  if (a instanceof Number && b instanceof Number && isNaN(a.valueOf()) && isNaN(b.valueOf())) {
    return true;
  }

  // Case #3: Two arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((elem: any, i: number) => equals(elem, b[i]));
  }

  return a === b;
};

const equals = curry(_equals);

export { equals };