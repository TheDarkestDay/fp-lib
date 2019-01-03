export function upsertByPath(path: (number | string)[], value: any, obj: any): any {
  const key = path[0];

  if (path.length === 1) {
    obj[key] = value;
  } else {
    if (!obj[key]) {
      obj[key] = typeof path[1] === 'string' ? {} : [];
    }

    upsertByPath(path.slice(1), value, obj[key]);
  }
}