import { copyShallow } from './internal';
import { curry } from './curry';

function _dissoc(key: string, obj: any): any {
  const result = copyShallow(obj);

  delete result[key];

  return result;
}

const dissoc = curry(_dissoc);

export { dissoc };