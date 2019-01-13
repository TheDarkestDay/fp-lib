import { curry } from './curry';
import { equals } from './equals';

function _eqBy(fn: (a: any) => any, elemA: any, elemB: any): boolean {
  const mappedA = fn(elemA);
  const mappedB = fn(elemB);
  
  return equals(mappedA, mappedB);
}

const eqBy = curry(_eqBy);

export { eqBy };