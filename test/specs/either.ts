import { eq } from '../helpers';
import { either } from '../../lib';
 
describe('either', function() {
  it('combines two boolean-returning functions into one', function() {
    const even = function(x: any) {return x % 2 === 0;};
    const gt10 = function(x: any) {return x > 10;};
    const f = either(even, gt10);
    eq(f(8), true);
    eq(f(13), true);
    eq(f(7), false);
  });

  it('accepts functions that take multiple parameters', function() {
    const between = function(a: any, b: any, c: any) {return a < b && b < c;};
    const total20 = function(a: any, b: any, c: any) {return a + b + c === 20;};
    const f = either(between, total20);
    eq(f(4, 5, 8), true);
    eq(f(12, 2, 6), true);
    eq(f(7, 5, 1), false);
  });

  it('does not evaluate the second expression if the first one is true', function() {
    const T = function() { return true; };
    const Z = function() { effect = 'Z got evaluated'; };
    let effect = 'not evaluated';
    either(T, Z)();
    eq(effect, 'not evaluated');
  });
});