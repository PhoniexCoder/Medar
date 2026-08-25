import type { Metadata } from 'next';
import './globals.css';
import { APP_NAME } from '@medar/config';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'The professional home for mediation in Asia.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
