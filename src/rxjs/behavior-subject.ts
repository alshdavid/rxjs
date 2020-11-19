import { Callback, noop } from './observable';
import { Subject } from './subject';

export interface ValueGetter<T> {
  getValue(): T;
}

export class BehaviorSubject<T = any> extends Subject<T> implements ValueGetter<T> {
  private _lastValue: T;

  constructor(initialValue: T) {
    super();
    this._lastValue = initialValue;
  }

  subscribe(callback: Callback<[T]> = noop, error: Callback<[T]> = noop, complete: Callback<[]> = noop) {
    callback(this._lastValue);
    return super.subscribe(callback, error, complete);
  }

  next(value: T) {
    this._lastValue = value;
    return super.next(value);
  }

  getValue(): T {
    return this._lastValue;
  }
}
