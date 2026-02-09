import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from './Index';

// Mock the useMenu hook to provide menu items
vi.mock('@/hooks/useMenu', () => ({
  useMenu: () => ({
    items: [
      {
        id: '1',
        name: 'Burger Test',
        description: 'A test burger',
        price: 25.90,
        category: 'burgers',
        image: '/test.jpg',
      },
    ],
    addItem: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn(),
  }),
}));

/**
 * Integration tests for Index page
 * Story 1.1: Validate Table Number on App Load
 * 
 * These tests verify that:
 * - Valid mesa parameter shows the menu
 * - Invalid/missing mesa parameter shows ValidationScreen
 * - Header displays correct table number
 */

describe('Index Page - Table Validation Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Valid Table Numbers', () => {
    it('should display menu interface when mesa=1 is valid', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=1']}>
          <Index />
        </MemoryRouter>
      );
      
      // Header should show table number
      expect(screen.getByText(/Mesa 1/i)).toBeInTheDocument();
      
      // Menu content should be visible
      expect(screen.queryByTestId('validation-screen')).not.toBeInTheDocument();
    });

    it('should display menu interface when mesa=5 is valid', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=5']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Mesa 5/i)).toBeInTheDocument();
    });

    it('should display menu interface when mesa=100 is valid', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=100']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Mesa 100/i)).toBeInTheDocument();
    });
  });

  describe('Missing Table Number', () => {
    it('should show ValidationScreen when mesa parameter is missing', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Index />
        </MemoryRouter>
      );
      
      // ValidationScreen should be displayed
      expect(screen.getByTestId('validation-screen')).toBeInTheDocument();
      
      // Portuguese error message should be shown
      expect(screen.getByText(/Este link só funciona com os QR codes/i)).toBeInTheDocument();
      
      // Header component with "Mesa X" pattern should NOT be visible
      // (The word "mesa" appears in ValidationScreen text, but Header shows "Mesa [number]")
      expect(screen.queryByText(/Mesa \d+/)).not.toBeInTheDocument();
    });

    it('should not render menu content when mesa is missing', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Index />
        </MemoryRouter>
      );
      
      // CategoryTabs should not be visible (we check for specific category text)
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    });
  });

  describe('Invalid Table Numbers', () => {
    it('should show ValidationScreen when mesa=invalid', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=invalid']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByTestId('validation-screen')).toBeInTheDocument();
      expect(screen.getByText(/hamburgueria/i)).toBeInTheDocument();
    });

    it('should show ValidationScreen when mesa=0', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=0']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByTestId('validation-screen')).toBeInTheDocument();
    });

    it('should show ValidationScreen when mesa=-1', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=-1']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByTestId('validation-screen')).toBeInTheDocument();
    });

    it('should show ValidationScreen when mesa=3.14 (decimal)', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=3.14']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByTestId('validation-screen')).toBeInTheDocument();
    });

    it('should show ValidationScreen when mesa is empty string', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByTestId('validation-screen')).toBeInTheDocument();
    });
  });

  describe('Portuguese Error Message', () => {
    it('should display Portuguese message for missing table', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Este link só funciona com os QR codes das mesas da hamburgueria/i)).toBeInTheDocument();
    });

    it('should display Portuguese message for invalid table', () => {
      render(
        <MemoryRouter initialEntries={['/?mesa=abc']}>
          <Index />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Este link só funciona com os QR codes/i)).toBeInTheDocument();
    });
  });

  describe('No Console Errors', () => {
    it('should not throw errors with missing mesa', () => {
      expect(() => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Index />
          </MemoryRouter>
        );
      }).not.toThrow();
    });

    it('should not throw errors with invalid mesa', () => {
      expect(() => {
        render(
          <MemoryRouter initialEntries={['/?mesa=invalid']}>
            <Index />
          </MemoryRouter>
        );
      }).not.toThrow();
    });
  });
});
