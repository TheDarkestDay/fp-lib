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

    // Case: RegExp
    if (a instanceof RegExp && b instanceof RegExp) {
      const aAsString = a.toString();
      const bAsString = b.toString();
      const aFlagsDelimIndex = aAsString.lastIndexOf('/');
      const bFlagsDelimIndex = bAsString.lastIndexOf('/');
      const aWithoutFlags = aAsString.slice(0, aFlagsDelimIndex);
      const bWithoutFlags = bAsString.slice(0, bFlagsDelimIndex);

      return aWithoutFlags === bWithoutFlags &&
        a.global === b.global &&
        a.multiline === b.multiline &&
        a.sticky === b.sticky &&
        a.unicode === b.unicode;
    }

    // Case: Map
    if (a instanceof Map && b instanceof Map) {
      const aMapKeys = [...a.keys()];
      const bMapKeys = [...b.keys()];

      if (aMapKeys.length !== bMapKeys.length) {
        return false;
      }

      return aMapKeys.every((aMapKey) => {
        const sameKeyInB = bMapKeys.find((bMapKey) => equals(aMapKey, bMapKey));

        if (!sameKeyInB) {
          return false;
        }

        return equals(a.get(aMapKey), b.get(sameKeyInB));
      });
    }

    // Case: Set
    if (a instanceof Set && b instanceof Set) {
      const aValues = [...a.values()];
      const bValues = [...b.values()];

      const allValuesAreSameCheck = aValues.every((aValue) => {
        return bValues.some((bValue) => equals(aValue, bValue));
      });

      return aValues.length === bValues.length && allValuesAreSameCheck;
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