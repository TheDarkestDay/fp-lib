export function removeByPath(path: (string | number)[], obj: any) {
  const currentKey = path[0];
  const currentProp = obj[currentKey];

  if (path.length === 1) {
    if (Array.isArray(obj) && typeof currentKey === 'number') {
      obj.splice(currentKey, 1);
    } else {
      delete obj[currentKey];
    }
  } else if (currentProp) {
    removeByPath(path.slice(1), currentProp);
  }
}