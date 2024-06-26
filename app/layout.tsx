import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { redirect } from 'next/navigation';
import ReduxProvider from '@/redux/redux-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <ReduxProvider>
      <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
