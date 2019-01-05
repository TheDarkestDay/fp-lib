import * as assert from 'assert';

import { compose, map, multiply } from '../../lib';

describe('compose', function() {
  it('is a variadic function', function() {
    expect(typeof compose).toEqual('function');
    expect(compose.length).toEqual(0);
  });

  it('performs right-to-left function composition', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    const f = compose(map, multiply, parseInt);

    expect(f.length).toEqual(2);
    expect(f('10')([1, 2, 3])).toEqual([10, 20, 30]);
    expect(f('10', 2)([1, 2, 3])).toEqual([2, 4, 6]);
  });

  it('passes context to functions', function() {
    function x(val: any) {
      return this.x * val;
    }
    function y(val: any) {
      return this.y * val;
    }
    function z(val: any) {
      return this.z * val;
    }
    const context = {
      a: compose(x, y, z),
      x: 4,
      y: 2,
      z: 1
    };
    expect(context.a(5)).toEqual(40);
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { compose(); },
      function(err: Error) {
        return err.constructor === Error &&
               err.message === 'compose requires at least one argument';
      }
    );
  });

  it('can be applied to one argument', function() {
    const f = function(a: any, b: any, c: any) { return [a, b, c]; };
    const g = compose(f);
    expect(g.length).toEqual(3);
    expect(g(1, 2, 3)).toEqual([1, 2, 3]);
  });

});