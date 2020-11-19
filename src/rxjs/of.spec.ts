import { of } from './of';
import { Observable } from './observable';

const VALUES = [1, 2, 3, 4, 5];

describe('of', () => {
  let subscribe: jest.Mock;

  beforeEach(() => {
    subscribe = jest.fn();
  });

  it('Should not throw', () => {
    const testFunc = () => of();
    expect(testFunc).not.toThrow();
  });

  it('Should return observable', () => {
    const result = of();
    expect(result instanceof Observable).toBeTruthy();
  });

  it('Should provide values to observable', () => {
    const result = of(...VALUES);
    result.subscribe(subscribe);
    expect(subscribe).toBeCalledTimes(5);
    expect(subscribe).nthCalledWith(1, 1);
    expect(subscribe).nthCalledWith(2, 2);
    expect(subscribe).nthCalledWith(3, 3);
    expect(subscribe).nthCalledWith(4, 4);
    expect(subscribe).nthCalledWith(5, 5);
  });
});
