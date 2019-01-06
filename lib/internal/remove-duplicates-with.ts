export function removeDuplicatesWith(list: any[], comparator: (a: any, b: any) => boolean): any[] {
  return list.filter((elem, i) => {
    return !list.some((otherElem, j) => j > i && comparator(elem, otherElem));
  });
}