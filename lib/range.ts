import { curry } from './curry';

function _range(min: number, max: number): number[] {
  const result = [];

  for (let i = min; i < max; i++) {
    result.push(i);
  }

  return result;
}

const range = curry(_range);

export { range };