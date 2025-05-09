import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <Loader2
      style={{ width: size, height: size }}
      className={cn("animate-spin text-accent", className)}
    />
  );
}

// Helper function for cn if not globally available (it is via lib/utils)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
