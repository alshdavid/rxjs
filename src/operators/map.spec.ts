import { map } from './map';
import { Operation } from './operation';

const VALUE_1 = 'VALUE_1';
const VALUE_2 = 'VALUE_2';

describe('map', () => {
  describe('Factory', () => {
    it('Should not throw', () => {
      const testFunc = () => map(() => true);
      expect(testFunc).not.toThrow();
    });
  });

  describe('OperatorFunc', () => {
    it('Should modify value', async () => {
      const operatorFunc = map(() => VALUE_2);
      const state = new Operation(VALUE_1);
      const result = await operatorFunc(state);

      expect(result.complete).toBe(false);
      expect(result.skip).toBe(false);
      expect(result.value).toBe(VALUE_2);
    });

    it('Should pass operation value', async () => {
      const predicate = jest.fn();
      const operatorFunc = map(predicate);

      const state = new Operation(VALUE_1);
      await operatorFunc(state);

      expect(predicate).toBeCalledTimes(1);
      expect(predicate).toHaveBeenNthCalledWith(1, VALUE_1);
    });
  });
});
