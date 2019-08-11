import { cloneDeep } from '../../lib';

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
    const num = new Number(4);

    const clonedNum = cloneDeep(num);

    expect(clonedNum).not.toBe(num);
    expect(clonedNum.valueOf()).toEqual(num.valueOf());
  });

  it('should clone Boolean objects', () => {
    const bool = new Boolean(true);

    const clonedBool = cloneDeep(bool);

    expect(clonedBool).not.toBe(bool);
    expect(clonedBool.valueOf()).toEqual(bool.valueOf());

  });

  it('should clone String objects', () => {
    const str = new String('test');

    const clonedStr = cloneDeep(str);

    expect(clonedStr).not.toBe(str);
    expect(clonedStr.valueOf()).toEqual(str.valueOf());
  });

  it('should clone Date objects', () => {
    const now = new Date();

    const clonedNow  = cloneDeep(now);

    expect(clonedNow).not.toBe(now);
    expect(clonedNow).toEqual(now);
  });

  it('should clone RegExp objects', () => {
    const re = new RegExp(/(\w+)\s(\w+)/, 'ig');
    
    const clonedRe = cloneDeep(re);

    expect(clonedRe).not.toBe(re);
    expect(clonedRe).toEqual(re);
    expect(clonedRe.ignoreCase).toEqual(re.ignoreCase);
    expect(clonedRe.sticky).toEqual(re.sticky);
    expect(clonedRe.global).toEqual(re.global);
    expect(clonedRe.multiline).toEqual(re.multiline);
    expect(clonedRe.unicode).toEqual(re.unicode);
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
    const a: any = {
      f: 2,
      c: null
    };
    const b = {
      e: 1,
      d: a
    };
    a.c = b;

    const clonedA = cloneDeep(a);

    expect(clonedA).not.toBe(a);
    expect(clonedA).toEqual(a);

    b.d = 5;
    expect(clonedA).not.toEqual(a);
  });

  it('should retain prototype', () => {
    class Animal {};

    const dog = new Animal();

    const clonedDog = cloneDeep(dog);

    expect(clonedDog).not.toBe(dog);
    expect(clonedDog).toEqual(dog);
    expect(clonedDog instanceof Animal).toEqual(true);
  });

  it('should clone instances', () => {
    class Animal {
      constructor(public age: number) {
      }
    };

    const dog = new Animal(5);

    const clonedDog = cloneDeep(dog);

    clonedDog.age = 10;

    expect(dog.age).toEqual(5);
    expect(clonedDog.age).toEqual(10);
  });

  it('should clone property descriptors', () => {

  });
});