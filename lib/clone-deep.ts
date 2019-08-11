import { Dictionary } from "./types";

function _clonePrimitiveWrapper(obj: Number | String | Boolean): Number | String | Boolean {
  const value = obj.valueOf();

  if (obj instanceof Number) {
    return new Number(value);
  } else if (obj instanceof String) {
    return new String(value);
  }

  return new Boolean(value);
}

function _cloneRegExps(re: RegExp): RegExp {
  return new RegExp(re.source, re.flags);
}

function _cloneArray(arr: any[], alreadyClonedRefs: Map<any, any>): any[] {
  const result: any[] = [];

  arr.forEach((elem) => {
    if (typeof elem === 'object') {
      result.push(_clone(elem, alreadyClonedRefs));
    } else {
      result.push(elem);
    }
  });

  return result;
}

function _clone(obj: any, alreadyClonedRefs: Map<any, any>): any {
  const result: any = Object.create(Object.getPrototypeOf(obj));

  alreadyClonedRefs.set(obj, result);

  if (obj instanceof Number || obj instanceof Boolean || obj instanceof String) {
    return _clonePrimitiveWrapper(obj);
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof RegExp) {
    return _cloneRegExps(obj);
  }

  if (Array.isArray(obj)) {
    return _cloneArray(obj, alreadyClonedRefs);
  }

  Object.keys(obj).forEach((key) => {
    if (alreadyClonedRefs.has(obj[key])) {
      result[key] = alreadyClonedRefs.get(obj[key]);
    } else if (Array.isArray(obj[key])) {
      result[key] = _cloneArray(obj[key], alreadyClonedRefs);
    } else if (typeof obj[key] === 'object') {
      result[key] = _clone(obj[key], alreadyClonedRefs);
    } else {
      result[key] = obj[key];
    }
  });

  return result;
}

export function cloneDeep(obj: Dictionary<any>): Dictionary<any> {
  return _clone(obj, new Map());
}