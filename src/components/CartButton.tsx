import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const itemCount = useCart((state) => state.getItemCount());
  const total = useCart((state) => state.getTotal());

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
      <button
        onClick={onClick}
        className={cn(
          'w-full max-w-md mx-auto flex items-center justify-between p-4 rounded-xl',
          'gradient-warm text-primary-foreground shadow-glow',
          'animate-slide-up active:scale-[0.98] transition-transform'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-background text-primary text-xs font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <span className="font-semibold">Ver Carrinho</span>
        </div>
        <span className="font-bold text-lg">{formatPrice(total)}</span>
      </button>
    </div>
  );
}
