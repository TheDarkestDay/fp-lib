import { eq } from '../helpers';
import { dropWhile } from '../../lib';

describe('dropWhile', function() {
  it('skips elements while the function reports `true`', function() {
    eq(dropWhile(function(x: any) {return x < 5;}, [1, 3, 5, 7, 9]), [5, 7, 9]);
  });

  it('returns an empty list for an empty list', function() {
    eq(dropWhile(function() { return false; }, []), []);
    eq(dropWhile(function() { return true; }, []), []);
  });

  it('starts at the right arg and acknowledges undefined', function() {
    var sublist = dropWhile(function(x: any) {return x !== void 0;}, [1, 3, void 0, 5, 7]);
    eq(sublist.length, 3);
    eq(sublist[0], void 0);
    eq(sublist[1], 5);
    eq(sublist[2], 7);
  });

  it('can operate on strings', function() {
    eq(dropWhile(function(x: any) { return x !== 'd'; }, 'Ramda'), 'da');
  });

});