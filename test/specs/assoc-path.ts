import { assocPath } from '../../lib';

describe('assocPath', function() {
  it('makes a shallow clone of an object, overriding only what is necessary for the path', function() {
    const obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: [5, 6, 7], j: {k: 6, l: 7}}}, m: 8};
    const obj2 = assocPath(['f', 'g', 'i', 1], 42, obj1);
    expect(obj2.f.g.i).toEqual([5, 42, 7]);
    // Note: reference equality below!
    expect(obj2.a).toStrictEqual(obj1.a);
    expect(obj2.m).toStrictEqual(obj1.m);
    expect(obj2.f.g.h).toStrictEqual(obj1.f.g.h);
    expect(obj2.f.g.j).toStrictEqual(obj1.f.g.j);
  });

  it('is the equivalent of clone and setPath if the property is not on the original', function() {
    const obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    const obj2 = assocPath(['x', 0, 'y'], 42, obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: 4, f: 5, x: [{y: 42}]});
    // Note: reference equality below!
    expect(obj2.a).toStrictEqual(obj1.a);
    expect(obj2.b).toStrictEqual(obj1.b);
    expect(obj2.e).toStrictEqual(obj1.e);
    expect(obj2.f).toStrictEqual(obj1.f);
  });

  it('empty path replaces the the whole object', function() {
    expect(assocPath([], 3, {a: 1, b: 2})).toEqual(3);
  });

  it('replaces `undefined` with a new object', function() {
    expect(assocPath(['foo', 'bar', 'baz'], 42, {foo: undefined})).toEqual({foo: {bar: {baz: 42}}});
  });

  it('replaces `null` with a new object', function() {
    expect(assocPath(['foo', 'bar', 'baz'], 42, {foo: null})).toEqual({foo: {bar: {baz: 42}}});
  });

});