import { curry } from './curry';
import { equals } from './equals';

function _eqProps(key: string, objA: any, objB: any): boolean {
  const aProp = objA[key];
  if (aProp.equals) {
    return aProp.equals(objB[key]);
  }

  return equals(objA[key], objB[key]);
}

const eqProps = curry(_eqProps);

export { eqProps };