import { prop } from '../../lib';

describe('prop', function() {
  const fred = {name: 'Fred', age: 23};

  it('returns a function that fetches the appropriate property', function() {
    const nm = prop('name');
    expect(typeof nm).toEqual('function');
    expect(nm(fred)).toEqual('Fred');
  });

  // TODO: Implement .path()
  // it('shows the same behaviour as path for an undefined object', function() {
  //   let propResult, propException, pathResult, pathException;
  //   try {
  //     propResult = prop('name', undefined);
  //   } catch (e) {
  //     propException = e;
  //   }

  //   try {
  //     pathResult = path(['name'], undefined);
  //   } catch (e) {
  //     pathException = e;
  //   }

  //   expect(propResult).toEqual(pathResult);
  //   expect(propException).toEqual(pathException);
  // });
});