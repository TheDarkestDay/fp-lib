import { List } from './types';
import { curry } from './curry';

function _drop(count: number, list: List): List {
  const adjustedIndex = count <= 0 ? 0 : count
  return list.slice(adjustedIndex);
}

const drop = curry(_drop);

export { drop };