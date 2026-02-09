/**
 * ValidationScreen Component
 * 
 * Story 1.1 & 1.2: Validate Table Number on App Load
 * 
 * Displays a friendly error message when the table number is missing or invalid.
 * This component is shown instead of the menu when the QR code validation fails.
 * 
 * @param error - The type of validation error ('missing' or 'invalid')
 * 
 * @example
 * ```tsx
 * // When table number is missing or invalid
 * <ValidationScreen error="missing" />
 * <ValidationScreen error="invalid" />
 * ```
 */

interface ValidationScreenProps {
  /** The type of validation error */
  error: 'missing' | 'invalid';
}

export function ValidationScreen({ error }: ValidationScreenProps) {
  return (
    <main
      role="main"
      data-testid="validation-screen"
      className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12"
    >
      <div className="max-w-md text-center space-y-6">
        {/* Visual Indicator */}
        <div className="text-6xl mb-4" aria-hidden="true">
          🍔
        </div>

        {/* Brand */}
        <h1 className="font-display text-3xl font-bold text-primary">
          ByteBurger
        </h1>

        {/* Error Message */}
        <div className="space-y-4">
          <p className="text-lg text-foreground leading-relaxed">
            Este link só funciona com os QR codes das mesas da hamburgueria.
          </p>

          <p className="text-sm text-muted-foreground">
            {error === 'missing' 
              ? 'Escaneie o QR code da sua mesa para acessar o cardápio.'
              : 'O número da mesa informado é inválido. Por favor, escaneie novamente o QR code.'
            }
          </p>
        </div>

        {/* Help Section */}
        <div className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Precisa de ajuda? Chame um atendente.
          </p>
        </div>
      </div>
    </main>
  );
}
