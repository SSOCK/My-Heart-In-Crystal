import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Jua } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
// import { connectToMongoDB } from '@/shared/database/mongodb/config';
import AuthProvider from '@/shared/components/providers/AuthProvider';
import QueryProvider from '@/shared/components/providers/QueryProvider';

const inter = Jua({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My Heart Crystal',
  description: '수정 구슬 속 내 마음',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(inter.className, 'min-h-svh bg-primary')}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Analytics />
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ''} />
      </body>
    </html>
  );
}
