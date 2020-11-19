import { fromEvent } from './from-event';
import { MockEventTarget } from '../stdom/testing';
import { firstValueFrom } from './first-value-from';

const EVENT_NAME = 'EVENT_NAME';

describe('fromEvent', () => {
  let target: MockEventTarget;

  beforeEach(() => {
    target = new MockEventTarget();
  });

  it('Should not throw', async () => {
    const testFunc = () => fromEvent(target, EVENT_NAME);
    expect(testFunc).not.toThrow();
  });

  it('Should wait for subscription before listening', async () => {
    fromEvent(target, EVENT_NAME);
    expect(target.addEventListener).toBeCalledTimes(0);
    expect(target.removeEventListener).toBeCalledTimes(0);
  });

  it('Should listen to events after subscription', async () => {
    const source = fromEvent(target, EVENT_NAME);
    source.subscribe().unsubscribe();
    expect(target.addEventListener).toBeCalledTimes(1);
  });

  it('Should stop listening to events after unsubscription', async () => {
    const source = fromEvent(target, EVENT_NAME);
    source.subscribe().unsubscribe();
    expect(target.removeEventListener).toBeCalledTimes(1);
  });

  it('Should emit value to subscriber', async () => {
    const source = fromEvent(target, EVENT_NAME);
    const onValue = firstValueFrom(source);
    const event = new Event(EVENT_NAME);

    const callback = target.addEventListener.mock.calls[0][1];
    callback(event);

    expect(await onValue).toBe(event);
  });
});
