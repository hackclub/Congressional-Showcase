import type { Metadata } from 'next';
import LenisProvider from '@/components/LenisProvider';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'NeuroLens - AI-Powered Neuro-Oncology',
  description: 'Congressional App Challenge Winner. Accessible neuro-oncology diagnostics powered by AI.',
  keywords: ['neuro-oncology', 'medical AI', 'brain tumor', 'diagnostics'],
  openGraph: {
    title: 'NeuroLens',
    description: 'Congressional App Challenge Winner. Accessible neuro-oncology diagnostics.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
