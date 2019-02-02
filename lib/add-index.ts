import { curry } from './curry';
import { last } from './last';

export function addIndex(iterationFn: (...args: any[]) => any): (...args: any[]) => any {
  const resultFn = (...resultArgs: any[]) => {
    const [callback] = resultArgs;
    const list = last(resultArgs);

    let currentIndex = 0;
    const newCallback = (...callbackArgs: any[]) => {
      return callback(...callbackArgs, currentIndex++, list);
    };
    const newIterationFnArgs = [newCallback].concat(resultArgs.slice(1));

    return iterationFn(...newIterationFnArgs);
  };

  return curry(resultFn);
}