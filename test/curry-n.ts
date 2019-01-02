import { curryN } from '../lib';

describe('curryN', function() {
  function source(a: any, b: any, c: any, d: any) {
    void d;
    return a * b * c;
  }
  it('accepts an arity', function() {
    const curried = curryN(3, source);
    expect(curried(1)(2)(3)).toEqual(6);
    expect(curried(1, 2)(3)).toEqual(6);
    expect(curried(1)(2, 3)).toEqual(6);
    expect(curried(1, 2, 3)).toEqual(6);
  });

  it('can be partially applied', function() {
    const curry3 = curryN(3);
    const curried = curry3(source);
    expect(curried.length).toEqual(3);
    expect(curried(1)(2)(3)).toEqual(6);
    expect(curried(1, 2)(3)).toEqual(6);
    expect(curried(1)(2, 3)).toEqual(6);
    expect(curried(1, 2, 3)).toEqual(6);
  });

  it('preserves context', function() {
    const ctx = {x: 10};
    const f = function(a: any, b: any) { return a + b * this.x; };
    const g = curryN(2, f);

    expect(g.call(ctx, 2, 4)).toEqual(42);
    expect(g.call(ctx, 2).call(ctx, 4)).toEqual(42);
  });

  // TODO: Need to implement support of functional placeholders for .curry()
  // it('supports __ placeholder', function() {
  //   const f = function() { return Array.prototype.slice.call(arguments); };
  //   const g = curryN(3, f);
  //   const _ = __;

  //   eq(g(1)(2)(3), [1, 2, 3]);
  //   eq(g(1)(2, 3), [1, 2, 3]);
  //   eq(g(1, 2)(3), [1, 2, 3]);
  //   eq(g(1, 2, 3), [1, 2, 3]);

  //   eq(g(_, 2, 3)(1), [1, 2, 3]);
  //   eq(g(1, _, 3)(2), [1, 2, 3]);
  //   eq(g(1, 2, _)(3), [1, 2, 3]);

  //   eq(g(1, _, _)(2)(3), [1, 2, 3]);
  //   eq(g(_, 2, _)(1)(3), [1, 2, 3]);
  //   eq(g(_, _, 3)(1)(2), [1, 2, 3]);

  //   eq(g(1, _, _)(2, 3), [1, 2, 3]);
  //   eq(g(_, 2, _)(1, 3), [1, 2, 3]);
  //   eq(g(_, _, 3)(1, 2), [1, 2, 3]);

  //   eq(g(1, _, _)(_, 3)(2), [1, 2, 3]);
  //   eq(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
  //   eq(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

  //   eq(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
  //   eq(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
  // });

  // it('supports @@functional/placeholder', function() {
  //   const f = function() { return Array.prototype.slice.call(arguments); };
  //   const g = curryN(3, f);
  //   const _ = {'@@functional/placeholder': true, x: Math.random()};

  //   eq(g(1)(2)(3), [1, 2, 3]);
  //   eq(g(1)(2, 3), [1, 2, 3]);
  //   eq(g(1, 2)(3), [1, 2, 3]);
  //   eq(g(1, 2, 3), [1, 2, 3]);

  //   eq(g(_, 2, 3)(1), [1, 2, 3]);
  //   eq(g(1, _, 3)(2), [1, 2, 3]);
  //   eq(g(1, 2, _)(3), [1, 2, 3]);

  //   eq(g(1, _, _)(2)(3), [1, 2, 3]);
  //   eq(g(_, 2, _)(1)(3), [1, 2, 3]);
  //   eq(g(_, _, 3)(1)(2), [1, 2, 3]);

  //   eq(g(1, _, _)(2, 3), [1, 2, 3]);
  //   eq(g(_, 2, _)(1, 3), [1, 2, 3]);
  //   eq(g(_, _, 3)(1, 2), [1, 2, 3]);

  //   eq(g(1, _, _)(_, 3)(2), [1, 2, 3]);
  //   eq(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
  //   eq(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

  //   eq(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
  //   eq(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
  // });

  it('forwards extra arguments', function() {
    const f = function() { return Array.prototype.slice.call(arguments); };
    const g = curryN(3, f);

    expect(g(1, 2, 3)).toEqual([1, 2, 3]);
    expect(g(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1, 2)(3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1)(2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1)(2)(3, 4)).toEqual([1, 2, 3, 4]);
  });

});