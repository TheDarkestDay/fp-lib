export function add(a: any, b?: any): any {
  const aAsNumber = Number(a);
  const bAsNumber = Number(b);

  if (arguments.length === 1) {
    return function(b: any) {
      const bAsNumber = Number(b);

      return aAsNumber + bAsNumber;
    }
  }

  return aAsNumber + bAsNumber;
}  