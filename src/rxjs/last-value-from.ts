import { Subscriber } from './observable';

export const lastValueFrom = <T>(o: Subscriber<T>): Promise<T | undefined> => {
  return new Promise((res, rej) => {
    let lastValue: T | undefined;
    o.subscribe(
      (value) => (lastValue = value),
      (error) => rej(error),
      () => res(lastValue),
    );
  });
};
