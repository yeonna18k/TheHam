import "./globals.css";

export const metadata = {
  title: 'My PWA App',
  description: 'Next.js App Router 기반 PWA',
  manifest: '/manifest.json',
  themeColor: '#000000',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
