'use client';
import MyNav from '../_components/ui/Navbar';
import { Montserrat } from 'next/font/google';
import './globals.css';
import NavModal from '../_components/ui/NavModal';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleBackroInteraction = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.currentTarget.classList.toggle('hidden');
    const sidenav = document.querySelector('#sidenav') as HTMLDivElement;
    sidenav.classList.toggle('hidden');
  };
  return (
    <html lang="en" className={montserrat.className}>
      <body className="h-lvh">
        <MyNav />
        <main className="mt-[51px] h-lvh bg-gradient-to-t from-amber-200 to-amber-50">
          <div
            id="backdrop"
            className="animate-fadein fixed left-0 top-0 z-10 hidden h-lvh w-lvw bg-slate-800"
            onClick={handleBackroInteraction}
            onScroll={handleBackroInteraction}
          ></div>
          <NavModal />
          {children}
        </main>
      </body>
    </html>
  );
}
