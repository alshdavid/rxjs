import { Subscriber } from './observable';
import { Unsubscriber } from './subscription';

export const firstValueFrom = async <T>(source: Subscriber<T>): Promise<T | undefined> => {
  let done = false;
  let sub: Unsubscriber | undefined;

  const response = new Promise<T>((resolve, reject) => {
    sub = source.subscribe(
      (value) => {
        done = true;
        resolve(value);
      },
      (error) => reject(error),
      () => {
        if (!done) resolve();
      },
    );
  });

  const result = await response;

  if (sub && done) {
    sub.unsubscribe();
  }

  return result;
};
