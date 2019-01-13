import { curry } from './curry';
import { equals } from './equals';

function _eqProps(key: string, objA: any, objB: any): boolean {
  return equals(objA[key], objB[key]);
}

const eqProps = curry(_eqProps);

export { eqProps };