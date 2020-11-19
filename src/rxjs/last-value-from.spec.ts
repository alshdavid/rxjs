import { Subject } from './subject';
import { lastValueFrom } from './last-value-from';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('lastValueFrom', () => {
  it('Should notify upon completion', async () => {
    const subject = new Subject<string>();
    const onValue = lastValueFrom<string>(subject);

    subject.next(VALUE_1);
    subject.next(VALUE_2);

    subject.complete();

    const value = await onValue;

    expect(value).toBe(VALUE_2);
  });

  it('Should catch upon error', async () => {
    let didThrow = false;
    const subject = new Subject<string>();
    const onValue = lastValueFrom<string>(subject);

    subject.error();

    try {
      await onValue;
    } catch (error) {
      didThrow = true;
    }

    expect(didThrow).toBeTruthy();
  });
});
