import { Observable, Subscriber } from './observable';

export const fromEvent = <T = Event>(target: any, eventName: string): Subscriber<T> =>
  new Observable<T>((observer) => {
    const listener = (event: T) => observer.next(event);
    target.addEventListener(eventName, listener);
    return () => target.removeEventListener(eventName, listener);
  });
