import { PredicateFunc, OperatorFunc } from './operation';

export const first = <T>(predicate?: PredicateFunc<T>): OperatorFunc<T, T> => (op) => {
  if (!predicate) {
    op.complete = true;
  } else if (predicate(op.value) === true) {
    op.complete = true;
  } else {
    op.skip = true;
  }
  return op;
};
