import type { Metadata } from 'next';
import '@/index.css';
import { Providers } from '@/providers/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | ESG GenAI Platform',
    default: 'ESG GenAI Platform',
  },
  description: 'AI-powered ESG compliance and reporting platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 