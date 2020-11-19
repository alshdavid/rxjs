import { ReplaySubject } from './replay-subject';

describe('ReplaySubject', () => {
  describe('constructor', () => {
    it('Should construct without throwing', () => {
      const testFunc = () => new ReplaySubject();
      expect(testFunc).not.toThrow();
    });

    it('Should construct without throwing', () => {
      const testFunc = () => new ReplaySubject(100);
      expect(testFunc).not.toThrow();
    });
  });

  describe('subscribe', () => {
    it('Should not throw without optional arguments', () => {
      const subject = new ReplaySubject();
      const testFunc = () => subject.subscribe(undefined, undefined, undefined);
      expect(testFunc).not.toThrow();
    });

    it('Should emit buffered values', () => {
      const subscribe = jest.fn();
      const subject = new ReplaySubject<number>();

      subject.next(1);
      subject.next(2);
      subject.next(3);

      subject.subscribe(subscribe);

      expect(subscribe).toBeCalledTimes(3);
      expect(subscribe).toHaveBeenNthCalledWith(1, 1);
      expect(subscribe).toHaveBeenNthCalledWith(2, 2);
      expect(subscribe).toHaveBeenNthCalledWith(3, 3);
    });

    it('Should emit limited buffered values', () => {
      const subscribe = jest.fn();
      const subject = new ReplaySubject<number>(2);

      subject.next(1);
      subject.next(2);
      subject.next(3);

      subject.subscribe(subscribe);

      expect(subscribe).toBeCalledTimes(2);
      expect(subscribe).toHaveBeenNthCalledWith(1, 2);
      expect(subscribe).toHaveBeenNthCalledWith(2, 3);
    });
  });
});
