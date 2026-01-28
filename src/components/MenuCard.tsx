import { Plus, Star } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const addItem = useCart((state) => state.addItem);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="gradient-card rounded-xl overflow-hidden shadow-card animate-fade-in">
      <div className="relative h-36 bg-secondary/50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.popular && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-semibold text-primary-foreground">Popular</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description}
        </p>
        
        <button
          onClick={() => addItem(item)}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all',
            'gradient-warm text-primary-foreground shadow-glow hover:opacity-90 active:scale-[0.98]'
          )}
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
