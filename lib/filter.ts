import { curry } from './curry';

function _filter(predicateFn: (elem: any) => boolean, filterable: any): any {
  if (filterable.filter) {
    return filterable.filter(predicateFn);
  }

  if (typeof filterable === 'object' && filterable !== null) {
    const result: any = {};

    Object.keys(filterable).forEach((key) => {
      if (predicateFn(filterable[key])) {
        result[key] = filterable[key];
      }
    });

    return result;
  }
}

const filter = curry(_filter);

export { filter };