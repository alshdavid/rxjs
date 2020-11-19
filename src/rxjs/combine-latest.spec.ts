import { combineLatest } from './combine-latest';
import { Subject } from './subject';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('combineLatest', () => {
  it('Should not throw', async () => {
    const testFunc = () => combineLatest();
    expect(testFunc).not.toThrow();
  });

  it('Should emit only when every observable has emit at least once', () => {
    const subscribe = jest.fn();
    const a$ = new Subject<string>();
    const b$ = new Subject<string>();

    const result$ = combineLatest(a$, b$);

    const subscription = result$.subscribe(subscribe);
    expect(subscribe).toBeCalledTimes(0);

    a$.next(VALUE_1);
    expect(subscribe).toBeCalledTimes(0);

    b$.next(VALUE_2);
    expect(subscribe).toBeCalledTimes(1);
    expect(subscribe.mock.calls[0][0]).toEqual([VALUE_1, VALUE_2]);

    subscription.unsubscribe();
  });
});
