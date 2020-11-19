import { BehaviorSubject } from './behavior-subject';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('BehaviorSubject', () => {
  describe('constructor', () => {
    it('Should construct without throwing', () => {
      const testFunc = () => new BehaviorSubject(VALUE_1);
      expect(testFunc).not.toThrow();
    });
  });

  describe('subscribe', () => {
    it('Should not throw without optional arguments', () => {
      const subject = new BehaviorSubject(VALUE_2);
      const testFunc = () => subject.subscribe(undefined, undefined, undefined);
      expect(testFunc).not.toThrow();
    });

    it('Should emit to subscribers', () => {
      const subscribe = jest.fn();
      const subject = new BehaviorSubject(VALUE_1);

      const sub = subject.subscribe(subscribe);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_1);

      sub.unsubscribe();
    });
  });

  describe('next', () => {
    it('Should update value emitted to subscribers', () => {
      const subscribe = jest.fn();
      const subject = new BehaviorSubject(VALUE_1);

      subject.next(VALUE_2);

      const sub = subject.subscribe(subscribe);

      expect(subscribe).toBeCalledTimes(1);
      expect(subscribe).toHaveBeenNthCalledWith(1, VALUE_2);

      sub.unsubscribe();
    });
  });

  describe('getValue', () => {
    it('Should get initial value', () => {
      const subject = new BehaviorSubject(VALUE_1);
      expect(subject.getValue()).toBe(VALUE_1);
    });

    it('Should get last value', () => {
      const subject = new BehaviorSubject(VALUE_1);

      subject.next(VALUE_2);

      expect(subject.getValue()).toBe(VALUE_2);
    });
  });
});
