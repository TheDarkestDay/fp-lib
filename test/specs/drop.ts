import assert from 'assert';
import { eq } from '../helpers';
import { drop } from '../../lib';

describe('drop', function() {

  it('skips the first `n` elements from a list, returning the remainder', function() {
    eq(drop(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['d', 'e', 'f', 'g']);
  });

  it('returns an empty array if `n` is too large', function() {
    eq(drop(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
  });

  it('returns an equivalent list if `n` is <= 0', function() {
    eq(drop(0, [1, 2, 3]), [1, 2, 3]);
    eq(drop(-1, [1, 2, 3]), [1, 2, 3]);
    eq(drop(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    const xs = [1, 2, 3];

    assert.notStrictEqual(drop(0, xs), xs);
    assert.notStrictEqual(drop(-1, xs), xs);
  });

  it('can operate on strings', function() {
    eq(drop(3, 'Ramda'), 'da');
    eq(drop(4, 'Ramda'), 'a');
    eq(drop(5, 'Ramda'), '');
    eq(drop(6, 'Ramda'), '');
  });

});