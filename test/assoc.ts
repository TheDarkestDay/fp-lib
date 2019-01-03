import { assoc } from '../lib';

describe('assoc', function() {
  it('makes a shallow clone of an object, overriding only the specified property', function() {
    const obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    const obj2 = assoc('e', {x: 42}, obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5});
    // Note: reference equality below!
    expect(obj2.a).toStrictEqual(obj1.a);
    expect(obj2.b).toStrictEqual(obj1.b);
    expect(obj2.f).toStrictEqual(obj1.f);
  });

  it('is the equivalent of clone and set if the property is not on the original', function() {
    const obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    const obj2 = assoc('z', {x: 42}, obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: 4, f: 5, z: {x: 42}});
    // Note: reference equality below!
    expect(obj2.a).toStrictEqual(obj1.a);
    expect(obj2.b).toStrictEqual(obj1.b);
    expect(obj2.f).toStrictEqual(obj1.f);
  });

});