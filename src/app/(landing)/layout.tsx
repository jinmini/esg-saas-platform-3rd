import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ESG GenAI Compliance Platform',
  description: 'AI-powered ESG compliance and reporting platform',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
} 