import { Dictionary } from "./types";

function cloneDeepArray(arr: any[]): any[] {
  const result: any[] = [];

  arr.forEach((elem) => {
    if (typeof elem === 'object') {
      result.push(cloneDeep(elem));
    } else {
      result.push(elem);
    }
  });

  return result;
}

export function cloneDeep(obj: Dictionary<any>): Dictionary<any> {
  const result: Dictionary<any> = {};

  if (Array.isArray(obj)) {
    return cloneDeepArray(obj);
  }

  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      result[key] = cloneDeepArray(obj[key]);
    } else if (typeof obj[key] === 'object') {
      result[key] = cloneDeep(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });

  return result;
}