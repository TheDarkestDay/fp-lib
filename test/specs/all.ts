import { all } from '../../lib';

describe('all', function () {
  var even = function (n: any) { return n % 2 === 0; };
  var T = function () { return true; };
  var isFalse = function (x: any) { return x === false; };

  // Need to implement .into() for this
  // var intoArray = into([]);

  it('returns true if all elements satisfy the predicate', function () {
    expect(all(even, [2, 4, 6, 8, 10, 12])).toEqual(true);
    expect(all(isFalse, [false, false, false])).toEqual(true);
  });

  it('returns false if any element fails to satisfy the predicate', function () {
    expect(all(even, [2, 4, 6, 8, 9, 10])).toEqual(false);
  });

  it('returns true for an empty list', function () {
    expect((all(T, []))).toEqual(true);
  });

  // TODO: Need to implement .into() for this
  // it('returns true into array if all elements satisfy the predicate', function() {
  //   eq(intoArray(all(even), [2, 4, 6, 8, 10, 12]), [true]);
  //   eq(intoArray(all(isFalse), [false, false, false]), [true]);
  // });

  // it('returns false into array if any element fails to satisfy the predicate', function() {
  //   eq(intoArray(all(even), [2, 4, 6, 8, 9, 10]), [false]);
  // });

  // it('returns true into array for an empty list', function() {
  //   eq(intoArray(all(T), []), [true]);
  // });

  it('works with more complex objects', function () {
    var xs = [{ x: 'abc' }, { x: 'ade' }, { x: 'fghiajk' }];
    function len3(o: any) { return o.x.length === 3; }
    function hasA(o: any) { return o.x.indexOf('a') > -1; }
    expect(all(len3, xs)).toEqual(false);
    expect((all(hasA, xs))).toEqual(true);
  });
});