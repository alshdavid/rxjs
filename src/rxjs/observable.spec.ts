import { Observable, NextFn, Observer, noop } from './observable';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('Observable', () => {
  describe('constructor', () => {
    it('Should construct without throwing', () => {
      const testFunc = () => new Observable(jest.fn());
      expect(testFunc).not.toThrow();
    });

    it('Should not run setup function when there are no subscribers', () => {
      const up = jest.fn();
      /* tslint:disable-next-line */
      new Observable(() => {
        up();
      });

      expect(up).toBeCalledTimes(0);
    });

    it('Should not run teardown function when there are no subscribers', () => {
      const down = jest.fn();
      /* tslint:disable-next-line */
      new Observable(() => () => down());

      expect(down).toBeCalledTimes(0);
    });
  });

  describe('subscribe', () => {
    it('Should run setup function when a new subscriber joins', () => {
      const up = jest.fn();
      const channel = new Observable(() => {
        up();
      });
      const sub = channel.subscribe(jest.fn());

      expect(up).toBeCalledTimes(1);

      sub.unsubscribe();
    });

    it('Should run setup function each time a new subscriber joins', () => {
      const up = jest.fn();
      const channel = new Observable(() => {
        up();
      });
      const sub = channel.subscribe(jest.fn());
      const sub2 = channel.subscribe(jest.fn());

      expect(up).toBeCalledTimes(2);

      sub.unsubscribe();
      sub2.unsubscribe();
    });

    it('Should run teardown function when a subscriber unsubscribes', () => {
      const teardown = jest.fn();
      const channel = new Observable(() => () => teardown());
      channel.subscribe(jest.fn()).unsubscribe();

      expect(teardown).toBeCalledTimes(1);
    });

    it('Should run teardown function each time a subscriber unsubscribes', () => {
      const teardown = jest.fn();
      const channel = new Observable(() => () => teardown());

      channel.subscribe(jest.fn()).unsubscribe();
      channel.subscribe(jest.fn()).unsubscribe();

      expect(teardown).toBeCalledTimes(2);
    });
  });

  describe('next', () => {
    it('Should emit value to each new subscriber', () => {
      const subscribe1 = jest.fn();
      const subscribe2 = jest.fn();
      const channel = new Observable<string>((o) => {
        o.next(VALUE_1);
      });

      const sub = channel.subscribe(subscribe1);
      const sub2 = channel.subscribe(subscribe2);

      expect(subscribe1).toBeCalledTimes(1);
      expect(subscribe2).toBeCalledTimes(1);
      expect(subscribe1.mock.calls[0][0]).toBe(VALUE_1);
      expect(subscribe2.mock.calls[0][0]).toBe(VALUE_1);

      sub.unsubscribe();
      sub2.unsubscribe();
    });

    it('Should emit a value when the next is triggered', () => {
      const onNext = jest.fn();
      const channel = new Observable((observer) => {
        observer.next();
      });

      channel.subscribe(() => onNext());

      expect(onNext).toBeCalledTimes(1);
    });

    it('Should not emit when a subscriber unsubscribes', () => {
      const subscribe = jest.fn();
      let next!: NextFn<string>;
      const channel = new Observable<string>((observer) => {
        next = (v: any) => observer.next(v);
      });

      const sub = channel.subscribe(subscribe);

      next(VALUE_1);

      sub.unsubscribe();

      next(VALUE_2);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toBeCalledWith(VALUE_1);
    });

    it('Should emit a value when the next is triggered multiple times', () => {
      const onNext = jest.fn();
      const channel = new Observable((observer) => {
        observer.next();
        observer.next();
        observer.next();
      });

      channel.subscribe(() => onNext());

      expect(onNext).toBeCalledTimes(3);
    });

    it('Should emit values to subscribers', () => {
      const subscribe = jest.fn();
      const source = new Observable<string>((observer) => {
        observer.next(VALUE_1);
        observer.next(VALUE_2);
      });

      const sub = source.subscribe(subscribe);

      expect(subscribe).toBeCalledTimes(2);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_1);
      expect(subscribe).toHaveBeenNthCalledWith(2, VALUE_2);

      sub.unsubscribe();
    });

    it('Should emit values to each subscriber separately', () => {
      const subscribe1 = jest.fn();
      const subscribe2 = jest.fn();
      let one = true;

      const source = new Observable<string>((observer) => {
        if (one) {
          observer.next(VALUE_1);
          observer.next(VALUE_2);
          observer.complete();
          one = false;
        } else {
          observer.next(VALUE_2);
          observer.next(VALUE_1);
          observer.complete();
        }
      });

      source.subscribe(subscribe1);
      source.subscribe(subscribe2);

      expect(subscribe1).toBeCalledTimes(2);
      expect(subscribe1).toHaveBeenNthCalledWith(1, VALUE_1);
      expect(subscribe1).toHaveBeenNthCalledWith(2, VALUE_2);

      expect(subscribe2).toBeCalledTimes(2);
      expect(subscribe2).toHaveBeenNthCalledWith(1, VALUE_2);
      expect(subscribe2).toHaveBeenNthCalledWith(2, VALUE_1);
    });
  });

  describe('error', () => {
    it('Should emit error to each new subscriber', () => {
      const subscribe1 = jest.fn();
      const subscribe2 = jest.fn();
      const channel = new Observable<string>((o) => {
        o.error(VALUE_1);
      });

      const sub = channel.subscribe(jest.fn(), subscribe1);
      const sub2 = channel.subscribe(jest.fn(), subscribe2);

      expect(subscribe1).toBeCalledTimes(1);
      expect(subscribe2).toBeCalledTimes(1);
      expect(subscribe1.mock.calls[0][0]).toBe(VALUE_1);
      expect(subscribe2.mock.calls[0][0]).toBe(VALUE_1);

      sub.unsubscribe();
      sub2.unsubscribe();
    });

    it('Should emit a error when the error is triggered', () => {
      const error = jest.fn();
      const channel = new Observable((observer) => {
        observer.error();
      });

      channel.subscribe(jest.fn(), error);

      expect(error).toBeCalledTimes(1);
    });

    it('Should not emit errors after a subscriber has unsubscribed', () => {
      const subscribe = jest.fn();
      let error!: NextFn<string>;

      const channel = new Observable<string>((observer) => {
        error = (v: any) => observer.error(v);
      });

      const sub = channel.subscribe(jest.fn(), subscribe);

      error(VALUE_1);

      sub.unsubscribe();

      error(VALUE_2);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toBeCalledWith(VALUE_1);
    });

    it('Should complete when the error is triggered', () => {
      const error = jest.fn();

      const channel = new Observable((observer) => {
        observer.error();
        observer.error();
        observer.error();
      });

      channel.subscribe(jest.fn(), error);

      expect(error).toBeCalledTimes(1);
    });

    it('Should emit errors to subscribers', () => {
      const subscribe = jest.fn();

      const source = new Observable<string>((observer) => {
        observer.error(VALUE_1);
      });

      const sub = source.subscribe(jest.fn(), subscribe);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_1);

      sub.unsubscribe();
    });

    it('Should emit errors to each subscriber separately', () => {
      const subscribe1 = jest.fn();
      const subscribe2 = jest.fn();
      let one = true;

      const source = new Observable<string>((observer) => {
        if (one) {
          observer.error(VALUE_1);
          one = false;
        } else {
          observer.error(VALUE_2);
        }
      });

      source.subscribe(jest.fn(), subscribe1);
      source.subscribe(jest.fn(), subscribe2);

      expect(subscribe1).toBeCalledTimes(1);
      expect(subscribe1).toHaveBeenNthCalledWith(1, VALUE_1);

      expect(subscribe2).toBeCalledTimes(1);
      expect(subscribe2).toHaveBeenNthCalledWith(1, VALUE_2);
    });
  });

  describe('complete', () => {
    it('Should notify upon completion', () => {
      const complete = jest.fn();

      const o = new Observable((_o) => {
        _o.complete();
      });

      o.subscribe(noop, noop, complete);

      expect(complete).toBeCalledTimes(1);
      expect(complete).toBeCalledWith();
    });

    it('Should not emit after completion', () => {
      const subscribe = jest.fn();

      const o = new Observable((_o) => {
        _o.complete();
        _o.next();
      });

      o.subscribe(subscribe);

      expect(subscribe).toBeCalledTimes(0);
    });

    it('Should run teardown after completion', () => {
      const teardown = jest.fn();

      const o = new Observable((_o) => {
        _o.complete();
        return () => teardown();
      });

      o.subscribe();

      expect(teardown).toBeCalledTimes(1);
    });

    it('Should only complete once', () => {
      const subscribe = jest.fn();

      const o = new Observable((_o) => {
        _o.complete();
        _o.complete();
      });

      o.subscribe(undefined, undefined, subscribe);

      expect(subscribe).toBeCalledTimes(1);
    });

    it('Should only run teardown once', () => {
      const teardown = jest.fn();

      const o = new Observable((_o) => {
        _o.complete();
        _o.complete();
        return teardown;
      });

      o.subscribe();

      expect(teardown).toBeCalledTimes(1);
    });

    it('Should only run teardown once', () => {
      const teardown = jest.fn();
      let observer!: Observer<any>;

      const o = new Observable((_observer) => {
        observer = _observer;
        return teardown;
      });

      o.subscribe();

      observer.complete();

      expect(teardown).toBeCalledTimes(1);
    });

    it('Should complete for each subscriber separately', () => {
      const complete1 = jest.fn();
      const complete2 = jest.fn();

      let hasRun = false;

      const source$ = new Observable<string>((o) => {
        if (hasRun) {
          return;
        }
        hasRun = true;
        o.complete();
      });

      source$.subscribe(jest.fn(), jest.fn(), complete1);
      source$.subscribe(jest.fn(), jest.fn(), complete2);

      expect(complete1).toBeCalledTimes(1);
      expect(complete1).toBeCalledWith();
      expect(complete2).toBeCalledTimes(0);
    });
  });
});
