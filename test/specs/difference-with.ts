import { eq } from '../helpers';
import { differenceWith } from '../../lib';

describe('differenceWith', function() {
  const Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
  const Ro2 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 1}, {a: 2}, {a: 3}, {a: 4}];
  const So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
  const So2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}, {a: 3}, {a: 4}, {a: 5}, {a: 6}];
  const eqA = function(r: any, s: any) { return r.a === s.a; };
  const identical = function(a: any, b: any) { return a === b; };

  it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
    eq(differenceWith(eqA, Ro, So), [{a: 1}, {a: 2}]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function() {
    eq(differenceWith(eqA, Ro2, So2), [{a: 1}, {a: 2}]);
  });

  it('does not return a "sparse" array', function() {
    eq(differenceWith(identical, [1, 3, 2, 1, 3, 1, 2, 3], [3]).length, 2);
  });

});