import { curry } from './curry';

function _equals(a: any, b: any): boolean {
  if ((typeof a === 'object' && typeof b !== 'object') || (typeof a !== 'object' && typeof b === 'object')) {
    return false;
  }

  // Case: Two NaNs as primitive numbers
  if ((typeof a === 'number' && typeof b === 'number') && isNaN(a) && isNaN(b)) {
    return true;
  }

  // Case: Plain objects
  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length || a.constructor !== b.constructor) {
      return false;
    }

    const allPropsAreEqualCheck = aKeys.every((key) => equals(a[key], b[key]));

    if (!allPropsAreEqualCheck) {
      return false;
    }

    if (a instanceof Boolean || a instanceof Number || a instanceof String) {
      return a.valueOf() === b.valueOf();
    }

    // Case: Two arrays
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
      return allPropsAreEqualCheck && a.every((elem: any, i: number) => equals(elem, b[i]));
    }

    // Case: Error objects
    if (a instanceof Error && b instanceof Error) {
      return a.constructor === b.constructor && equals(a.message, b.message);
    }

    // Case: Dates
    if (a instanceof Date && b instanceof Date) {
      return a.valueOf() === b.valueOf();
    }

    // Case: Promises, WeaMaps and WeakSets
    if ((a instanceof Promise && b instanceof Promise) || (a instanceof WeakMap && b instanceof WeakMap) || (a instanceof WeakSet && b instanceof WeakSet)) {
      return a === b;
    }

    return allPropsAreEqualCheck;
  }

  // Case: Objects with their own .equals methods
  if (a.equals && b.equals) {
    return a.equals(b);
  }

  return a === b;
};

const equals = curry(_equals);

export { equals };