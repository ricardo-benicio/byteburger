/**
 * useMenu - Zustand store for menu state management
 * 
 * Story 2.1: Create useMenu Zustand Store
 * 
 * This hook provides centralized menu state management using Zustand.
 * It enables real-time sync between customer menu and admin panel
 * without prop-drilling.
 * 
 * @example
 * ```tsx
 * // In customer menu (MenuSection.tsx):
 * const { items } = useMenu();
 * 
 * // In admin panel (AdminMenuForm.tsx):
 * const { addItem, updateItem, removeItem } = useMenu();
 * ```
 * 
 * MVP Behavior:
 * - Data is stored in-memory only
 * - All changes are lost on page refresh
 * - Initial state loads from menuData.ts
 * 
 * TODO: Replace in-memory store with API when backend ready
 * This hook signature is compatible with React Query for future migration.
 */

import { create } from 'zustand';
import { menuItems } from '@/data/menuData';
import type { MenuItem } from '@/types/menu';

/**
 * MenuStore interface defining the store shape
 * 
 * @property items - Read-only array of menu items
 * @property addItem - Add a new item to the menu
 * @property updateItem - Update an existing item by ID
 * @property removeItem - Remove an item by ID
 */
interface MenuStore {
  /** Current menu items array (read-only) */
  items: MenuItem[];
  
  /**
   * Add a new item to the menu
   * @param item - The MenuItem to add
   * @returns void - Triggers re-render in all subscribed components
   */
  addItem: (item: MenuItem) => void;
  
  /**
   * Update an existing menu item
   * @param id - The ID of the item to update
   * @param updates - Partial MenuItem with fields to update
   * @returns void - Triggers re-render in all subscribed components
   */
  updateItem: (id: string, updates: Partial<MenuItem>) => void;
  
  /**
   * Remove a menu item by ID
   * @param id - The ID of the item to remove
   * @returns void - Triggers re-render in all subscribed components
   */
  removeItem: (id: string) => void;
}

/**
 * useMenu - Zustand hook for menu state management
 * 
 * This creates a singleton store that is shared across all components.
 * Zustand automatically handles subscriptions and re-renders when state changes.
 * 
 * @returns MenuStore - Object with items array and mutation functions
 * 
 * @example
 * ```tsx
 * function MenuSection() {
 *   const { items } = useMenu();
 *   return items.map(item => <MenuItem key={item.id} {...item} />);
 * }
 * 
 * function AdminPanel() {
 *   const { addItem, updateItem, removeItem } = useMenu();
 *   // Mutations here automatically update MenuSection
 * }
 * ```
 */
export const useMenu = create<MenuStore>((set) => ({
  // Initialize with data from menuData.ts
  // Using spread operator to create a copy (don't reference directly)
  // TODO: Replace with API fetch when backend is ready
  items: [...menuItems],

  /**
   * Add a new item to the menu
   * Creates new array to trigger React re-renders
   */
  addItem: (item: MenuItem) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },

  /**
   * Update an existing item by ID
   * Uses immutable update pattern for React compatibility
   */
  updateItem: (id: string, updates: Partial<MenuItem>) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },

  /**
   * Remove an item by ID
   * Filters out the item, creating a new array
   */
  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
}));

/**
 * Re-export MenuItem type for convenience
 * Allows consumers to import both hook and type from same location
 */
export type { MenuItem };
