import { Pair, Dictionary } from './types';

export function fromPairs(pairs: Pair[]): Dictionary<any> {
  const result: any = {};

  pairs.forEach(([key, value]) => {
    result[key] = value;
  });

  return result;
}