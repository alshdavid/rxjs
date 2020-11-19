import { tap } from './tap';
import { Operation } from './operation';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('tap', () => {
  describe('Factory', () => {
    it('Should not throw', () => {
      const testFunc = () => tap(() => true);
      expect(testFunc).not.toThrow();
    });
  });

  describe('OperatorFunc', () => {
    it('Should not modify value', async () => {
      const operatorFunc = tap(() => VALUE_2);
      const state = new Operation(VALUE_1);
      const result = await operatorFunc(state);

      expect(result.complete).toBe(false);
      expect(result.skip).toBe(false);
      expect(result.value).toBe(VALUE_1);
    });

    it('Should run callback', async () => {
      const callback = jest.fn();
      const operatorFunc = tap(callback);
      const state = new Operation(VALUE_1);
      await operatorFunc(state);

      expect(callback).toBeCalledTimes(1);
    });

    it('Should pass operation value to predicate', async () => {
      const predicate = jest.fn();
      const operatorFunc = tap(predicate);

      const state = new Operation(VALUE_1);
      await operatorFunc(state);

      expect(predicate).toBeCalledTimes(1);
      expect(predicate).toHaveBeenNthCalledWith(1, VALUE_1);
    });
  });
});
