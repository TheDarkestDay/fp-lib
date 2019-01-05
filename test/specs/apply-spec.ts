import { add, always, applySpec, prop } from '../../lib';

describe('applySpec', function () {
  const inc = function (x: number) { return x + 1 };
  const dec = function (x: number) { return x - 1 };

  it('works with empty spec', function () {
    expect(applySpec({})()).toEqual({});
  });

  it('works with unary functions', function () {
    expect(applySpec({ v: inc, u: dec })(1)).toEqual({ v: 2, u: 0 });
  });

  it('works with binary functions', function () {
    expect(applySpec({ sum: add })(1, 2)).toEqual({ sum: 3 });
  });

  it('works with nested specs', function () {
    expect(applySpec({ unnested: always(0), nested: { sum: add } })(1, 2)).toEqual({ unnested: 0, nested: { sum: 3 } });
  });

  it('works with a spec defining a map key', function () {
    expect(applySpec({ map: prop('a') })({ a: 1 })).toEqual({ map: 1 });
  });

  // TODO: Implement nAry
  // it('retains the highest arity', function () {
  //   const f = applySpec({ f1: nAry(2, T), f2: nAry(5, T) });
  //   eq(f.length, 5);
  // });

  it('returns a curried function', function () {
    expect(applySpec({ sum: add })(1)(2)).toEqual({ sum: 3 });
  });
});