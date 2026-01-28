import { menuItems, categories } from '@/data/menuData';
import { MenuCard } from './MenuCard';

interface MenuSectionProps {
  activeCategory: string;
}

export function MenuSection({ activeCategory }: MenuSectionProps) {
  const filteredItems = menuItems.filter((item) => item.category === activeCategory);
  const category = categories.find((c) => c.id === activeCategory);

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
