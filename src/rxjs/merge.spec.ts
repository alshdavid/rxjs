import { merge } from './merge';
import { Subject } from './subject';
import { Observable } from './observable';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 404;

describe('merge', () => {
  let subscribe: jest.Mock;
  let error: jest.Mock;
  let complete: jest.Mock;
  let a$: Subject<string>;
  let b$: Subject<number>;

  beforeEach(() => {
    subscribe = jest.fn();
    error = jest.fn();
    complete = jest.fn();
    a$ = new Subject<string>();
    b$ = new Subject<number>();
  });

  it('Should not throw', () => {
    const testFunc = () => merge();
    expect(testFunc).not.toThrow();
  });

  it('Should return observable', () => {
    const result = merge();
    expect(result instanceof Observable).toBeTruthy();
  });

  it('Should merge events from sources (also types)', () => {
    const result = merge(a$, b$);

    result.subscribe(subscribe);

    a$.next(VALUE_1);
    b$.next(VALUE_2);

    expect(subscribe).toBeCalledTimes(2);
    expect(subscribe).nthCalledWith(1, VALUE_1);
    expect(subscribe).nthCalledWith(2, VALUE_2);
  });

  it('Should emit error when one source errors', () => {
    const result = merge(a$, b$);

    result.subscribe(subscribe, error);

    a$.error();
    b$.next(VALUE_2);

    expect(subscribe).toBeCalledTimes(0);
    expect(error).toBeCalledTimes(1);
  });

  it('Should complete when one source completes', () => {
    const result = merge(a$, b$);

    result.subscribe(subscribe, undefined, complete);

    a$.complete();
    b$.next(VALUE_2);

    expect(subscribe).toBeCalledTimes(0);
    expect(complete).toBeCalledTimes(1);
  });
});
