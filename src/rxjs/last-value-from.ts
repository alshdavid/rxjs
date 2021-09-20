import { Subscriber } from './observable';

export const lastValueFrom = <T>(o: Subscriber<T>): Promise<T> => {
  return new Promise((res, rej) => {
    let lastValue: T | undefined;
    o.subscribe(
      (value) => (lastValue = value),
      (error) => rej(error),
      () => {
        if (!lastValue) {
          rej(new Error('Completed before value arrived'))
        } else {
          res(lastValue)
        }
      },
    );
  });
};
