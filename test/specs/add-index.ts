import { eq } from '../helpers';
import R from 'ramda';

import { addIndex, all, compose, filter, gt, map, multiply } from '../../lib';

describe('addIndex', function() {
  describe('unary functions like `map`', function() {
    const times2 = function(x: number) {return x * 2;};
    const addIndexParam = function(x: number, idx: number) {return x + idx;};
    const squareEnds = function(x: number, idx: number, list: number[]) {
      return (idx === 0 || idx === list.length - 1) ? x * x : x;
    };
    const mapIndexed = addIndex(map);

    it('works just like a normal map', function() {
      eq(mapIndexed(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('passes the index as a second parameter to the callback', function() {
      eq(mapIndexed(addIndexParam, [8, 6, 7, 5, 3, 0, 9]), [8, 7, 9, 8, 7, 5, 15]); // [8 + 0, 6 + 1...]
    });

    it('passes the entire list as a third parameter to the callback', function() {
      eq(mapIndexed(squareEnds, [8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });

    it('acts as a curried function', function() {
      const makeSquareEnds = mapIndexed(squareEnds);
      eq(makeSquareEnds([8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });

  });

  describe('binary functions like `reduce`', function() {
    const reduceIndexed = addIndex(R.reduce);
    const timesIndexed = function(tot: number, num: number, idx: number) {return tot + (num * idx);};
    const objectify = function(acc: any, elem: any, idx: number) { acc[elem] = idx; return acc;};

    it('passes the index as a third parameter to the predicate', function() {
      eq(reduceIndexed(timesIndexed, 0, [1, 2, 3, 4, 5]), 40);
      eq(reduceIndexed(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
      const list = [1, 2, 3];
      reduceIndexed(function(acc: number, x: number, idx: number, ls: number[]) {
        eq(ls, list);
        return acc;
      }, 0, list);
    });

  });

  describe('works with functions like `all` that do not typically have index applied', function() {
    const allIndexed = addIndex(all);
    const superDiagonal = allIndexed(gt);
    it('passes the index as a second parameter', function() {
      eq(superDiagonal([8, 6, 5, 4, 9]), true); // 8 > 0, 6 > 1, 5 > 2, 4 > 3, 9 > 5
      eq(superDiagonal([8, 6, 1, 3, 9]), false); //  1 !> 2, 3 !> 3
    });

  });

  describe('works with arbitrary user-defined functions', function() {
    const mapFilter = function(m: Function, f: Function, list: any[]) {
      return filter(compose(f, m), list);
    };
    const mapFilterIndexed = addIndex(mapFilter);
    it('passes the index as an additional parameter', function() {
      eq(mapFilterIndexed(
        multiply,
        R.gt(R.__, 13),
        [8, 6, 7, 5, 3, 0, 9]
      ), [7, 5, 9]); // 2 * 7 > 13, 3 * 5 > 13, 6 * 9 > 13
    });

  });

});