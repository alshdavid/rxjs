import { Subscriber, Observable, SubscriberValue } from './observable';
import { Subscription } from './subscription';

export const merge = <T extends Array<Subscriber<any>>>(...sources: T): Observable<SubscriberValue<T[number]>> =>
  new Observable((observer) => {
    const subscription = new Subscription();
    const observe = () => [(v: any) => observer.next(v), (e: any) => observer.error(e), () => observer.complete()];
    for (const source of sources) {
      subscription.add(source.subscribe(...observe()));
    }
    return () => subscription.unsubscribe();
  });
