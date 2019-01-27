import * as assert from 'assert';
import { eq } from '../helpers';

import { flatten, range } from '../../lib';

describe('flatten', function() {
  it('turns a nested list into one flat list', function() {
    let nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    eq(flatten(nest), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
    eq(flatten(nest), [3, 2, 1, 0, -1, -2, -3]);
    eq(flatten([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  });

  it('is not destructive', function() {
    const nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    assert.notStrictEqual(flatten(nest), nest);
  });

  it('handles ridiculously large inputs', function() {
    eq(flatten([new Array(1000000), range(0, 56000), 5, 1, 3]).length, 1056003);
  }, 10000);

  it('handles array-like objects', function() {
    const o: any = {length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']]};
    eq(flatten(o), [1, 2, 3, 'a', 'b', 'c', 'd', 'e']);
  });

  it('flattens an array of empty arrays', function() {
    eq(flatten([[], [], []]), []);
    eq(flatten([]), []);
  });

});