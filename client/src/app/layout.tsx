// Libraries
import { Metadata } from 'next';
// Style
import { Montserrat } from 'next/font/google';
import './globals.css';
// Components
import Navbar from '@/_components/ui/navigation/Navbar';
import NavSideBar from '@/_components/ui/navigation/NavSideBar';
import NavBackdrop from '@/_components/ui/navigation/NavBackrop';
import Footer from '@/_components/ui/Footer';
// Context data
import { AuthContextProvider } from '../context/AuthContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Totart',
  description: 'Share some cool locations with the others',
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
        <div id="modal"></div>
        <AuthContextProvider>
          <Navbar />
          <NavBackdrop />
          <NavSideBar />
          <main className=" h-full bg-gradient-to-t from-amber-200 to-amber-50 p-3">
            {children}
          </main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
