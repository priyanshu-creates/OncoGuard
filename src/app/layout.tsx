
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

// GeistSans from 'geist/font/sans' is an object, not a function.
// It provides `GeistSans.variable` (a class name to set the CSS variable)
// and `GeistSans.className` (a class name to apply the font directly).
// The CSS variable name is fixed (e.g., --font-geist-sans).

export const metadata: Metadata = {
  title: 'OncoGuard - AI Breast Cancer Risk Assessment',
  description: 'AI-powered tool for preliminary breast cancer risk assessment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, "font-sans")} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
