import { categories } from '@/data/menuData';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-[73px] z-30 bg-background/95 backdrop-blur-md py-3 border-b border-border">
      <div className="container">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                activeCategory === category.id
                  ? 'gradient-warm text-primary-foreground shadow-glow'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              )}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
