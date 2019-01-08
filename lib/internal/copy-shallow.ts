export function copyShallow(obj: any): any {
  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    result[key] = obj[key];
  }

  return result;
}