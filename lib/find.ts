import { curry } from './curry';
import { List } from './types';

function _find(predicate: (elem: any) => boolean, list: List): any {
  if (typeof list === 'string') {
    const listAsArray = Array.from(list);

    return listAsArray.find(predicate);
  }
  
  if (list.find) {
    return list.find(predicate);
  }
};

const find = curry(_find);

export { find };