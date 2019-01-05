import { curry } from './curry';

function _multiply(a: number, b: number) {
  return a * b;
}

const multiply = curry(_multiply);

export { multiply };