import { copyShallow, upsertByPath } from './internal';
import { curry } from './curry';

function _assocPath(path: (string | number)[], value: any, obj: any): any {
  if (path.length === 0) {
    return value;
  }

  const result = copyShallow(obj);

  upsertByPath(path, value, result);

  return result;
}

const assocPath = curry(_assocPath);

export { assocPath };