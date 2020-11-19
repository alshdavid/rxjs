import { Observable } from 'rxjs';
import { Subscriber } from '../rxjs';

export const toObservable = <T>(source: Subscriber<T>): Observable<T> =>
  new Observable((observer) => {
    const sub = source.subscribe(
      (value) => observer.next(value),
      (error) => observer.error(error),
      () => observer.complete(),
    );
    return () => sub.unsubscribe();
  });
