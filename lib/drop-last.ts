import { List } from './types';
import { curry } from './curry';

function _dropLast(count: number, list: List): List {
  if (count <= 0) {
    return list.slice();
  }

  return list.slice(0, list.length - count);
}

const dropLast = curry(_dropLast);

export { dropLast }; 