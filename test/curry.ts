import { curry } from '../lib';

describe('curry', function() {
  it('curries a single value', function() {
    const f = curry(function(a: any, b: any, c: any, d: any) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
    const g = f(12);
    expect(g(3, 6, 2)).toEqual(15);
  });

  it('curries multiple values', function() {
    const f = curry(function(a: any, b: any, c: any, d: any) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
    const g = f(12, 3);
    expect(g(6, 2)).toEqual(15);
    const h = f(12, 3, 6);
    expect(h(2)).toEqual(15);
  });

  it('allows further currying of a curried function', function() {
    const f = curry(function(a: any, b: any, c: any, d: any) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
    const g = f(12);
    expect(g(3, 6, 2)).toEqual(15);
    const h = g(3);
    expect(h(6, 2)).toEqual(15);
    expect(g(3, 6)(2)).toEqual(15);
  });

  it('properly reports the length of the curried function', function() {
    const f = curry(function(a: any, b: any, c: any, d: any) {return (a + b * c) / d;});
    expect(f.length).toEqual(4);
    const g = f(12);
    expect(g.length).toEqual(3);
    const h = g(3);
    expect(h.length).toEqual(2);
    expect(g(3, 6).length).toEqual(1);
  });

  it('preserves context', function() {
    const ctx = {x: 10};
    const f = function(a: any, b: any) { return a + b * this.x; };
    const g = curry(f);

    expect(g.call(ctx, 2, 4)).toEqual(42);
    expect(g.call(ctx, 2).call(ctx, 4)).toEqual(42);
  });

  it('forwards extra arguments', function() {
    const f = function(a: any, b: any, c: any) {
      void c;
      return Array.prototype.slice.call(arguments);
    };
    const g = curry(f);

    expect(g(1, 2, 3)).toEqual([1, 2, 3]);
    expect(g(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1, 2)(3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1)(2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(g(1)(2)(3, 4)).toEqual([1, 2, 3, 4]);
  });
});