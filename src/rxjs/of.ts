import { Observable } from './observable';

export const of = <T = void>(...args: Array<T>): Observable<T> => {
  return new Observable((observer) => {
    for (const arg of args) {
      observer.next(arg);
    }
  });
};
