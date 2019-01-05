import { eq } from '../helpers';
import { always, cond, equals } from '../../lib';

describe('cond', function() {
  it('returns a function', function() {
    eq(typeof cond([]), 'function');
  });

  it('returns a conditional function', function() {
    var fn = cond([
      [equals(0),   always('water freezes at 0°C')],
      [equals(100), always('water boils at 100°C')],
      [always(true),           function(temp: any) { return 'nothing special happens at ' + temp + '°C'; }]
    ]);
    eq(fn(0), 'water freezes at 0°C');
    eq(fn(50), 'nothing special happens at 50°C');
    eq(fn(100), 'water boils at 100°C');
  });

  it('returns a function which returns undefined if none of the predicates matches', function() {
    var fn = cond([
      [equals('foo'), always(1)],
      [equals('bar'), always(2)]
    ]);
    eq(fn('quux'), undefined);
  });

  it('predicates are tested in order', function() {
    var fn = cond([
      [always(true), always('foo')],
      [always(true), always('bar')],
      [always(true), always('baz')]
    ]);
    eq(fn(), 'foo');
  });

  it('forwards all arguments to predicates and to transformers', function() {
    var fn = cond([
      [function(_: any, x: any) { return x === 42; }, function() { return arguments.length; }]
    ]);
    eq(fn(21, 42, 84), 3);
  });

  // TODO: Implement nAry
  // it('retains highest predicate arity', function() {
  //   var fn = cond([
  //     [nAry(2, T), T],
  //     [nAry(3, T), T],
  //     [nAry(1, T), T]
  //   ]);
  //   eq(fn.length, 3);
  // });

});