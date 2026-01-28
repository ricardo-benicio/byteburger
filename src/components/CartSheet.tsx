import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSheet({ open, onClose, onCheckout }: CartSheetProps) {
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const total = useCart((state) => state.getTotal());

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-background border-border">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-2xl">Seu Pedido</SheetTitle>
            <button onClick={onClose} className="p-2 rounded-full bg-secondary">
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 max-h-[50vh]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 rounded-xl bg-card animate-fade-in"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-secondary"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-primary font-bold mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
            </div>
            
            <button
              onClick={onCheckout}
              className={cn(
                'w-full py-4 rounded-xl font-semibold text-lg transition-all',
                'gradient-warm text-primary-foreground shadow-glow',
                'hover:opacity-90 active:scale-[0.98]'
              )}
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
