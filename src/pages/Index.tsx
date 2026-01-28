import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategoryTabs } from '@/components/CategoryTabs';
import { MenuSection } from '@/components/MenuSection';
import { CartButton } from '@/components/CartButton';
import { CartSheet } from '@/components/CartSheet';
import { CheckoutSheet } from '@/components/CheckoutSheet';
import { OrderTicket } from '@/components/OrderTicket';

type ViewState = 'menu' | 'ticket';

const Index = () => {
  const [searchParams] = useSearchParams();
  const [tableNumber, setTableNumber] = useState(1);
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('menu');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const mesa = searchParams.get('mesa');
    if (mesa) {
      const num = parseInt(mesa, 10);
      if (!isNaN(num) && num > 0) {
        setTableNumber(num);
      }
    }
  }, [searchParams]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (id: string) => {
    setOrderId(id);
    setIsCheckoutOpen(false);
    setViewState('ticket');
  };

  const handleNewOrder = () => {
    setViewState('menu');
    setOrderId('');
  };

  if (viewState === 'ticket') {
    return (
      <OrderTicket
        orderId={orderId}
        tableNumber={tableNumber}
        onNewOrder={handleNewOrder}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header tableNumber={tableNumber} />
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <MenuSection activeCategory={activeCategory} />
      
      <CartButton onClick={() => setIsCartOpen(true)} />
      
      <CartSheet
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      <CheckoutSheet
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        tableNumber={tableNumber}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};

export default Index;
