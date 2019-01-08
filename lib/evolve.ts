import { copyShallow, transform} from './internal';
import { curry } from './curry';

function _evolve(transformation: Object, obj: Object) : Object {
  const result = copyShallow(obj);

  transform(transformation, result);

  return result;
}

const evolve = curry(_evolve);

export { evolve };