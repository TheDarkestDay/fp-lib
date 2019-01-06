import { curryN } from './curry-n';

const MAX_CONCSTRUCTOR_ARITY = 10;

export function construct(constructorFn: any): Function {
  if (constructorFn.length > MAX_CONCSTRUCTOR_ARITY) {
    throw new Error('Constructor with greater than ten arguments');
  }

  const resultFn = (...args: any[]) => {
    return new constructorFn(...args);
  };

  return curryN(constructorFn.length, resultFn);
}