import { first } from './first';
import { Operation } from './operation';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('first', () => {
  describe('Factory', () => {
    it('Should not throw', () => {
      const testFunc = () => first();
      expect(testFunc).not.toThrow();
    });

    it('Should not throw with argument', () => {
      const testFunc = () => first(() => true);
      expect(testFunc).not.toThrow();
    });
  });

  describe('OperatorFunc', () => {
    it('Should complete if no condition is supplied', async () => {
      const operatorFunc = first();
      const state = new Operation(VALUE_1);
      const result = await operatorFunc(state);

      expect(result.complete).toBe(true);
      expect(result.skip).toBe(false);
      expect(result.value).toBe(VALUE_1);
    });

    it('Should find first event with condition', async () => {
      const operatorFunc = first((value) => value === VALUE_1);
      const state = new Operation(VALUE_1);
      const result = await operatorFunc(state);

      expect(result.complete).toBe(true);
      expect(result.skip).toBe(false);
      expect(result.value).toBe(VALUE_1);
    });

    it('Should skip if condition is unmet', async () => {
      const operatorFunc = first((value) => value === VALUE_2);
      const state = new Operation(VALUE_1);
      const result = await operatorFunc(state);

      expect(result.complete).toBe(false);
      expect(result.skip).toBe(true);
      expect(result.value).toBe(VALUE_1);
    });

    it('Should pass operation value to predicate', async () => {
      const predicate = jest.fn();
      const operatorFunc = first(predicate);

      const state = new Operation(VALUE_1);
      await operatorFunc(state);

      expect(predicate).toBeCalledTimes(1);
      expect(predicate).toHaveBeenNthCalledWith(1, VALUE_1);
    });
  });
});
