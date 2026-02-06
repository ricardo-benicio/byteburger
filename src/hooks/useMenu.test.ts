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
 * - Edge cases and input validation
 * - Order preservation
 */

describe('useMenu', () => {
  // Reset store state before each test using a more reliable approach
  beforeEach(() => {
    const { result } = renderHook(() => useMenu());
    act(() => {
      // Remove all current items by iterating until empty
      // This handles cases where items might have been added in previous tests
      const currentItems = [...result.current.items];
      currentItems.forEach((item) => {
        result.current.removeItem(item.id);
      });
      
      // Restore initial state from menuData
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

  describe('Edge Cases and Input Validation', () => {
    it('should handle adding item with empty string id', () => {
      const { result } = renderHook(() => useMenu());
      const initialLength = result.current.items.length;

      const itemWithEmptyId = {
        id: '',
        name: 'Empty ID Item',
        description: 'Test',
        price: 10.00,
        image: '/test.jpg',
        category: 'burgers' as const,
      };

      act(() => {
        result.current.addItem(itemWithEmptyId);
      });

      expect(result.current.items.length).toBe(initialLength + 1);
      expect(result.current.items.find(i => i.id === '')).toBeDefined();
    });

    it('should handle updating non-existent item gracefully', () => {
      const { result } = renderHook(() => useMenu());
      const initialLength = result.current.items.length;
      const firstItem = result.current.items[0];

      act(() => {
        result.current.updateItem('definitely-non-existent-id', { price: 99.99 });
      });

      // Should not throw and length should remain the same
      expect(result.current.items.length).toBe(initialLength);
      // Other items should remain unchanged
      expect(result.current.items.find(i => i.id === firstItem.id)?.price).toBe(firstItem.price);
    });

    it('should preserve item order after multiple operations', () => {
      const { result } = renderHook(() => useMenu());
      
      // Add multiple items
      const item1 = { id: 'order-test-1', name: 'First', description: 'Test', price: 10, image: '/1.jpg', category: 'burgers' as const };
      const item2 = { id: 'order-test-2', name: 'Second', description: 'Test', price: 20, image: '/2.jpg', category: 'burgers' as const };
      const item3 = { id: 'order-test-3', name: 'Third', description: 'Test', price: 30, image: '/3.jpg', category: 'burgers' as const };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
        result.current.addItem(item3);
      });

      const items = result.current.items;
      const itemIds = items.map(i => i.id);
      const lastThreeIds = itemIds.slice(-3);

      expect(lastThreeIds).toEqual(['order-test-1', 'order-test-2', 'order-test-3']);
    });

    it('should handle price value of 0', () => {
      const { result } = renderHook(() => useMenu());
      const firstItem = result.current.items[0];

      act(() => {
        result.current.updateItem(firstItem.id, { price: 0 });
      });

      const updatedItem = result.current.items.find(i => i.id === firstItem.id);
      expect(updatedItem?.price).toBe(0);
    });

    it('should handle very long strings', () => {
      const { result } = renderHook(() => useMenu());
      const firstItem = result.current.items[0];
      const longString = 'a'.repeat(1000);

      act(() => {
        result.current.updateItem(firstItem.id, { description: longString });
      });

      const updatedItem = result.current.items.find(i => i.id === firstItem.id);
      expect(updatedItem?.description).toBe(longString);
    });
  });

  describe('State Consistency', () => {
    it('should maintain state consistency after rapid successive operations', () => {
      const { result } = renderHook(() => useMenu());
      
      act(() => {
        // Rapid add operations
        result.current.addItem({ id: 'rapid-1', name: 'Rapid 1', description: 'Test', price: 1, image: '/1.jpg', category: 'burgers' as const });
        result.current.addItem({ id: 'rapid-2', name: 'Rapid 2', description: 'Test', price: 2, image: '/2.jpg', category: 'burgers' as const });
        result.current.addItem({ id: 'rapid-3', name: 'Rapid 3', description: 'Test', price: 3, image: '/3.jpg', category: 'burgers' as const });
      });

      const afterAdd = result.current.items.length;

      act(() => {
        // Rapid update operations
        result.current.updateItem('rapid-1', { price: 10 });
        result.current.updateItem('rapid-2', { price: 20 });
        result.current.updateItem('rapid-3', { price: 30 });
      });

      // Verify all updates applied
      const item1 = result.current.items.find(i => i.id === 'rapid-1');
      const item2 = result.current.items.find(i => i.id === 'rapid-2');
      const item3 = result.current.items.find(i => i.id === 'rapid-3');

      expect(item1?.price).toBe(10);
      expect(item2?.price).toBe(20);
      expect(item3?.price).toBe(30);
      expect(result.current.items.length).toBe(afterAdd);
    });

    it('should handle items array reference stability', () => {
      const { result, rerender } = renderHook(() => useMenu());
      const initialItemsRef = result.current.items;

      act(() => {
        result.current.addItem({ id: 'ref-test', name: 'Ref Test', description: 'Test', price: 10, image: '/test.jpg', category: 'burgers' as const });
      });

      rerender();

      // After re-render, items array should be a new reference (immutable update)
      expect(result.current.items).not.toBe(initialItemsRef);
    });
  });
});
