import { curry } from './curry';

function _defaultTo(defaultValue: any, inputValue: any): any {
  if (inputValue === null || inputValue === undefined || (typeof inputValue === 'number' && isNaN(inputValue))) {
    return defaultValue;
  }

  return inputValue;
}

const defaultTo = curry(_defaultTo);

export { defaultTo };