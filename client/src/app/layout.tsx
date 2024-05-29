import Navbar from '../_components/ui/Navbar';
import { Montserrat } from 'next/font/google';
import './globals.css';
import NavSideBar from '../_components/ui/NavSideBar';
import NavBackdrop from '../_components/ui/NavBackrop';
import { Metadata } from 'next';
import Footer from '../_components/ui/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Totart',
  description: 'Share some cool locations with the otheres',
  creator: 'Rafał Zając',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={(montserrat.className, 'h-full')}>
      <body className="h-full">
        <Navbar />
        <NavBackdrop />
        <NavSideBar />
        <main className=" h-full bg-gradient-to-t from-amber-200 to-amber-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
