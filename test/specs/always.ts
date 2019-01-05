import { always } from '../../lib';

describe('always', function() {
  it('returns a function that returns the object initially supplied', function() {
    var theMeaning = always(42);
    expect(theMeaning()).toEqual(42);
    expect(theMeaning(10)).toEqual(42);
    expect(theMeaning(false)).toEqual(42);
  });

  it('works with various types', function() {
    expect(always(false)()).toEqual(false);
    expect(always('abc')()).toEqual('abc');
    expect(always({a: 1, b: 2})()).toEqual({a: 1, b: 2});
    const obj = {a: 1, b: 2};
    expect(always(obj)()).toEqual(obj);
    const now = new Date(1776, 6, 4);
    expect(always(now)()).toEqual(new Date(1776, 6, 4));
    expect(always(undefined)()).toEqual(undefined);
  });

});