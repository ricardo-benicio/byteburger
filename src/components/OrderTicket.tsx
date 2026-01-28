import { CheckCircle2, Clock, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderTicketProps {
  orderId: string;
  tableNumber: number;
  onNewOrder: () => void;
}

export function OrderTicket({ orderId, tableNumber, onNewOrder }: OrderTicketProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-scale-in">
        {/* Ticket */}
        <div className="bg-card rounded-3xl overflow-hidden shadow-card">
          {/* Header */}
          <div className="gradient-warm p-6 text-center text-primary-foreground">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="font-display text-3xl mb-1">Pedido Confirmado!</h1>
            <p className="opacity-90">Seu pedido foi enviado para a cozinha</p>
          </div>

          {/* Ticket Body */}
          <div className="p-6 space-y-6">
            {/* Order ID */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Número do Pedido</p>
              <p className="font-display text-5xl text-primary">{orderId}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-border" />

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-xl p-4 text-center">
                <ChefHat className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Mesa</p>
                <p className="font-bold text-xl">{tableNumber}</p>
              </div>
              <div className="bg-secondary rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Tempo Estimado</p>
                <p className="font-bold text-xl">15-20 min</p>
              </div>
            </div>

            {/* Status */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div>
                  <p className="font-semibold text-primary">Preparando</p>
                  <p className="text-sm text-muted-foreground">
                    A cozinha está preparando seu pedido
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Order Button */}
        <button
          onClick={onNewOrder}
          className={cn(
            'w-full mt-6 py-4 rounded-xl font-semibold transition-all',
            'bg-secondary text-foreground hover:bg-secondary/80',
            'active:scale-[0.98]'
          )}
        >
          Fazer Novo Pedido
        </button>
      </div>
    </div>
  );
}
