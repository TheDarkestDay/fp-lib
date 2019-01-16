import { eq } from '../helpers';
import { equals } from '../../lib';

describe('equals', function () {
  const a: any[] = [];
  const b = a;
  it('tests for deep equality of its operands', function () {
    eq(equals(100, 100), true);
    eq(equals(100, '100'), false);
    eq(equals([], []), true);
    eq(equals(a, b), true);
  });

  it('considers equal Boolean primitives equal', function () {
    eq(equals(true, true), true);
    eq(equals(false, false), true);
    eq(equals(true, false), false);
    eq(equals(false, true), false);
  });

  it('considers equivalent Boolean objects equal', function () {
    eq(equals(new Boolean(true), new Boolean(true)), true);
    eq(equals(new Boolean(false), new Boolean(false)), true);
    eq(equals(new Boolean(true), new Boolean(false)), false);
    eq(equals(new Boolean(false), new Boolean(true)), false);
  });

  it('never considers Boolean primitive equal to Boolean object', function () {
    eq(equals(true, new Boolean(true)), false);
    eq(equals(new Boolean(true), true), false);
    eq(equals(false, new Boolean(false)), false);
    eq(equals(new Boolean(false), false), false);
  });

  it('considers equal number primitives equal', function () {
    eq(equals(0, 0), true);
    eq(equals(0, 1), false);
    eq(equals(1, 0), false);
  });

  it('considers equivalent Number objects equal', function () {
    eq(equals(new Number(0), new Number(0)), true);
    eq(equals(new Number(0), new Number(1)), false);
    eq(equals(new Number(1), new Number(0)), false);
  });

  it('never considers number primitive equal to Number object', function () {
    eq(equals(0, new Number(0)), false);
    eq(equals(new Number(0), 0), false);
  });

  it('considers equal string primitives equal', function () {
    eq(equals('', ''), true);
    eq(equals('', 'x'), false);
    eq(equals('x', ''), false);
    eq(equals('foo', 'foo'), true);
    eq(equals('foo', 'bar'), false);
    eq(equals('bar', 'foo'), false);
  });

  it('considers equivalent String objects equal', function () {
    eq(equals(new String(''), new String('')), true);
    eq(equals(new String(''), new String('x')), false);
    eq(equals(new String('x'), new String('')), false);
    eq(equals(new String('foo'), new String('foo')), true);
    eq(equals(new String('foo'), new String('bar')), false);
    eq(equals(new String('bar'), new String('foo')), false);
  });

  it('never considers string primitive equal to String object', function () {
    eq(equals('', new String('')), false);
    eq(equals(new String(''), ''), false);
    eq(equals('x', new String('x')), false);
    eq(equals(new String('x'), 'x'), false);
  });

  it('handles objects', function () {
    eq(equals({}, {}), true);
    eq(equals({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
    eq(equals({ a: 2, b: 3 }, { b: 3, a: 2 }), true);
    eq(equals({ a: 2, b: 3 }, { a: 3, b: 3 }), false);
    eq(equals({ a: 2, b: 3, c: 1 }, { a: 2, b: 3 }), false);
  });

  it('considers equivalent Arguments objects equal', function () {
    const a = (function () { return arguments; }());
    const b = (function () { return arguments; }());
    const c = (function (...args: any[]) { return arguments; }(1, 2, 3));
    const d = (function (...args: any[]) { return arguments; }(1, 2, 3));

    eq(equals(a, b), true);
    eq(equals(b, a), true);
    eq(equals(c, d), true);
    eq(equals(d, c), true);
    eq(equals(a, c), false);
    eq(equals(c, a), false);
  });

  it('considers equivalent Error objects equal', function () {
    eq(equals(new Error('XXX'), new Error('XXX')), true);
    eq(equals(new Error('XXX'), new Error('YYY')), false);
    eq(equals(new Error('XXX'), new TypeError('XXX')), false);
    eq(equals(new Error('XXX'), new TypeError('YYY')), false);
  });

  // TODO: Need to find out how to handle regexes
  // it('handles regex', function () {
  //   eq(equals(/\s/, /\s/), true);
  //   eq(equals(/\s/, /\d/), false);
  //   eq(equals(/a/gi, /a/ig), true);
  //   eq(equals(/a/mgi, /a/img), true);
  //   eq(equals(/a/gi, /a/i), false);

  //   eq(equals(/\s/y, /\s/y), true);
  //   eq(equals(/a/mygi, /a/imgy), true);

  //   eq(equals(/\s/u, /\s/u), true);
  //   eq(equals(/a/mugi, /a/imgu), true);
  // });

  it('handles lists', function () {
    const listA = [1, 2, 3];
    const listB = [1, 3, 2];

    eq(equals([], {}), false);
    eq(equals(listA, listB), false);
  });

  // TODO: Need to find a way of handling cyclical structures
  // it('handles recursive data structures', function () {
  //   const c: any = {};
  //   c.v = c;

  //   const d: any = {};
  //   d.v = d;

  //   const e: any[] = [];
  //   e.push(e);

  //   const f: any[] = [];
  //   f.push(f);

  //   const nestA = { a: [1, 2, { c: 1 }], b: 1 };
  //   const nestB = { a: [1, 2, { c: 1 }], b: 1 };
  //   const nestC = { a: [1, 2, { c: 2 }], b: 1 };

  //   eq(equals(c, d), true);
  //   eq(equals(e, f), true);
  //   eq(equals(nestA, nestB), true);
  //   eq(equals(nestA, nestC), false);
  // });

  it('handles dates', function () {
    eq(equals(new Date(0), new Date(0)), true);
    eq(equals(new Date(1), new Date(1)), true);
    eq(equals(new Date(0), new Date(1)), false);
    eq(equals(new Date(1), new Date(0)), false);
  });

  it('should never consider number and dates equal', function () {
    eq(equals(new Date(1), 1), false);
    eq(equals(0, new Date(0)), false);
  });

  it('requires that both objects have the same enumerable properties with the same values', function () {
    const a1: any = [];
    const a2: any = [];
    a2.x = 0;

    const b1: any = new Boolean(false);
    const b2: any = new Boolean(false);
    b2.x = 0;

    const d1: any = new Date(0);
    const d2: any = new Date(0);
    d2.x = 0;

    const n1: any = new Number(0);
    const n2: any = new Number(0);
    n2.x = 0;

    // const r1: any = /(?:)/;
    // const r2: any = /(?:)/;
    // r2.x = 0;

    const s1: any = new String('');
    const s2: any = new String('');
    s2.x = 0;

    eq(equals(a1, a2), false);
    eq(equals(b1, b2), false);
    eq(equals(d1, d2), false);
    eq(equals(n1, n2), false);
    // eq(equals(r1, r2), false);
    eq(equals(s1, s2), false);
  });


  it('handles typed arrays', function () {
    const typArr1 = new ArrayBuffer(10) as unknown as any[];
    typArr1[0] = 1;
    const typArr2 = new ArrayBuffer(10) as unknown as any[];
    typArr2[0] = 1;
    const typArr3 = new ArrayBuffer(10) as unknown as any[];
    const intTypArr = new Int8Array(typArr1);
    typArr3[0] = 0;

    eq(equals(typArr1, typArr2), true);
    eq(equals(typArr1, typArr3), false);
    eq(equals(typArr1, intTypArr), false);
  });

  it('compares Promise objects by identity', function () {
    const p = Promise.resolve(42);
    const q = Promise.resolve(42);
    eq(equals(p, p), true);
    eq(equals(p, q), false);
  });

  // // TODO: Need to resolve typing issue with Map
  // // it('compares Map objects by value', function () {
  // //   eq(equals(new Map([]), new Map([])), true);
  // //   eq(equals(new Map([]), new Map([[1, 'a']])), false);
  // //   eq(equals(new Map([[1, 'a']]), new Map([])), false);
  // //   eq(equals(new Map([[1, 'a']]), new Map([[1, 'a']])), true);
  // //   eq(equals(new Map([[1, 'a'], [2, 'b']]), new Map([[2, 'b'], [1, 'a']])), true);
  // //   eq(equals(new Map([[1, 'a']]), new Map([[2, 'a']])), false);
  // //   eq(equals(new Map([[1, 'a']]), new Map([[1, 'b']])), false);
  // //   eq(equals(new Map([[1, 'a'], [2, new Map([[3, 'c']])]]), new Map([[1, 'a'], [2, new Map([[3, 'c']])]])), true);
  // //   eq(equals(new Map<any, any>([[1, 'a'], [2, new Map([[3, 'c']])]]), new Map([[1, 'a'], [2, new Map([[3, 'd']])]])), false);
  // //   eq(equals(new Map([[[1, 2, 3], [4, 5, 6]]]), new Map([[[1, 2, 3], [4, 5, 6]]])), true);
  // //   eq(equals(new Map([[[1, 2, 3], [4, 5, 6]]]), new Map([[[1, 2, 3], [7, 8, 9]]])), false);
  // // });

  // it('dispatches to `equals` method recursively in Map', function () {
  //   const a = new Map();
  //   const b = new Map();
  //   a.set(a, a);
  //   eq(equals(a, b), false);
  //   a.set(b, b);
  //   b.set(b, b);
  //   b.set(a, a);
  //   eq(equals(a, b), true);
  // });

  // it('compares Set objects by value', function () {
  //   eq(equals(new Set([]), new Set([])), true);
  //   eq(equals(new Set([]), new Set([1])), false);
  //   eq(equals(new Set([1]), new Set([])), false);
  //   eq(equals(new Set([1, 2]), new Set([2, 1])), true);
  //   eq(equals(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([3])])])), true);
  //   eq(equals(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([4])])])), false);
  //   eq(equals(new Set([[1, 2, 3], [4, 5, 6]]), new Set([[1, 2, 3], [4, 5, 6]])), true);
  //   eq(equals(new Set([[1, 2, 3], [4, 5, 6]]), new Set([[1, 2, 3], [7, 8, 9]])), false);
  // });

  // it('dispatches to `equals` method recursively in Set', function () {
  //   const a = new Set();
  //   const b = new Set();
  //   a.add(a);
  //   eq(equals(a, b), false);
  //   a.add(b);
  //   b.add(b);
  //   b.add(a);
  //   eq(equals(a, b), true);
  // });

  it('compares WeakMap objects by identity', function () {
    const m = new WeakMap([]);
    eq(equals(m, m), true);
    eq(equals(m, new WeakMap([])), false);
  });

  it('compares WeakSet objects by identity', function () {
    const s = new WeakSet([]);
    eq(equals(s, s), true);
    eq(equals(s, new WeakSet([])), false);
  });


  it('dispatches to `equals` method recursively', function () {
    class Left {
      value: any;

      constructor(x: any) {
        this.value = x;
      }

      equals(x: any): boolean {
        return x instanceof Left && equals(x.value, this.value);
      }
    }

    class Right {
      value: any;

      constructor(x: any) {
        this.value = x;
      }

      equals(x: any): boolean {
        return x instanceof Right && equals(x.value, this.value);
      }
    }

    eq(equals(new Left([42]), new Left([42])), true);
    eq(equals(new Left([42]), new Left([43])), false);
    eq(equals(new Left(42), { value: 42 }), false);
    eq(equals({ value: 42 }, new Left(42)), false);
    eq(equals(new Left(42), new Right(42)), false);
    eq(equals(new Right(42), new Left(42)), false);

    eq(equals([new Left(42)], [new Left(42)]), true);
    eq(equals([new Left(42)], [new Right(42)]), false);
    eq(equals([new Right(42)], [new Left(42)]), false);
    eq(equals([new Right(42)], [new Right(42)]), true);
  });

  it('is commutative', function () {
    class Point {
      x: any;
      y: any;

      constructor(x: any, y: any) {
        this.x = x;
        this.y = y;
      }

      equals(point: Point): boolean {
        return point instanceof Point &&
          this.x === point.x && this.y === point.y;
      }
    }

    class ColorPoint extends Point {
      x: any;
      y: any;
      color: any;

      constructor(x: any, y: any, color: any) {
        super(x, y);
        this.color = color;
      }

      equals(point: ColorPoint): boolean {
        return point instanceof ColorPoint &&
          this.x === point.x && this.y === point.y &&
          this.color === point.color;
      }
    }

    eq(equals(new Point(2, 2), new ColorPoint(2, 2, 'red')), false);
    eq(equals(new ColorPoint(2, 2, 'red'), new Point(2, 2)), false);
  });

});