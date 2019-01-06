import assert from 'assert';
import { eq } from '../helpers';
import { construct } from '../../lib';
 
describe('construct', function() {
  const Rectangle = function(w: any, h: any) {this.width = w; this.height = h;};
  Rectangle.prototype.area = function() {return this.width * this.height;};

  it('turns a constructor function into one that can be called without `new`', function() {
    const rect = construct(Rectangle);
    const r1 = rect(3, 4);
    eq(r1.constructor, Rectangle);
    eq(r1.width, 3);
    eq(r1.area(), 12);

    const regex = construct(RegExp);
    const word = regex('word', 'gi');
    eq(word.constructor, RegExp);
    eq(word.source, 'word');
    eq(word.global, true);
  });

  it('can be used to create Date object', function() {
    const date = construct(Date)(1984, 3, 26, 0, 0, 0, 0);
    eq(date.constructor, Date);
    eq(date.getFullYear(), 1984);
  });

  it('supports constructors with no arguments', function() {
    function Foo() {}
    const foo = construct(Foo)();
    eq(foo.constructor, Foo);
  });

  it('does not support constructor with greater than ten arguments', function() {
    assert.throws(function() {
      function Foo($0: any, $1: any, $2: any, $3: any, $4: any, $5: any, $6: any, $7: any, $8: any, $9: any, $10: any) {
        this.eleventh = $10;
      }
      construct(Foo);
    }, function(err: Error) {
      return (err instanceof Error &&
              err.message === 'Constructor with greater than ten arguments');
    });
  });

  it('returns a curried function', function() {
    const rect = construct(Rectangle);
    const rect3 = rect(3);
    const r1 = rect3(4);
    eq(r1.constructor, Rectangle);
    eq(r1.width, 3);
    eq(r1.height, 4);
    eq(r1.area(), 12);

    const regex = construct(RegExp);
    const word = regex('word');
    const complete = word('gi');
    eq(complete.constructor, RegExp);
    eq(complete.source, 'word');
    eq(complete.global, true);
  });

});