import { curry } from './curry';

function _either(fnA: (...args: any[]) => boolean, fnB: (...args: any[]) => boolean): (args: any[]) => boolean {
  return function(...args: any[]) {
    return fnA(...args) || fnB(...args);
  }
}

const either = curry(_either);

export { either };
