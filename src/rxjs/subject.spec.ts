import { Subject } from './subject';
import { Observable } from './observable';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('Subject', () => {
  describe('constructor', () => {
    it('Should construct without throwing', () => {
      const testFunc = () => new Subject();
      expect(testFunc).not.toThrow();
    });
  });

  describe('subscribe', () => {
    it('Should not throw without optional arguments', () => {
      const subject = new Subject();
      const testFunc = () => subject.subscribe(undefined, undefined, undefined);
      expect(testFunc).not.toThrow();
    });
  });

  describe('next', () => {
    it('Should emit to subscribers', () => {
      const subscribe = jest.fn();
      const subject = new Subject<void>();

      const sub = subject.subscribe(subscribe);

      subject.next();

      expect(subscribe).toBeCalledTimes(1);

      sub.unsubscribe();
    });

    it('Should emit value to subscribers', () => {
      const onNext = jest.fn();
      const subject = new Subject<string>();

      const sub = subject.subscribe(onNext);

      subject.next(VALUE_1);

      expect(onNext).toBeCalledTimes(1);
      expect(onNext).toHaveBeenNthCalledWith(1, VALUE_1);

      sub.unsubscribe();
    });

    it('Should emit values to subscribers', () => {
      const onNext = jest.fn();
      const subject = new Subject<string>();

      const sub = subject.subscribe(onNext);

      subject.next(VALUE_1);
      subject.next(VALUE_2);

      expect(onNext).toBeCalledTimes(2);
      expect(onNext).toHaveBeenNthCalledWith(1, VALUE_1);
      expect(onNext).toHaveBeenNthCalledWith(2, VALUE_2);

      sub.unsubscribe();
    });
  });

  describe('error', () => {
    it('Should emit error to subscribers', () => {
      const error = jest.fn();
      const subject = new Subject<void>();

      const sub = subject.subscribe(undefined, error);

      subject.error();

      expect(error).toBeCalledTimes(1);

      sub.unsubscribe();
    });

    it('Should emit error value to subscribers', () => {
      const error = jest.fn();
      const subject = new Subject<string>();

      const sub = subject.subscribe(undefined, error);

      subject.error(VALUE_1);

      expect(error).toBeCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, VALUE_1);

      sub.unsubscribe();
    });

    it('Should not send values to subscribers after error', () => {
      const subscribe = jest.fn();
      const subject = new Subject<string>();

      const sub = subject.subscribe(subscribe);

      subject.next(VALUE_1);
      subject.error();
      subject.next(VALUE_2);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_1);

      sub.unsubscribe();
    });
  });

  describe('complete', () => {
    it('Should not send values to subscribers after complete', () => {
      const subscribe = jest.fn();

      const subject = new Subject<string>();

      const sub = subject.subscribe(subscribe);

      subject.next(VALUE_1);
      subject.complete();
      subject.next(VALUE_2);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_1);

      sub.unsubscribe();
    });

    it('Should not send error to subscribers after complete', () => {
      const subscribe = jest.fn();
      const subject = new Subject<string>();

      const sub = subject.subscribe(subscribe);

      subject.complete();
      subject.error();

      expect(subscribe).toBeCalledTimes(0);

      sub.unsubscribe();
    });

    it('Should not send run complete to subscribers after complete', () => {
      const subscribe = jest.fn();
      const subject = new Subject<string>();

      const sub = subject.subscribe(undefined, undefined, subscribe);

      subject.complete();
      subject.complete();

      expect(subscribe).toBeCalledTimes(1);

      sub.unsubscribe();
    });

    it('Should not emit to subscribers if complete before new subscription', () => {
      const subscribe = jest.fn();
      const complete = jest.fn();
      const subject = new Subject<string>();

      subject.complete();

      const sub = subject.subscribe(subscribe, undefined, complete);

      subject.next(VALUE_1);

      expect(complete).toBeCalledTimes(1);
      expect(subscribe).toBeCalledTimes(0);

      sub.unsubscribe();
    });
  });

  describe('asObservable', () => {
    it('Should produce an observable from an alt subscriber', () => {
      const source = new Subject<string>();
      const source$ = source.asObservable();

      expect(source$ instanceof Observable).toBeTruthy();
    });

    it('Should emit value produced from alt subscriber', () => {
      const subscribe = jest.fn();

      const source = new Subject<string>();
      const source$ = source.asObservable();

      const sub = source$.subscribe(subscribe);

      source.next(VALUE_1);
      source.next(VALUE_2);

      expect(subscribe).toBeCalledTimes(2);
      expect(subscribe.mock.calls[0][0]).toEqual(VALUE_1);
      expect(subscribe.mock.calls[1][0]).toEqual(VALUE_2);

      sub.unsubscribe();
    });

    it('Should emit error produced from alt subscriber', () => {
      const subscribe = jest.fn();

      const source = new Subject<string>();
      const source$ = source.asObservable();

      source$.subscribe(undefined, subscribe);

      source.error(VALUE_1);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe.mock.calls[0][0]).toEqual(VALUE_1);
    });

    it('Should emit complete produced from alt subscriber', () => {
      const subscribe = jest.fn();

      const source = new Subject<string>();
      const source$ = source.asObservable();

      source$.subscribe(undefined, undefined, subscribe);

      source.complete();

      expect(subscribe).toBeCalledTimes(1);
    });
  });
});
