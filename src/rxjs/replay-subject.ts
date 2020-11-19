import { Callback, noop } from './observable';
import { Subject } from './subject';

export class ReplaySubject<T = any> extends Subject<T> {
  private _buffer: Array<T> = [];
  private _bufferLength: number;

  constructor(bufferLength: number = -1) {
    super();
    this._bufferLength = bufferLength;
  }

  subscribe(callback: Callback<[T]> = noop, error: Callback<[T]> = noop, complete: Callback<[]> = noop) {
    this._buffer.forEach((v) => callback(v));
    return super.subscribe(callback, error, complete);
  }

  public next(value: T) {
    if (this._bufferLength !== -1 && this._buffer.length === this._bufferLength) {
      this._buffer.shift();
      this._buffer.push(value);
    } else {
      this._buffer.push(value);
    }
    super.next(value);
  }
}
