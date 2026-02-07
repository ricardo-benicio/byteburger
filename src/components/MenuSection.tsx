import { useMenu } from '@/hooks/useMenu';
import { MenuCard } from './MenuCard';

/**
 * MenuSection Component
 * 
 * Displays menu items filtered by the active category.
 * Subscribes to the useMenu Zustand store for real-time updates.
 * 
 * When an admin adds, updates, or removes items via the admin panel,
 * this component automatically re-renders with the new data.
 * 
 * @param activeCategory - The category to filter items by (e.g., 'burgers', 'sides')
 * 
 * @example
 * ```tsx
 * <MenuSection activeCategory="burgers" />
 * ```
 */

interface MenuSectionProps {
  activeCategory: string;
}

/**
 * Category metadata for display
 * Maps category IDs to their display names and icons
 */
const categoryMetadata: Record<string, { name: string; icon: string }> = {
  burgers: { name: 'Burgers', icon: '🍔' },
  sides: { name: 'Acompanhamentos', icon: '🍟' },
  drinks: { name: 'Bebidas', icon: '🥤' },
  desserts: { name: 'Sobremesas', icon: '🍫' },
};

export function MenuSection({ activeCategory }: MenuSectionProps) {
  // Subscribe to Zustand store - component re-renders on store changes
  const { items } = useMenu();

  // Filter items by active category
  const filteredItems = items.filter((item) => item.category === activeCategory);
  
  // Get category display metadata
  const category = categoryMetadata[activeCategory];

  return (
    <section className="container py-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{category?.icon}</span>
        <h2 className="font-display text-2xl">{category?.name}</h2>
      </div>
      
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
