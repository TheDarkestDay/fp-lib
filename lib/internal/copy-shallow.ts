export function copyShallow(obj: any): any {
  const result: any = {};

  for (const key in obj) {
    result[key] = obj[key];
  }

  return result;
}