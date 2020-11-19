import { Subject, Observable, firstValueFrom } from '../rxjs';
import { pipe } from './pipe';
import { Operation } from './operation';

const VALUE_1 = 'VALUE_1';

describe('pipe', () => {
  describe('factory', () => {
    it('Should run without throwing', () => {
      const testFunc = () => pipe(new Subject());
      expect(testFunc).not.toThrow();
    });

    it('Should return a function', () => {
      const result = pipe(new Subject());
      expect(typeof result).toBe('function');
    });
  });

  describe('pipe function', () => {
    let subscribe: jest.Mock;
    let error: jest.Mock;
    let complete: jest.Mock;
    let source: Subject<string | void>;
    let piper: ReturnType<typeof pipe>;

    beforeEach(() => {
      subscribe = jest.fn();
      error = jest.fn();
      complete = jest.fn();
      source = new Subject();
      piper = pipe(source);
    });

    it('Should return an Observable', () => {
      const result = piper();
      expect(result instanceof Observable).toBeTruthy();
    });

    it('Should produce an operation to pipe callbacks', () => {
      const result = piper((operation) => {
        expect(operation instanceof Operation).toBeTruthy();
        return operation;
      });

      const sub = result.subscribe();
      source.next();
      sub.unsubscribe();
    });

    it('Should forward error', () => {
      const result = piper();
      const sub = result.subscribe(subscribe, error, complete);

      source.error(VALUE_1);
      sub.unsubscribe();

      expect(error).toBeCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, VALUE_1);
    });

    it('Should forward complete', () => {
      const result = piper();
      const sub = result.subscribe(subscribe, error, complete);

      source.complete();
      sub.unsubscribe();

      expect(complete).toBeCalledTimes(1);
    });

    it('Should emit value provided in operation', () => {
      const state = new Operation<string>(VALUE_1);

      const result = piper(() => state);
      const sub = result.subscribe(subscribe);
      source.next();
      sub.unsubscribe();

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_1);
    });

    it('Should skip value provided in skipped operation', () => {
      const state = new Operation<string>(VALUE_1);
      state.skip = true;

      const result = piper(() => state);
      const sub = result.subscribe(subscribe);
      source.next();
      sub.unsubscribe();

      expect(subscribe).toBeCalledTimes(0);
    });

    it('Should complete value provided in complete operation', () => {
      const state = new Operation<string>(VALUE_1);
      state.complete = true;

      const result = piper(() => state);
      const sub = result.subscribe(subscribe, undefined, complete);
      source.next(VALUE_1);
      sub.unsubscribe();

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_1);
      expect(complete).toBeCalledTimes(1);
    });

    it('Should capture thrown value and forward it as error', () => {
      const result = piper(() => {
        throw new Error(VALUE_1);
      });
      const sub = result.subscribe(subscribe, error);

      source.next();

      expect(error).toBeCalledTimes(1);
      expect(error.mock.calls[0][0] instanceof Error).toBeTruthy();
      expect(error.mock.calls[0][0].message).toBe(VALUE_1);

      sub.unsubscribe();
    });

    it('Should wait for promises to resolve in operators', async () => {
      const result = piper(async (op) => {
        await new Promise((res) => setTimeout(res, 0));
        return op;
      });

      const onValue = firstValueFrom(result);

      source.next(VALUE_1);

      const value = await onValue;

      expect(value).toBe(VALUE_1);
    });
  });
});
