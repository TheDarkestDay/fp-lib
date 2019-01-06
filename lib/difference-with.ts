import { removeDuplicatesWith } from './internal';
import { curry } from './curry';

function _differenceWith(comparator: (a: any, b: any) => boolean, listA: any[], listB: any[]): any[] {
  const listAWithoutDuplicates = removeDuplicatesWith(listA, comparator);

  return listAWithoutDuplicates.filter((elemA) => {
    return !listB.some((elemB) => comparator(elemA, elemB));
  });
}

const differenceWith = curry(_differenceWith);

export { differenceWith };