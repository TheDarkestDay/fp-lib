import { eq } from '../helpers';
import { eqProps, equals } from '../../lib';

describe('eqProps', function() {
  class Just {
    private value: any;

    constructor(x: any) {
      this.value = x;
    }

    equals(x: any) {
      return x instanceof Just && equals(x.value, this.value);
    }
  }

  it('reports whether two objects have the same value for a given property', function() {
    eq(eqProps('name', {name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
    eq(eqProps('name', {name: 'fred', age: 10}, {name: 'franny', age: 10}), false);
  });

  it('has equals semantics', function() {
    // TODO: Need to handle -0 case in .equals()
    // eq(eqProps('value', {value: 0}, {value: -0}), false);
    // eq(eqProps('value', {value: -0}, {value: 0}), false);
    eq(eqProps('value', {value: NaN}, {value: NaN}), true);
    eq(eqProps('value', {value: new Just([42])}, {value: new Just([42])}), true);
  });

});