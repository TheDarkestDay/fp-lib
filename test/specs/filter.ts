import { eq } from '../helpers';

import { filter } from '../../lib';

describe('filter', function() {
  const even = (x: any) => x % 2 === 0;

  it('reduces an array to those matching a filter', function() {
    eq(filter(even, [1, 2, 3, 4, 5]), [2, 4]);
  });

  it('returns an empty array if no element matches', function() {
    eq(filter((x: any) => x > 100, [1, 9, 99]), []);
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(filter((x: any) => x > 100, []), []);
  });

  it('filters objects', function() {
    const positive = (x: any) => x > 0;
    eq(filter(positive, {}), {});
    eq(filter(positive, {x: 0, y: 0, z: 0}), {});
    eq(filter(positive, {x: 1, y: 0, z: 0}), {x: 1});
    eq(filter(positive, {x: 1, y: 2, z: 0}), {x: 1, y: 2});
    eq(filter(positive, {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3});
  });

  it('dispatches to passed-in non-Array object with a `filter` method', function() {
    const f = {filter: function(f: any) { return f('called f.filter'); }};
    eq(filter(function(s: any) { return s; }, f), 'called f.filter');
  });
});