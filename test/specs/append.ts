import { append } from '../../lib';

describe('append', function() {
  it('adds the element to the end of the list', function() {
    expect(append('z', ['x', 'y'])).toEqual(['x', 'y', 'z']);
    expect((append(['a', 'z'], ['x', 'y']))).toEqual(['x', 'y', ['a', 'z']]);
  });

  it('works on empty list', function() {
    expect(append(1, [])).toEqual([1]);
  });

});