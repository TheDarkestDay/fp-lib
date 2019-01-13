import { curry } from './curry';

function getPrimitiveValue(obj: any): any {
  return obj instanceof Number || obj instanceof String || obj instanceof Boolean ? obj.valueOf() : obj;
}

function _equals(a: any, b: any): boolean {
  if ((typeof a === 'object' && typeof b !== 'object') || (typeof a !=='object' && typeof b === 'object')) {
    return false;
  }

  const valueA = getPrimitiveValue(a);
  const valueB = getPrimitiveValue(b);

  // Case: Two NaNs as primitive numbers
  if ((typeof valueA === 'number' && typeof valueB === 'number') && isNaN(valueA) && isNaN(valueB)) {
    return true;
  }

  // Case: Two arrays
  if (Array.isArray(valueA) && Array.isArray(valueB) && valueA.length === valueB.length) {
    return valueA.every((elem: any, i: number) => equals(elem, valueB[i]));
  }

  // Case: Error objects
  if (valueA instanceof Error && valueB instanceof Error) {
    return valueA.constructor === valueB.constructor && equals(valueA.message, valueB.message);
  }

  // Case: Dates
  if (valueA instanceof Date && valueB instanceof Date) {
    return valueA.valueOf() === valueB.valueOf();
  }

  // Case: Plain objects
  if (typeof valueA === 'object' && typeof valueB === 'object') {
    const aKeys = Object.keys(valueA);
    const bKeys = Object.keys(valueB);

    if (aKeys.length !== bKeys.length || valueA.constructor !== valueB.constructor) {
      return false;
    }

    return aKeys.every((key) => equals(valueA[key], valueB[key]));
  }

  // Case: Objects with their own .equals methods
  if (valueA.equals && valueB.equals) {
    return valueA.equals(valueB);
  }

  return valueA === valueB;
};

const equals = curry(_equals);

export { equals };