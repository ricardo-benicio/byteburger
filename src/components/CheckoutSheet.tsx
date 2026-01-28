import { useState } from 'react';
import { CreditCard, Banknote, QrCode, X, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface CheckoutSheetProps {
  open: boolean;
  onClose: () => void;
  tableNumber: number;
  onOrderComplete: (orderId: string) => void;
}

type PaymentMethod = 'pix' | 'credit' | 'cash';

export function CheckoutSheet({ open, onClose, tableNumber, onOrderComplete }: CheckoutSheetProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const items = useCart((state) => state.items);
  const total = useCart((state) => state.getTotal());
  const clearCart = useCart((state) => state.clearCart);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate order ID
    const orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    
    clearCart();
    setIsProcessing(false);
    onOrderComplete(orderId);
  };

  const paymentMethods = [
    { id: 'pix', label: 'PIX', icon: QrCode },
    { id: 'credit', label: 'Cartão', icon: CreditCard },
    { id: 'cash', label: 'Dinheiro', icon: Banknote },
  ] as const;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-background border-border">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-2xl">Pagamento</SheetTitle>
            <button onClick={onClose} className="p-2 rounded-full bg-secondary">
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-card rounded-xl p-4 space-y-3">
            <h3 className="font-semibold mb-3">Resumo do Pedido</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary text-lg">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Table Info */}
          <div className="bg-card rounded-xl p-4 flex items-center justify-between">
            <span className="text-muted-foreground">Mesa</span>
            <span className="font-bold text-lg">{tableNumber}</span>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold mb-3">Forma de Pagamento</h3>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPaymentMethod(id)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl transition-all',
                    paymentMethod === id
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'bg-card hover:bg-secondary'
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={cn(
              'w-full py-4 rounded-xl font-semibold text-lg transition-all',
              'gradient-warm text-primary-foreground shadow-glow',
              'hover:opacity-90 active:scale-[0.98]',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processando...
              </span>
            ) : (
              `Pagar ${formatPrice(total)}`
            )}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
