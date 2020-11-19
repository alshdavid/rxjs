import { Observable, Subscriber } from './observable';
import { Subscription } from './subscription';

export type CombineLatest = {
  (): Observable<[]>;
  <T0>(s0: Subscriber<T0>): Observable<[T0]>;
  <T0, T1>(s0: Subscriber<T0>, s1: Subscriber<T1>): Observable<[T0, T1]>;
  <T0, T1, T2>(s0: Subscriber<T0>, s1: Subscriber<T1>, s2: Subscriber<T2>): Observable<[T0, T1, T2]>;
  <T0, T1, T2, T3>(s0: Subscriber<T0>, s1: Subscriber<T1>, s2: Subscriber<T2>, s3: Subscriber<T3>): Observable<
    [T0, T1, T2, T3]
  >;
  <T0, T1, T2, T3, T4>(
    s0: Subscriber<T0>,
    s1: Subscriber<T1>,
    s2: Subscriber<T2>,
    s3: Subscriber<T3>,
    s4: Subscriber<T4>,
  ): Observable<[T0, T1, T2, T3, T4]>;
  (...sources: Array<Subscriber<any>>): Observable<Array<any>>;
};

export const combineLatest: CombineLatest = (...sources: Array<Subscriber<any>>): Observable<any> => {
  return new Observable<any>((observer) => {
    const subscription = new Subscription();
    const set: Array<boolean | undefined> = new Array(sources.length);
    const buffer: Array<any> = new Array(sources.length);
    const next = (value: any) => !set.includes(undefined) && observer.next(value);
    for (let i = 0; i < sources.length; i++) {
      const s = sources[i].subscribe((value) => {
        buffer[i] = value;
        set[i] = true;
        next(buffer);
      });
      subscription.add(s);
    }
    return () => subscription.unsubscribe();
  });
};
