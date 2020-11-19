import { Subscriber, Observable, Observer } from './observable';

export class Subject<T = void> extends Observable<T> implements Subscriber<T> {
  private _observers: Array<Observer<T>> = [];
  private _isComplete = false;

  constructor() {
    super((observer) => {
      if (this._isComplete) {
        observer.complete();
      }
      this._observers.push(observer);
      return () => (this._observers = this._observers.filter((c) => c !== observer));
    });
  }

  next(value: T) {
    for (const observer of this._observers) observer.next(value);
  }

  error(error?: any) {
    for (const observer of this._observers) observer.error(error);
  }

  complete() {
    this._isComplete = true;
    for (const observer of this._observers) observer.complete();
  }

  asObservable(): Observable<T> {
    return new Observable<T>((observer) => {
      const sub = this.subscribe(
        (value) => observer.next(value),
        (error) => observer.error(error),
        () => observer.complete(),
      );
      return () => sub.unsubscribe();
    });
  }
}
