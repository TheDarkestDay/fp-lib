import { forEachKey } from '../lib/internal';
import { curryN } from './curry-n';

function buildApplySpecResult(spec: any, result: any, ...args: any[]) {
  Object.keys(spec).forEach((key) => {
    const prop = spec[key];
    if (typeof prop === 'function') {
      result[key] = prop(...args);
    } else {
      result[key] = buildApplySpecResult(prop, {}, ...args);
    }
  });

  return result;
}

export function applySpec(spec: any): Function {
  const fn = function(...args: any[]) {
    return buildApplySpecResult(spec, {}, ...args);
  };

  let maxArity = 0;

  forEachKey(spec, (prop: any) => {
    if (typeof prop === 'function' && prop.length > maxArity) {
      maxArity = prop.length;
    }
  });

  return curryN(maxArity, fn);
}