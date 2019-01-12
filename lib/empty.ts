export function empty(a: any): any {
  if (Array.isArray(a)) {
    return [];
  }

  if (a.toString() === '[object Arguments]') {
    const emptyArgs = arguments;
    emptyArgs.length = 0;
    return emptyArgs;
  }

  if (typeof a === 'string' || a instanceof String) {
    return '';
  }

  if (a.empty) {
    return a.empty();
  }

  return {};
}