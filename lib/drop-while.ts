import { List } from './types';
import { curry } from './curry';

function _dropWhile(predicate: (elem: any) => boolean, list: List): List {
  const listAsArray = Array.from(list);
  const startIndex = listAsArray.findIndex((elem) => {
    return !predicate(elem);    
  });

  const result = listAsArray.slice(startIndex);

  return Array.isArray(list) ? result : result.join('');
}

const dropWhile = curry(_dropWhile);

export { dropWhile };