import { curry } from './curry';
import { equals } from './equals';
import { List } from './types';

function _endsWith(tail: List, mainList: List): boolean {
  const startIndex = mainList.length - tail.length;

  if (startIndex < 0) {
    return false;
  }

  const sliceToTest = Array.from(mainList.slice(startIndex));

  return sliceToTest.every((elem: any, i: number) => equals(elem, tail[i]));
}

const endsWith = curry(_endsWith);

export { endsWith };