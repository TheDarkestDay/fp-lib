export function forEachKey(obj: any, callback: Function) {
  Object.keys(obj).forEach((key) => {
    const prop = obj[key];
    if (typeof prop === 'object') {
      forEachKey(prop, callback);
    } else {
      callback(prop);
    }
  });
}