import { add, adjust } from '../../lib';

describe('adjust', function() {
  it('applies the given function to the value at the given index of the supplied array', function() {
    expect(adjust(2, add(1), [0, 1, 2, 3])).toEqual([0, 1, 3, 3]);
  });

  it('offsets negative indexes from the end of the array', function() {
    expect(adjust(-3, add(1), [0, 1, 2, 3])).toEqual([0, 2, 2, 3]);
  });

  it('returns the original array if the supplied index is out of bounds', function() {
    const list = [0, 1, 2, 3];
    expect(adjust(4, add(1), list)).toEqual(list);
    expect(adjust(-5, add(1), list)).toEqual(list);
  });

  it('does not mutate the original array', function() {
    const list = [0, 1, 2, 3];
    expect(adjust(2, add(1), list)).toEqual([0, 1, 3, 3]);
    expect(list).toEqual([0, 1, 2, 3]);
  });

  it('accepts an array-like object', function() {
    function args(a: any, b: any, c: any, d: any) {
      return arguments;
    }

    expect(adjust(2, add(1), args(0, 1, 2, 3))).toEqual([0, 1, 3, 3]);
  });

});