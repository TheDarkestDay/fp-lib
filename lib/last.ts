export function last(arr: any[] | string): any {
  if (arr === '') {
    return '';
  }
  
  return arr[arr.length - 1];
}