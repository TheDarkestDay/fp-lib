import { eq } from '../helpers';
import { eqBy, equals, identity } from '../../lib';

describe('eqBy', function() {

  class Just {
    private value: any;

    constructor(x: any) {
      this.value = x;
    }

    equals(x: any) {
      return x instanceof Just && equals(x.value, this.value);
    }
  }

  it('determines whether two values map to the same value in the codomain', function() {
    eq(eqBy(Math.abs, 5, 5), true);
    eq(eqBy(Math.abs, 5, -5), true);
    eq(eqBy(Math.abs, -5, 5), true);
    eq(eqBy(Math.abs, -5, -5), true);
    eq(eqBy(Math.abs, 42, 99), false);
  });

  it('has equals semantics', function() {
    // TODO: Need to figure out case with -0 and 0
    // eq(eqBy(identity, 0, -0), false);
    // eq(eqBy(identity, -0, 0), false);
    eq(eqBy(identity, NaN, NaN), true);
    eq(eqBy(identity, new Just([42]), new Just([42])), true);
  });

});