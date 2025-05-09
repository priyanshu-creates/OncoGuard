export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          <strong>Disclaimer:</strong> OncoGuard is an AI-powered tool for informational purposes only and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this platform.
        </p>
        <p className="mt-2 text-xs">
          &copy; {new Date().getFullYear()} OncoGuard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
