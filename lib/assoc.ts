import { copyShallow } from './internal';
import { curry } from './curry';

function _assoc(targetKey: string, value: any, obj: any): any {
  const result = copyShallow(obj);

  result[targetKey] = value;
  
  return result;
}

const assoc = curry(_assoc);

export { assoc };