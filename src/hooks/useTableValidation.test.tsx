import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { useTableValidation } from './useTableValidation';

/**
 * Tests for useTableValidation hook
 * Story 1.1: Validate Table Number on App Load
 * 
 * Tests verify:
 * - Valid table numbers are accepted
 * - Missing table numbers are rejected
 * - Invalid table numbers are rejected
 * - Hook returns correct validation state
 */

// Helper to create wrapper with specific URL
function createWrapper(initialEntries: string[]) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    );
  };
}

describe('useTableValidation', () => {
  describe('Valid Table Numbers', () => {
    it('should return isValid=true for ?mesa=1', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=1']),
      });

      expect(result.current.isValid).toBe(true);
      expect(result.current.tableNumber).toBe(1);
      expect(result.current.error).toBeNull();
    });

    it('should return isValid=true for ?mesa=10', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=10']),
      });

      expect(result.current.isValid).toBe(true);
      expect(result.current.tableNumber).toBe(10);
      expect(result.current.error).toBeNull();
    });

    it('should return isValid=true for ?mesa=99', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=99']),
      });

      expect(result.current.isValid).toBe(true);
      expect(result.current.tableNumber).toBe(99);
      expect(result.current.error).toBeNull();
    });
  });

  describe('Missing Table Number', () => {
    it('should return isValid=false when no mesa parameter', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/']),
      });

      expect(result.current.isValid).toBe(false);
      expect(result.current.tableNumber).toBeNull();
      expect(result.current.error).toBe('missing');
    });

    it('should return isValid=false when mesa is empty', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=']),
      });

      expect(result.current.isValid).toBe(false);
      expect(result.current.tableNumber).toBeNull();
      expect(result.current.error).toBe('missing');
    });
  });

  describe('Invalid Table Numbers', () => {
    it('should return isValid=false for ?mesa=invalid', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=invalid']),
      });

      expect(result.current.isValid).toBe(false);
      expect(result.current.tableNumber).toBeNull();
      expect(result.current.error).toBe('invalid');
    });

    it('should return isValid=false for ?mesa=0', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=0']),
      });

      expect(result.current.isValid).toBe(false);
      expect(result.current.tableNumber).toBeNull();
      expect(result.current.error).toBe('invalid');
    });

    it('should return isValid=false for ?mesa=-1', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=-1']),
      });

      expect(result.current.isValid).toBe(false);
      expect(result.current.tableNumber).toBeNull();
      expect(result.current.error).toBe('invalid');
    });

    it('should return isValid=false for ?mesa=1.5', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=1.5']),
      });

      expect(result.current.isValid).toBe(false);
      expect(result.current.tableNumber).toBeNull();
      expect(result.current.error).toBe('invalid');
    });

    it('should return isValid=false for ?mesa=abc123', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=abc123']),
      });

      expect(result.current.isValid).toBe(false);
      expect(result.current.tableNumber).toBeNull();
      expect(result.current.error).toBe('invalid');
    });
  });

  describe('Return Type', () => {
    it('should return isValid boolean', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=1']),
      });

      expect(typeof result.current.isValid).toBe('boolean');
    });

    it('should return tableNumber as number or null', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/?mesa=5']),
      });

      expect(typeof result.current.tableNumber).toBe('number');
    });

    it('should return error as string or null', () => {
      const { result } = renderHook(() => useTableValidation(), {
        wrapper: createWrapper(['/']),
      });

      expect(typeof result.current.error).toBe('string');
    });
  });
});
