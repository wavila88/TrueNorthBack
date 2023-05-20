const assert = require('assert');
const { addition, substraction, multiplication, division, squareRoot } = require('../../src/utils/operation');


describe('Calculator', () => {
  describe('addition', () => {
    it('should return the sum of two numbers', () => {
      const result = addition(5, 3);
      assert.strictEqual(result, 8);
    });
  });

  describe('substraction', () => {
    it('should return the difference of two numbers', () => {
      const result = substraction(10, 4);
      assert.strictEqual(result, 6);
    });
  });

  describe('multiplication', () => {
    it('should return the product of two numbers', () => {
      const result = multiplication(3, 4);
      assert.strictEqual(result, 12);
    });
  });

  describe('division', () => {
    it('should return the quotient of two numbers', () => {
      const result = division(20, 5);
      assert.strictEqual(result, 4);
    });

    it('should handle division by zero', () => {
      const result = division(10, 0);
      assert.strictEqual(result, Infinity);
    });
  });

  describe('squareRoot', () => {
    it('should return the square root of a number', () => {
      const result = squareRoot(16);
      assert.strictEqual(result, 4);
    });
  });
});