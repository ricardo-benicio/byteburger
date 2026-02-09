import { describe, it, expect } from 'vitest';
import { validateTableNumber, TableValidationResult } from './validation';

describe('validateTableNumber', () => {
  describe('valid table numbers', () => {
    it('should validate table number 1', () => {
      const result = validateTableNumber('1');
      expect(result).toEqual<TableValidationResult>({
        isValid: true,
        tableNumber: 1,
      });
    });

    it('should validate table number 5', () => {
      const result = validateTableNumber('5');
      expect(result).toEqual<TableValidationResult>({
        isValid: true,
        tableNumber: 5,
      });
    });

    it('should validate table number 100', () => {
      const result = validateTableNumber('100');
      expect(result).toEqual<TableValidationResult>({
        isValid: true,
        tableNumber: 100,
      });
    });

    it('should validate table number 999', () => {
      const result = validateTableNumber('999');
      expect(result).toEqual<TableValidationResult>({
        isValid: true,
        tableNumber: 999,
      });
    });
  });

  describe('null and undefined', () => {
    it('should reject null', () => {
      const result = validateTableNumber(null);
      expect(result).toEqual<TableValidationResult>({
        isValid: false,
        error: 'No table number provided',
      });
    });
  });

  describe('non-numeric values', () => {
    it('should reject string "invalid"', () => {
      const result = validateTableNumber('invalid');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject string "abc"', () => {
      const result = validateTableNumber('abc');
      expect(result.isValid).toBe(false);
    });

    it('should reject empty string', () => {
      const result = validateTableNumber('');
      expect(result.isValid).toBe(false);
    });
  });

  describe('negative numbers', () => {
    it('should reject -1', () => {
      const result = validateTableNumber('-1');
      expect(result.isValid).toBe(false);
    });

    it('should reject -5', () => {
      const result = validateTableNumber('-5');
      expect(result.isValid).toBe(false);
    });

    it('should reject -100', () => {
      const result = validateTableNumber('-100');
      expect(result.isValid).toBe(false);
    });
  });

  describe('zero', () => {
    it('should reject 0', () => {
      const result = validateTableNumber('0');
      expect(result.isValid).toBe(false);
    });
  });

  describe('decimal numbers', () => {
    it('should reject 3.14', () => {
      const result = validateTableNumber('3.14');
      expect(result.isValid).toBe(false);
    });

    it('should reject 1.5', () => {
      const result = validateTableNumber('1.5');
      expect(result.isValid).toBe(false);
    });

    it('should reject 2.0', () => {
      // parseInt('2.0', 10) returns 2 which is valid
      // but we need to decide if '2.0' should be accepted
      // According to story, decimals should be rejected
      const result = validateTableNumber('2.0');
      expect(result.isValid).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should reject whitespace', () => {
      const result = validateTableNumber('   ');
      expect(result.isValid).toBe(false);
    });

    it('should reject special characters', () => {
      const result = validateTableNumber('!@#$');
      expect(result.isValid).toBe(false);
    });

    it('should reject mixed alphanumeric', () => {
      const result = validateTableNumber('5abc');
      expect(result.isValid).toBe(false);
    });

    it('should reject number with leading spaces', () => {
      const result = validateTableNumber('  5');
      // Could be trimmed, but to be strict, reject
      expect(result.isValid).toBe(false);
    });

    it('should reject number with trailing spaces', () => {
      const result = validateTableNumber('5  ');
      expect(result.isValid).toBe(false);
    });
  });
});
