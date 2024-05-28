import MyNav from '../_components/ui/Navbar';
import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

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
    <html lang="en" className={montserrat.className}>
      <body className="h-lvh">
        <MyNav />
        <main className="mt-[51px] h-lvh bg-gradient-to-t from-zinc-300 to-amber-100">
          {children}
        </main>
      </body>
    </html>
  );
}
