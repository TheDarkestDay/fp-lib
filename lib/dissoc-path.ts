import { copyShallow, removeByPath } from './internal';
import { curry } from './curry';

function _dissocPath(path: (string | number)[], obj: any): any {
  const result = copyShallow(obj);

  removeByPath(path, result);

  return result;
}

const dissocPath = curry(_dissocPath);

export { dissocPath };