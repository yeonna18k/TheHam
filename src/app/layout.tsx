import { Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './Providers';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export const metadata = {
  title: 'TheHam',
  description: 'Next.js App Router 기반 PWA',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: 'black',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
