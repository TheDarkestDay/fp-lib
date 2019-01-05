import { flip } from '../../lib';

describe('flip', function() {
  it('returns a function which inverts the first two arguments to the supplied function', function() {
    const f = function(a: any, b: any, c: any) {return a + ' ' + b + ' ' + c;};
    const g = flip(f);
    expect(f('a', 'b', 'c')).toEqual('a b c');
    expect(g('a', 'b', 'c')).toEqual('b a c');
  });

  it('returns a curried function', function() {
    const f = function(a: any, b: any, c: any) {return a + ' ' + b + ' ' + c;};
    const g = flip(f)('a');
    expect(g('b', 'c')).toEqual('b a c');
  });

  it('returns a function with the correct arity', function() {
    const f2 = function(a: any, b: any) {return a + ' ' + b;};
    const f3 = function(a: any, b: any, c: any) {return a + ' ' + b + ' ' + c;};
    expect(flip(f2).length).toEqual(2);
    expect(flip(f3).length).toEqual(3);
  });
});

describe('flip properties', function() {
  // TODO: Need to implement .equals()
  // jsv.property('inverts first two arguments', funcN(3), jsv.json, jsv.json, jsv.json, function(f, a, b, c) {
  //   var g = flip(f);
  //   return R.equals(f(a, b, c), g(b, a, c));
  // });
});