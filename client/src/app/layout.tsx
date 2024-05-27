import { Metadata } from 'next';
import MyNav from '../_components/ui/MyNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Totart',
  description: 'Cool Berlin locations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MyNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
