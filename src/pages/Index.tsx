import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoryTabs } from '@/components/CategoryTabs';
import { MenuSection } from '@/components/MenuSection';
import { CartButton } from '@/components/CartButton';
import { CartSheet } from '@/components/CartSheet';
import { CheckoutSheet } from '@/components/CheckoutSheet';
import { OrderTicket } from '@/components/OrderTicket';
import { ValidationScreen } from '@/components/ValidationScreen';
import { useTableValidation } from '@/hooks/useTableValidation';

/**
 * Index Page - Customer Ordering Interface
 * 
 * Story 1.1: Validates table number from URL (?mesa=N)
 * - If valid: Shows the menu ordering interface
 * - If invalid/missing: Shows ValidationScreen with error message
 * 
 * The table number is read from the URL search params and validated
 * using the useTableValidation hook.
 */

type ViewState = 'menu' | 'ticket';

const Index = () => {
  // Validate table number from URL
  const { isValid, tableNumber, error } = useTableValidation();
  
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('menu');
  const [orderId, setOrderId] = useState('');

  // Show validation error screen if table number is invalid
  if (!isValid) {
    return <ValidationScreen error={error!} />;
  }

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
        tableNumber={tableNumber!}
        onNewOrder={handleNewOrder}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header tableNumber={tableNumber!} />
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
        tableNumber={tableNumber!}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};

export default Index;
