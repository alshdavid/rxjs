import { filter } from './filter';
import { Operation } from './operation';

const VALUE_1 = 'VALUE_1';

describe('filter', () => {
  describe('Factory', () => {
    it('Should not throw', () => {
      const testFunc = () => filter(() => true);
      expect(testFunc).not.toThrow();
    });
  });

  describe('OperatorFunc', () => {
    it('Should pass operation value to predicate', async () => {
      const predicate = jest.fn();
      const operatorFunc = filter(predicate);

      const state = new Operation(VALUE_1);
      await operatorFunc(state);

      expect(predicate).toBeCalledTimes(1);
      expect(predicate).toHaveBeenNthCalledWith(1, VALUE_1);
    });

    it('Should allow values that satisfy predicate', async () => {
      const operatorFunc = filter(() => true);
      const state = new Operation(VALUE_1);
      const result = await operatorFunc(state);

      expect(result.complete).toBe(false);
      expect(result.skip).toBe(false);
      expect(result.value).toBe(VALUE_1);
    });

    it("Should skip values that don't satisfy predicate", async () => {
      const operatorFunc = filter(() => false);
      const state = new Operation(VALUE_1);
      const result = await operatorFunc(state);

      expect(result.complete).toBe(false);
      expect(result.skip).toBe(true);
    });
  });
});
