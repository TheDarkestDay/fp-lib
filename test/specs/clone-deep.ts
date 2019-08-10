import { cloneDeep } from '../../lib';
import clone from 'ramda/es/clone';

describe('cloneDeep', () => {
  it('should clone plain objects with primitive fields', () => {
    const obj = {
      a: 1,
      b: true,
      c: 'Hello'
    };

    const clonedObj = cloneDeep(obj);

    expect(clonedObj).not.toBe(obj);
    expect(clonedObj).toEqual(obj);
  });

  it('should clone plain objects recursively', () => {
    const obj = {
      a: 1,
      b: true,
      c: 'Hello',
      nestedObj: {
        d: 1,
        f: false,
        g: 'Bye'
      }
    };

    const clonedObj = cloneDeep(obj);

    expect(clonedObj).not.toBe(obj);
    expect(clonedObj).toEqual(obj);
  });

  it('should clone arrays', () => {
    const arr = [1, 2, 3];

    const clonedArr = cloneDeep(arr);

    expect(clonedArr).not.toBe(arr);
    expect(clonedArr).toEqual(arr);
  });

  it('should clone arrays recursively', () => {
    const arr = [1, 2, [3, 4, {num: 5}]];

    const clonedArr = cloneDeep(arr);

    expect(clonedArr).not.toBe(arr);
    expect(clonedArr).toEqual(arr);
  });

  it('should clone Number objects', () => {

  });

  it('should clone Boolean objects', () => {

  });

  it('should clone String objects', () => {

  });

  it('should clone Date objects', () => {

  });

  it('should clone RegExp objects', () => {

  });

  it('should clone Map objects', () => {

  });

  it('should clone Set objects', () => {

  });

  it('should clone WeakMap objects', () => {

  });

  it('should clone WeakSet objects', () => {

  });

  it('should clone typed arrays', () => {

  });

  it('should clone Arguments objects', () => {

  });

  it('should handle cyclic references', () => {

  });
});