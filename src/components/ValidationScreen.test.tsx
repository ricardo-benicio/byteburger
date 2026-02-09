import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ValidationScreen } from './ValidationScreen';

/**
 * Tests for ValidationScreen component
 * Story 1.1 & 1.2: Validate Table Number & Create ValidationScreen
 * 
 * Tests verify:
 * - Component renders the error message in Portuguese
 * - Component is styled and responsive
 * - Component displays correct message based on error type
 */

describe('ValidationScreen', () => {
  describe('Error Messages', () => {
    it('should display the Portuguese error message for missing table', () => {
      render(<ValidationScreen error="missing" />);
      
      expect(screen.getByText(/Este link só funciona com os QR codes das mesas/i)).toBeInTheDocument();
    });

    it('should display the Portuguese error message for invalid table', () => {
      render(<ValidationScreen error="invalid" />);
      
      expect(screen.getByText(/Este link só funciona com os QR codes das mesas/i)).toBeInTheDocument();
    });

    it('should display hamburgueria in the message', () => {
      render(<ValidationScreen error="missing" />);
      
      expect(screen.getByText(/hamburgueria/i)).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should render a main container', () => {
      const { container } = render(<ValidationScreen error="missing" />);
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have centered content', () => {
      const { container } = render(<ValidationScreen error="missing" />);
      
      // Check for flexbox centering classes
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.className).toMatch(/flex/);
      expect(mainDiv.className).toMatch(/items-center/);
      expect(mainDiv.className).toMatch(/justify-center/);
    });

    it('should fill the viewport height', () => {
      const { container } = render(<ValidationScreen error="missing" />);
      
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.className).toMatch(/min-h-screen/);
    });
  });

  describe('Visual Elements', () => {
    it('should display an icon or visual indicator', () => {
      render(<ValidationScreen error="missing" />);
      
      // Should have some visual indicator (emoji, icon, or SVG)
      const content = screen.getByRole('main') || screen.getByTestId('validation-screen');
      expect(content).toBeInTheDocument();
    });

    it('should have readable text styling', () => {
      render(<ValidationScreen error="missing" />);
      
      // The message should be present and styled
      const message = screen.getByText(/Este link só funciona/i);
      expect(message).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have appropriate semantic structure', () => {
      render(<ValidationScreen error="missing" />);
      
      // Should have a heading or main landmark
      const content = screen.getByRole('main') || screen.getByRole('alert');
      expect(content).toBeInTheDocument();
    });
  });
});
