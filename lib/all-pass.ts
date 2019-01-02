export function allPass(predicates: ((...args: any[]) => boolean)[]): (input: any) => boolean {
  return function(input: any): boolean {
    return predicates.every((predicate) => predicate(input));
  }
}