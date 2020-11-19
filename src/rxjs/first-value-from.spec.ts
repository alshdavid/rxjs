import { Subject } from './subject';
import { firstValueFrom } from './first-value-from';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

class MockSubscriber {
  next?: (value?: any) => void;
  error?: (value?: any) => void;
  complete?: () => void;
  unsubscriber = {
    unsubscribe: jest.fn(),
  };

  subscribe = jest.fn().mockImplementation((next, error, complete) => {
    this.next = next;
    this.error = error;
    this.complete = complete;
    return this.unsubscriber;
  });
}

describe('lastValueFrom', () => {
  it('Should notify upon completion', async () => {
    const subject = new Subject<string>();
    const onValue = firstValueFrom<string>(subject);

    subject.next(VALUE_1);
    subject.next(VALUE_2);

    const value = await onValue;

    expect(value).toBe(VALUE_1);
  });

  it('Should catch upon error', async () => {
    let didThrow = false;
    const subject = new Subject<string>();
    const onValue = firstValueFrom<string>(subject);

    subject.error();

    try {
      await onValue;
    } catch (error) {
      didThrow = true;
    }

    expect(didThrow).toBeTruthy();
  });

  it('Should resolve if complete before value emit', async () => {
    const subject = new Subject<string>();
    const onValue = firstValueFrom<string>(subject);

    subject.complete();

    const value = await onValue;

    expect(value).toBe(undefined);
  });

  it('Should unsubscribe immediately', async () => {
    const source$ = new MockSubscriber();

    const onValue = firstValueFrom(source$);

    source$.next!(VALUE_1);

    const value = await onValue;

    expect(value).toBe(VALUE_1);
    expect(source$.unsubscriber.unsubscribe).toBeCalledTimes(1);
  });
});
