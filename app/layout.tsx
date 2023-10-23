import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from "../provider/SessionProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Willfit ポータルサイト',
  description: 'Willfit ポータルサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="ja">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
