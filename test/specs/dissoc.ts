import { eq } from '../helpers';
import { dissoc } from '../../lib';

describe('dissoc', function() {
  it('copies an object omitting the specified property', function() {
    eq(dissoc('b', {a: 1, b: 2, c: 3}), {a: 1, c: 3});
    eq(dissoc('d', {a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  });

  it('includes prototype properties', function() {
    class Rectangle {
      private width: number;
      private height: number;

      constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
      }

      area() {
        return this.width * this.height;
      }
    }

    const area = Rectangle.prototype.area;
    const rect = new Rectangle(7, 6);

    eq(dissoc('area', rect), {width: 7, height: 6});
    eq(dissoc('width', rect), {height: 6, area: area});
    eq(dissoc('depth', rect), {width: 7, height: 6, area: area});
  });

  it('coerces non-string types', function() {
    eq(dissoc(42, {a: 1, b: 2, 42: 3}), {a: 1, b: 2});
    eq(dissoc(null, {a: 1, b: 2, 'null': 3}), {a: 1, b: 2});
    eq(dissoc(undefined, {a: 1, b: 2, undefined: 3}), {a: 1, b: 2});
  });

});