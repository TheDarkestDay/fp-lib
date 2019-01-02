export function always(value: any): (...args: any[]) => any {
  return function() {
    return value;
  }
}