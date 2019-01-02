import { allPass } from '../lib';

describe('allPass', function() {
  const odd = function(n: any) { return n % 2 !== 0; };
  const lt20 = function(n: any) { return n < 20; };
  const gt5 = function(n: any) { return n > 5; };
  const plusEq = function(w: any, x: any, y: any, z: any) { return w + x === y + z; };

  it('reports whether all predicates are satisfied by a given value', function() {
    const ok = allPass([odd, lt20, gt5]);
    expect(ok(7)).toEqual(true);
    expect(ok(9)).toEqual(true);
    expect(ok(10)).toEqual(false);
    expect(ok(3)).toEqual(false);
    expect(ok(21)).toEqual(false);
  });

  it('returns true on empty predicate list', function() {
    expect(allPass([])(3)).toEqual(true);
  });

  // TODO: Need to return curried function
  // it('returns a curried function whose arity matches that of the highest-arity predicate', function() {
  //   expect(allPass([odd, gt5, plusEq]).length).toEqual(4);
  //   expect(allPass([odd, gt5, plusEq])(9, 9, 9, 9)).toEqual(true);
  //   expect(allPass([odd, gt5, plusEq])(9)(9)(9)(9)).toEqual(true);
  // });

});