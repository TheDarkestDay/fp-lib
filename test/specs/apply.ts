import { apply } from '../../lib';

describe('apply', function() {
  it('applies function to argument list', function() {
    expect(apply(Math.max, [1, 2, 3, -99, 42, 6, 7])).toEqual(42);
  });

  it('provides no way to specify context', function() {
    const obj = {method: function() { return this === obj; }};
    expect(apply(obj.method, [])).toEqual(false);
    expect(apply(obj.method.bind(obj), [])).toEqual(true);
  });

});