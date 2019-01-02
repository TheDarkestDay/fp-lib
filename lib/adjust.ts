import { curry } from './curry';

function _adjust(index: number, transformFn: (elem: any) => any, arr: any[]): any[] {
  const normalizedIndex = index < 0 ? arr.length + index : index; 
  return Array.prototype.map.call(arr, (elem: any, i: number) => i === normalizedIndex ? transformFn(elem) : elem);
}

const adjust = curry(_adjust);

export { adjust };