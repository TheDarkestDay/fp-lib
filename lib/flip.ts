import { curry } from './curry';
 
export function flip(f: Function): Function {
  const flippedFn = function(a: any, b: any, ...rest: any[]) {
    return f(b, a, ...rest);
  };

  Object.defineProperty(flippedFn, 'length', {
    value: f.length
  });

  return curry(flippedFn);
}