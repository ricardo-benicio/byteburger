import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * useTableValidation - Hook for validating table number from URL
 * 
 * Story 1.1: Validate Table Number on App Load
 * 
 * This hook reads the `?mesa=N` parameter from the URL and validates it.
 * Valid table numbers are positive integers (1, 2, 3, etc.).
 * 
 * @returns {TableValidationResult} Validation result with isValid, tableNumber, and error
 * 
 * @example
 * ```tsx
 * function Index() {
 *   const { isValid, tableNumber, error } = useTableValidation();
 *   
 *   if (!isValid) {
 *     return <ValidationScreen error={error} />;
 *   }
 *   
 *   return <CustomerMenu tableNumber={tableNumber} />;
 * }
 * ```
 */

/**
 * Validation error types
 * - 'missing': No mesa parameter in URL
 * - 'invalid': mesa parameter is not a valid positive integer
 */
type ValidationError = 'missing' | 'invalid';

/**
 * Result returned by useTableValidation hook
 */
interface TableValidationResult {
  /** Whether the table number is valid */
  isValid: boolean;
  /** The validated table number (null if invalid) */
  tableNumber: number | null;
  /** Error type if validation failed (null if valid) */
  error: ValidationError | null;
}

/**
 * Validates a table number string
 * 
 * @param mesa - The mesa parameter value from URL
 * @returns Parsed table number or null if invalid
 */
function parseTableNumber(mesa: string | null): number | null {
  // Missing or empty parameter
  if (mesa === null || mesa === '') {
    return null;
  }

  // Try to parse as integer
  const num = parseInt(mesa, 10);

  // Check if it's a valid positive integer
  // - Must not be NaN
  // - Must be greater than 0
  // - Must be an integer (no decimals like 1.5)
  if (isNaN(num) || num <= 0 || mesa !== String(num)) {
    return null;
  }

  return num;
}

/**
 * Hook to validate table number from URL search params
 */
export function useTableValidation(): TableValidationResult {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const mesa = searchParams.get('mesa');
    
    // Check if mesa parameter exists
    if (mesa === null || mesa === '') {
      return {
        isValid: false,
        tableNumber: null,
        error: 'missing' as const,
      };
    }

    // Parse and validate the table number
    const tableNumber = parseTableNumber(mesa);
    
    if (tableNumber === null) {
      return {
        isValid: false,
        tableNumber: null,
        error: 'invalid' as const,
      };
    }

    // Valid table number
    return {
      isValid: true,
      tableNumber,
      error: null,
    };
  }, [searchParams]);
}
