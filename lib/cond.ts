export function cond(controls: (any[])[]): any {
  return function(...args: any[]) {
    let result;

    controls.some(([conditionFn, trasnformFn]) => {
      if (conditionFn.call(this, ...args)) {
        result = trasnformFn.call(this, ...args);
        return true;
      }

      return false;
    });

    return result;
  }
}