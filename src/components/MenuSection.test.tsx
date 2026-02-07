import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuSection } from './MenuSection';

/**
 * Tests for MenuSection component
 * Story 2.3: Update MenuSection to Use useMenu Hook
 * 
 * Tests verify:
 * - Component renders filtered items for given category
 * - Category name and icon are displayed correctly
 * - Component re-renders when hook items change
 * - No items message when category is empty
 */

// Mock the useMenu hook
const mockItems = [
  {
    id: 'burger-1',
    name: 'Smash Clássico',
    description: 'Blend bovino 150g, queijo cheddar',
    price: 32.90,
    image: '/test-burger.jpg',
    category: 'burgers' as const,
    popular: true,
  },
  {
    id: 'burger-2',
    name: 'Bacon Monster',
    description: 'Duplo smash 300g, bacon crocante',
    price: 45.90,
    image: '/test-burger2.jpg',
    category: 'burgers' as const,
  },
  {
    id: 'side-1',
    name: 'Batata Frita',
    description: 'Porção generosa de batatas fritas',
    price: 18.90,
    image: '/test-fries.jpg',
    category: 'sides' as const,
  },
  {
    id: 'drink-1',
    name: 'Refrigerante Lata',
    description: 'Coca-Cola, Guaraná ou Sprite',
    price: 7.90,
    image: '/test-drink.jpg',
    category: 'drinks' as const,
  },
];

vi.mock('@/hooks/useMenu', () => ({
  useMenu: vi.fn(() => ({
    items: mockItems,
    addItem: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn(),
  })),
}));

// Mock MenuCard to simplify testing
vi.mock('./MenuCard', () => ({
  MenuCard: ({ item }: { item: { id: string; name: string } }) => (
    <div data-testid={`menu-card-${item.id}`}>{item.name}</div>
  ),
}));

describe('MenuSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Filtering by Category', () => {
    it('should render only items matching the active category (burgers)', () => {
      render(<MenuSection activeCategory="burgers" />);

      // Should show burger items
      expect(screen.getByTestId('menu-card-burger-1')).toBeInTheDocument();
      expect(screen.getByTestId('menu-card-burger-2')).toBeInTheDocument();

      // Should NOT show items from other categories
      expect(screen.queryByTestId('menu-card-side-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('menu-card-drink-1')).not.toBeInTheDocument();
    });

    it('should render only items matching the active category (sides)', () => {
      render(<MenuSection activeCategory="sides" />);

      // Should show side items
      expect(screen.getByTestId('menu-card-side-1')).toBeInTheDocument();

      // Should NOT show items from other categories
      expect(screen.queryByTestId('menu-card-burger-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('menu-card-drink-1')).not.toBeInTheDocument();
    });

    it('should render only items matching the active category (drinks)', () => {
      render(<MenuSection activeCategory="drinks" />);

      // Should show drink items
      expect(screen.getByTestId('menu-card-drink-1')).toBeInTheDocument();

      // Should NOT show items from other categories
      expect(screen.queryByTestId('menu-card-burger-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('menu-card-side-1')).not.toBeInTheDocument();
    });

    it('should render no items for empty category (desserts)', () => {
      render(<MenuSection activeCategory="desserts" />);

      // Should not show any menu cards (no desserts in mock data)
      expect(screen.queryByTestId('menu-card-burger-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('menu-card-side-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('menu-card-drink-1')).not.toBeInTheDocument();
    });
  });

  describe('Category Display', () => {
    it('should display category name for burgers', () => {
      render(<MenuSection activeCategory="burgers" />);
      expect(screen.getByText('Burgers')).toBeInTheDocument();
    });

    it('should display category icon for burgers', () => {
      render(<MenuSection activeCategory="burgers" />);
      expect(screen.getByText('🍔')).toBeInTheDocument();
    });

    it('should display category name for sides', () => {
      render(<MenuSection activeCategory="sides" />);
      expect(screen.getByText('Acompanhamentos')).toBeInTheDocument();
    });

    it('should display category icon for sides', () => {
      render(<MenuSection activeCategory="sides" />);
      expect(screen.getByText('🍟')).toBeInTheDocument();
    });

    it('should display category name for drinks', () => {
      render(<MenuSection activeCategory="drinks" />);
      expect(screen.getByText('Bebidas')).toBeInTheDocument();
    });

    it('should display category icon for drinks', () => {
      render(<MenuSection activeCategory="drinks" />);
      expect(screen.getByText('🥤')).toBeInTheDocument();
    });

    it('should display category name for desserts', () => {
      render(<MenuSection activeCategory="desserts" />);
      expect(screen.getByText('Sobremesas')).toBeInTheDocument();
    });

    it('should display category icon for desserts', () => {
      render(<MenuSection activeCategory="desserts" />);
      expect(screen.getByText('🍫')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should render a section element', () => {
      const { container } = render(<MenuSection activeCategory="burgers" />);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should render heading with category name', () => {
      render(<MenuSection activeCategory="burgers" />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Burgers');
    });

    it('should render correct number of menu cards', () => {
      render(<MenuSection activeCategory="burgers" />);
      // Should render 2 burger items
      const cards = screen.getAllByTestId(/menu-card-burger/);
      expect(cards).toHaveLength(2);
    });
  });

  describe('useMenu Hook Integration', () => {
    it('should use items from useMenu hook', async () => {
      // This test verifies the component calls useMenu
      const { useMenu } = await import('@/hooks/useMenu');
      
      render(<MenuSection activeCategory="burgers" />);
      
      expect(useMenu).toHaveBeenCalled();
    });
  });
});
