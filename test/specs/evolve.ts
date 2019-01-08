import { eq } from '../helpers';
import { add, evolve } from '../../lib';

describe('evolve', function() {
  it('creates a new object by evolving the `object` according to the `transformation` functions', function() {
    const transf   = {elapsed: add(1), remaining: add(-1)};
    const object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    const expected = {name: 'Tomato', elapsed: 101, remaining: 1399};
    eq(evolve(transf, object), expected);
  });

  it('does not invoke function if object does not contain the key', function() {
    const transf   = {n: add(1), m: add(1)};
    const object   = {m: 3};
    const expected = {m: 4};
    eq(evolve(transf, object), expected);
  });

  it('is not destructive', function() {
    const transf   = {elapsed: add(1), remaining: add(-1)};
    const object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    const expected = {name: 'Tomato', elapsed: 100, remaining: 1400};
    evolve(transf, object);
    eq(object, expected);
  });

  it('is recursive', function() {
    const transf   = {nested: {second: add(-1), third: add(1)}};
    const object   = {first: 1, nested: {second: 2, third: 3}};
    const expected = {first: 1, nested: {second: 1, third: 4}};
    eq(evolve(transf, object), expected);
  });

  it('ignores primitive value transformations', function() {
    const transf   = {n: 2, m: 'foo'};
    const object   = {n: 0, m: 1};
    const expected = {n: 0, m: 1};
    eq(evolve(transf, object), expected);
  });

  it('ignores null transformations', function() {
    const transf: any   = {n: null};
    const object   = {n: 0};
    const expected = {n: 0};
    eq(evolve(transf, object), expected);
  });

  it('creates a new array by evolving the `array` according to the `transformation` functions', function() {
    const transf   = [add(1), add(-1)];
    const object   = [100, 1400];
    const expected = [101, 1399];
    eq(evolve(transf, object), expected);
  });

});