import * as assert from 'assert';

import { last } from '../../lib';

describe('last', function() {

  it('returns the last element of an ordered collection', function() {
    expect(last([1, 2, 3])).toEqual(3);
    expect(last([1, 2])).toEqual(2);
    expect(last([1])).toEqual(1);
    expect(last([])).toEqual(undefined);

    expect(last('abc')).toEqual('c');
    expect(last('ab')).toEqual('b');
    expect(last('a')).toEqual('a');
    expect(last('')).toEqual('');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { last(null); }, TypeError);
    assert.throws(function() { last(undefined); }, TypeError);
  });

});