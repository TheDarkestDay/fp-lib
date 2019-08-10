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
});