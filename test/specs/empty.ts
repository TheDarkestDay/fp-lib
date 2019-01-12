import { eq } from '../helpers';
import { empty } from '../../lib';

describe('empty', function() {

  class Nothing {
    constructor() {
    }

    empty() {
      return new Nothing();
    }
  }

  class Just {
    private value: any;

    constructor(x: any) {
      this.value = x;
    }

    empty() {
      return new Nothing();
    }
  }

  it('dispatches to `empty` method', function() {
    eq(empty(new Nothing()).constructor, Nothing);
    eq(empty(new Just(123)).constructor, Nothing);
  });

  it('dispatches to `empty` function on constructor', function() {
    eq(empty(new Nothing()).constructor, Nothing);
    eq(empty(new Just(123)).constructor, Nothing);
  });

  it('returns empty array given array', function() {
    eq(empty([1, 2, 3]), []);
  });

  it('returns empty object given object', function() {
    eq(empty({x: 1, y: 2}), {});
  });

  it('returns empty string given string', function() {
    eq(empty('abc'), '');
    eq(empty(new String('abc')), '');
  });

  it('returns empty arguments object given arguments object', function() {
    const x = (function(...args) { return arguments; }(1, 2, 3));
    eq(empty(x), (function() { return arguments; }()));
  });

});