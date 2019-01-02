import { curry } from './curry';

function _prop(key: string, obj: any): any {
  return obj[key];
}

const prop = curry(_prop);

export { prop };
