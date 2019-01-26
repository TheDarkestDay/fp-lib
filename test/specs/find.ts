import { eq } from '../helpers';

import { find } from '../../lib';

describe('find', function() {
  const obj1 = {x: 100};
  const obj2 = {x: 200};
  const a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
  const even = (x: any) => x % 2 === 0;
  const gt100 = (x: any) => x > 100;
  const isStr = (x: any) => typeof x === 'string';
  const xGt100 = (o: any) => o.x && o.x > 100;
  // TODO: Need to figure out the transducers
  //  const intoArray = (...args: any[]) => args;

  it('returns the first element that satisfies the predicate', function() {
    eq(find(even, a), 10);
    eq(find(gt100, a), 200);
    eq(find(isStr, a), 'cow');
    eq(find(xGt100, a), obj2);
  });

  // it('transduces the first element that satisfies the predicate into an array', function() {
  //   eq(intoArray(find(even), a), [10]);
  //   eq(intoArray(find(gt100), a), [200]);
  //   eq(intoArray(find(isStr), a), ['cow']);
  //   eq(intoArray(find(xGt100), a), [obj2]);
  // });

  it('returns `undefined` when no element satisfies the predicate', function() {
    eq(find(even, ['zing']), undefined);
  });

  // it('returns `undefined` in array when no element satisfies the predicate into an array', function() {
  //   eq(intoArray(find(even), ['zing']), [undefined]);
  // });

  it('returns `undefined` when given an empty list', function() {
    eq(find(even, []), undefined);
  });

  // it('returns `undefined` into an array when given an empty list', function() {
  //   eq(intoArray(find(even), []), [undefined]);
  // });

  // it('dispatches to transformer objects', function() {
  //   eq(find(identity, listXf), {
  //     f: identity,
  //     found: false,
  //     xf: listXf
  //   });
  // });
});