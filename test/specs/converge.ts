import { eq } from '../helpers';
import { add, converge } from '../../lib';  

describe('converge', function() {
  const mult = function(a: any, b: any) {return a * b;};

  const f1 = converge(mult, [
    function(a: any) { return a; },
    function(a: any) { return a; }
  ]);
  const f2 = converge(mult, [
    function(a: any) { return a; },
    function(a: any, b: any) { return b; }
  ]);
  const f3 = converge(mult, [
    function(a: any) { return a; },
    function(a: any, b: any, c: any) { return c; }
  ]);

  it('passes the results of applying the arguments individually to two separate functions into a single one', function() {
    eq(converge(mult, [add(1), add(3)])(2), 15); // mult(add1(2), add3(2)) = mult(3, 5) = 3 * 15;
  });

  it('returns a function with the length of the "longest" argument', function() {
    eq(f1.length, 1);
    eq(f2.length, 2);
    eq(f3.length, 3);
  });

  it('passes context to its functions', function() {
    const a = function(x: any) { return this.f1(x); };
    const b = function(x: any) { return this.f2(x); };
    const c = function(x: any, y: any) { return this.f3(x, y); };
    const d = converge(c, [a, b]);
    const context = {f1: add(1), f2: add(2), f3: add};
    eq(a.call(context, 1), 2);
    eq(b.call(context, 1), 3);
    eq(d.call(context, 1), 5);
  });

  // it('returns a curried function', function() {
  //   eq(f2(6)(7), 42);
  //   eq(f3(__).length, 3);
  // });

  it('works with empty functions list', function() {
    const fn = converge(function() { return arguments.length; }, []);
    eq(fn.length, 0);
    eq(fn(), 0);
  });

});