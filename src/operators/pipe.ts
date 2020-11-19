import { Observable } from '../rxjs';
import { Operation } from './operation';
import { PipeFunc } from './pipe-func';

export const pipe: PipeFunc = (target$) => (...ops: any) => {
  return new Observable<any>((observer) => {
    const sub = target$.subscribe(
      async (value) => {
        try {
          let state: Operation<any> = new Operation(value);
          for (const op of ops) {
            const update = op(state);
            if (update.then) {
              state = await update;
            } else {
              state = update;
            }
            if (state.skip === true || state.complete === true) {
              break;
            }
          }
          if (state.skip) {
            return;
          }
          observer.next(state.value);
          if (state.complete === true) {
            observer.complete();
          }
        } catch (error) {
          observer.error(error);
        }
      },
      (error) => observer.error(error),
      () => observer.complete(),
    );
    return () => sub.unsubscribe();
  });
};
