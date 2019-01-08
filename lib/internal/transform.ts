import { Dictionary } from '../types';

function transformObject(transformation: Dictionary<any>, obj: Dictionary<any>): void {
  Object.keys(transformation).forEach((key) => {
    if (!obj[key]) {
      return;
    }

    if (typeof transformation[key] === 'function') {
      obj[key] = transformation[key](obj[key]);
    } else {
      transform(transformation[key], obj[key]);
    }
  });
}

function transformArray(transformation: any[], arr: any[]): void {
  arr.forEach((elem, index) => {
    if (!elem) {
      return;
    }

    if (typeof transformation[index] === 'function') {
      arr[index] = transformation[index](elem);
    } else {
      transform(transformation[index], elem);
    }
  });
}

export function transform(transformation: any, obj: any): void {
  const transformFn = Array.isArray(transformation) ? transformArray : transformObject;
  
  transformFn(transformation, obj);
}