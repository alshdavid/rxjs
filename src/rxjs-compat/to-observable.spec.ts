import { toObservable } from './to-observable';
import { Observable } from 'rxjs';
import { Subject } from '../rxjs';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('toObservable', () => {
  it('Should produce an observable from an alt subscriber', () => {
    const source = new Subject<string>();
    const source$ = toObservable(source);

    expect(source$ instanceof Observable).toBeTruthy();
  });

  it('Should emit value produced from alt subscriber', () => {
    const subscribe = jest.fn();

    const source = new Subject<string>();
    const source$ = toObservable(source);

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
    const source$ = toObservable(source);

    source$.subscribe(undefined, subscribe);

    source.error(VALUE_1);

    expect(subscribe).toBeCalledTimes(1);
    expect(subscribe.mock.calls[0][0]).toEqual(VALUE_1);
  });

  it('Should emit complete produced from alt subscriber', () => {
    const subscribe = jest.fn();

    const source = new Subject<string>();
    const source$ = toObservable(source);

    source$.subscribe(undefined, undefined, subscribe);

    source.complete();

    expect(subscribe).toBeCalledTimes(1);
  });
});
