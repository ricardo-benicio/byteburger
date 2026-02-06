import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useMenu } from './useMenu';
import { menuItems } from '@/data/menuData';

/**
 * Tests for useMenu Zustand store
 * Story 2.1: Create useMenu Zustand Store
 * 
 * Tests cover:
 * - Initial state loads from menuData.ts
 * - addItem() adds new item to store
 * - updateItem() modifies existing item
 * - removeItem() removes item from store
 * - Hook returns singleton instance
 */

describe('useMenu', () => {
  // Reset store state before each test
  beforeEach(() => {
    // Get store and reset to initial state
    const { result } = renderHook(() => useMenu());
    act(() => {
      // Clear all items first
      result.current.items.forEach((item) => {
        result.current.removeItem(item.id);
      });
      // Re-add initial items
      menuItems.forEach((item) => {
        result.current.addItem(item);
      });
    });
  });

  describe('Initial State', () => {
    it('should initialize with menu items from menuData.ts', () => {
      const { result } = renderHook(() => useMenu());
      
      expect(result.current.items).toBeDefined();
      expect(Array.isArray(result.current.items)).toBe(true);
      expect(result.current.items.length).toBeGreaterThan(0);
    });

    it('should have the same items as menuData.ts', () => {
      const { result } = renderHook(() => useMenu());
      
      // Check that all menuData items exist in store
      menuItems.forEach((menuItem) => {
        const storeItem = result.current.items.find((item) => item.id === menuItem.id);
        expect(storeItem).toBeDefined();
        expect(storeItem?.name).toBe(menuItem.name);
      });
    });
  });

  describe('addItem()', () => {
    it('should add a new item to the store', () => {
      const { result } = renderHook(() => useMenu());
      const initialLength = result.current.items.length;
      
      const newItem = {
        id: 'test-burger-new',
        name: 'Test Burger',
        description: 'A test burger for unit testing',
        price: 25.90,
        image: '/test-image.jpg',
        category: 'burgers' as const,
        popular: false,
      };

      act(() => {
        result.current.addItem(newItem);
      });

      expect(result.current.items.length).toBe(initialLength + 1);
      
      const addedItem = result.current.items.find((item) => item.id === 'test-burger-new');
      expect(addedItem).toBeDefined();
      expect(addedItem?.name).toBe('Test Burger');
      expect(addedItem?.price).toBe(25.90);
    });

    it('should trigger re-render when item is added', () => {
      const { result, rerender } = renderHook(() => useMenu());
      const initialLength = result.current.items.length;
      
      const newItem = {
        id: 'test-item-rerender',
        name: 'Re-render Test',
        description: 'Testing re-render',
        price: 10.00,
        image: '/test.jpg',
        category: 'sides' as const,
      };

      act(() => {
        result.current.addItem(newItem);
      });

      rerender();
      expect(result.current.items.length).toBe(initialLength + 1);
    });
  });

  describe('updateItem()', () => {
    it('should update an existing item by ID', () => {
      const { result } = renderHook(() => useMenu());
      const firstItem = result.current.items[0];
      
      act(() => {
        result.current.updateItem(firstItem.id, {
          name: 'Updated Name',
          price: 99.99,
        });
      });

      const updatedItem = result.current.items.find((item) => item.id === firstItem.id);
      expect(updatedItem?.name).toBe('Updated Name');
      expect(updatedItem?.price).toBe(99.99);
      // Other properties should remain unchanged
      expect(updatedItem?.description).toBe(firstItem.description);
    });

    it('should not modify other items when updating one', () => {
      const { result } = renderHook(() => useMenu());
      const [firstItem, secondItem] = result.current.items;
      const originalSecondName = secondItem.name;
      
      act(() => {
        result.current.updateItem(firstItem.id, { name: 'Changed' });
      });

      const unchangedItem = result.current.items.find((item) => item.id === secondItem.id);
      expect(unchangedItem?.name).toBe(originalSecondName);
    });

    it('should handle partial updates correctly', () => {
      const { result } = renderHook(() => useMenu());
      const firstItem = result.current.items[0];
      const originalName = firstItem.name;
      
      act(() => {
        result.current.updateItem(firstItem.id, { popular: true });
      });

      const updatedItem = result.current.items.find((item) => item.id === firstItem.id);
      expect(updatedItem?.name).toBe(originalName);
      expect(updatedItem?.popular).toBe(true);
    });
  });

  describe('removeItem()', () => {
    it('should remove an item by ID', () => {
      const { result } = renderHook(() => useMenu());
      const initialLength = result.current.items.length;
      const firstItem = result.current.items[0];
      
      act(() => {
        result.current.removeItem(firstItem.id);
      });

      expect(result.current.items.length).toBe(initialLength - 1);
      
      const removedItem = result.current.items.find((item) => item.id === firstItem.id);
      expect(removedItem).toBeUndefined();
    });

    it('should not affect other items when removing one', () => {
      const { result } = renderHook(() => useMenu());
      const [firstItem, secondItem] = result.current.items;
      
      act(() => {
        result.current.removeItem(firstItem.id);
      });

      const remainingItem = result.current.items.find((item) => item.id === secondItem.id);
      expect(remainingItem).toBeDefined();
      expect(remainingItem?.name).toBe(secondItem.name);
    });

    it('should handle removing non-existent item gracefully', () => {
      const { result } = renderHook(() => useMenu());
      const initialLength = result.current.items.length;
      
      act(() => {
        result.current.removeItem('non-existent-id');
      });

      // Should not throw and length should remain the same
      expect(result.current.items.length).toBe(initialLength);
    });
  });

  describe('Singleton Pattern', () => {
    it('should return the same store instance across multiple hook calls', () => {
      const { result: result1 } = renderHook(() => useMenu());
      const { result: result2 } = renderHook(() => useMenu());
      
      // Both hooks should have the same items reference
      expect(result1.current.items).toEqual(result2.current.items);
    });

    it('should share state changes across hook instances', () => {
      const { result: result1 } = renderHook(() => useMenu());
      const { result: result2 } = renderHook(() => useMenu());
      
      const newItem = {
        id: 'singleton-test-item',
        name: 'Singleton Test',
        description: 'Testing singleton',
        price: 15.00,
        image: '/test.jpg',
        category: 'drinks' as const,
      };

      act(() => {
        result1.current.addItem(newItem);
      });

      // Changes in result1 should be reflected in result2
      const itemInResult2 = result2.current.items.find((item) => item.id === 'singleton-test-item');
      expect(itemInResult2).toBeDefined();
      expect(itemInResult2?.name).toBe('Singleton Test');
    });
  });

  describe('Hook Return Type', () => {
    it('should return items array', () => {
      const { result } = renderHook(() => useMenu());
      expect(result.current.items).toBeDefined();
      expect(Array.isArray(result.current.items)).toBe(true);
    });

    it('should return addItem function', () => {
      const { result } = renderHook(() => useMenu());
      expect(result.current.addItem).toBeDefined();
      expect(typeof result.current.addItem).toBe('function');
    });

    it('should return updateItem function', () => {
      const { result } = renderHook(() => useMenu());
      expect(result.current.updateItem).toBeDefined();
      expect(typeof result.current.updateItem).toBe('function');
    });

    it('should return removeItem function', () => {
      const { result } = renderHook(() => useMenu());
      expect(result.current.removeItem).toBeDefined();
      expect(typeof result.current.removeItem).toBe('function');
    });
  });
});
