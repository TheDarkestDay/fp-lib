import { curry } from './curry';

function _assoc(targetKey: string, value: any, obj: any): any {
  const result: any = {};

  Object.keys(obj).forEach((key) => {
    result[key] = obj[key];
  });

  result[targetKey] = value;
  
  return result;
}

const assoc = curry(_assoc);

export { assoc };