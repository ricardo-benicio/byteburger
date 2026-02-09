/**
 * Table Validation Utilities
 * Story 1-1: Validate table number from URL parameter
 */

/**
 * Result of table number validation
 */
export interface TableValidationResult {
  /** Whether the table number is valid */
  isValid: boolean;
  /** The validated table number (only present if valid) */
  tableNumber?: number;
  /** Error message (only present if invalid) */
  error?: string;
}

/**
 * Validates a table number from URL parameter
 * 
 * Valid table numbers must be:
 * - Non-null/non-empty string
 * - Positive integer (> 0)
 * - No decimal values
 * - No leading/trailing whitespace
 * - Pure numeric string (no mixed alphanumeric)
 * 
 * @param mesaParam - Raw parameter from URL (?mesa=N)
 * @returns Validation result with table number if valid
 * 
 * @example
 * validateTableNumber('5')     // { isValid: true, tableNumber: 5 }
 * validateTableNumber(null)    // { isValid: false, error: 'No table number provided' }
 * validateTableNumber('abc')   // { isValid: false, error: 'Invalid table number' }
 * validateTableNumber('-1')    // { isValid: false, error: 'Invalid table number' }
 * validateTableNumber('3.14')  // { isValid: false, error: 'Invalid table number' }
 */
export function validateTableNumber(mesaParam: string | null): TableValidationResult {
  // Check for null or empty string
  if (mesaParam === null || mesaParam === '') {
    return {
      isValid: false,
      error: 'No table number provided',
    };
  }

  // Check for whitespace-only or strings with leading/trailing spaces
  if (mesaParam.trim() !== mesaParam || mesaParam.trim() === '') {
    return {
      isValid: false,
      error: 'Invalid table number',
    };
  }

  // Check if it's a pure integer string (no decimals, no mixed alphanumeric)
  // This regex matches only positive integers without leading zeros (except for single '0')
  const isValidIntegerString = /^[1-9]\d*$/.test(mesaParam);
  
  if (!isValidIntegerString) {
    return {
      isValid: false,
      error: 'Invalid table number',
    };
  }

  const tableNumber = parseInt(mesaParam, 10);
  
  // Double-check: must be positive integer (> 0)
  // This is redundant given our regex, but provides defense in depth
  if (isNaN(tableNumber) || tableNumber <= 0) {
    return {
      isValid: false,
      error: 'Invalid table number',
    };
  }

  return {
    isValid: true,
    tableNumber,
  };
}
