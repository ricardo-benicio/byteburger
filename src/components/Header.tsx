import { MapPin } from 'lucide-react';

interface HeaderProps {
  tableNumber: number;
}

export function Header({ tableNumber }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-gradient">SMASH BURGER</h1>
            <p className="text-sm text-muted-foreground">Os melhores hambúrgueres da cidade</p>
          </div>
          <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Mesa {tableNumber}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
