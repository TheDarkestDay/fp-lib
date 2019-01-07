import assert from 'assert';
import { eq } from '../helpers';
import { dropLast } from '../../lib';

describe('dropLast', function() {
  it('skips the last `n` elements from a list, returning the remainder', function() {
    eq(dropLast(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c', 'd']);
  });

  it('returns an empty array if `n` is too large', function() {
    eq(dropLast(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
  });

  it('returns an equivalent list if `n` is <= 0', function() {
    eq(dropLast(0, [1, 2, 3]), [1, 2, 3]);
    eq(dropLast(-1, [1, 2, 3]), [1, 2, 3]);
    eq(dropLast(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(dropLast(0, xs), xs);
    assert.notStrictEqual(dropLast(-1, xs), xs);
  });

  it('can operate on strings', function() {
    eq(dropLast(3, 'Ramda'), 'Ra');
  });

  // TODO: Need to figure out transducers
  // it('can act as a transducer', function() {
  //   var dropLast2 = dropLast(2);
  //   assert.deepEqual(into([], dropLast2, [1, 3, 5, 7, 9, 1, 2]), [1, 3, 5, 7, 9]);
  //   assert.deepEqual(into([], dropLast2, [1]), []);
  // });

});