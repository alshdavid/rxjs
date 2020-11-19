export type OperatorFunc<T1, T2> = (o: Operation<T1>) => Operation<T2> | Promise<Operation<T2>>;

export type UnaryFunc<T1, T2> = (v: T1) => T2;

export type CallbackFunc<T> = (v: T) => void;

export type PredicateFunc<T = any> = (value: T) => boolean;

export class Operation<T = void> {
  public complete: boolean = false;
  public skip: boolean = false;

  constructor(public value: T) {}
}
