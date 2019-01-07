import { List } from './types';
import { curry } from './curry';

function _drop(count: number, list: List): List {
  const startIndex = count <= 0 ? 0 : count
  return list.slice(startIndex);
}

const drop = curry(_drop);

export { drop };