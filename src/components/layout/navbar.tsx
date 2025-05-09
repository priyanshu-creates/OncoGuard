import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggleButton } from './theme-toggle-button';

export function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <ShieldCheck className="h-8 w-8 text-accent dark:text-primary-foreground" />
            <span>OncoGuard</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Navigation links can be added here if needed */}
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
