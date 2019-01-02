import { curry } from './curry';

function _apply(fn: (...args: any[]) => any, args: any[]): any {
  return fn.apply(this, args);
}

const apply = curry(_apply);

export { apply };

