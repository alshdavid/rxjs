import { Subscription } from './subscription';

describe('Channel', () => {
  it('Should construct without throwing', () => {
    const testFunc = () => new Subscription();
    expect(testFunc).not.toThrow();
  });

  it('Should call action of unsubscriber', () => {
    const unsubscribe = jest.fn();
    const sub = new Subscription();

    sub.add({ unsubscribe });

    sub.unsubscribe();

    expect(unsubscribe).toBeCalledTimes(1);
  });

  it('Should call action of multiple unsubscribers', () => {
    const unsubscribe = jest.fn();
    const sub = new Subscription();

    sub.add({ unsubscribe });
    sub.add({ unsubscribe });
    sub.add({ unsubscribe });

    sub.unsubscribe();

    expect(unsubscribe).toBeCalledTimes(3);
  });
});
