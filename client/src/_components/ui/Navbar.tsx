'use client';
import Link from 'next/link';
import logoNormal from '../../../public/logo_normal.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const handleMobileNavButtonClick = (e: React.MouseEvent<SVGSVGElement>) => {
    console.log(e);
  };
  return (
    <nav className="fixed left-0 top-0  w-full">
      {/* DESKTOP NAVBAR */}
      <div
        id="desktop-nav"
        className="hidden items-center justify-between md:flex"
      >
        <section>
          <Link href={'/'}>
            <Image src={logoNormal} alt="logo" width={30} className="mx-5" />
          </Link>
        </section>

        <section className="space-x-5">
          <Link
            href={'/'}
            className={`link ${pathname === '/' ? 'font-bold' : ''}`}
          >
            Home
          </Link>
          <Link
            href={'locations'}
            className={`link ${pathname === '/locations' ? 'font-bold' : ''}`}
          >
            Locations
          </Link>
          <Link
            href={'contact'}
            className={`link ${pathname === '/contact' ? 'font-bold' : ''}`}
          >
            Contact
          </Link>
          <Link
            href={'account'}
            className={`link ${pathname === '/account' ? 'font-bold' : ''}`}
          >
            Account
          </Link>
        </section>

        {/* TEMP */}
        <section className="mx-5 flex space-x-5">
          <p>Account</p>
          <p>Logout</p>
        </section>
      </div>

      {/* MOBILE NAVBAR */}
      <div id="mobile" className="flex items-center justify-between md:hidden">
        <section>
          <Link href={'/'}>
            <Image src={logoNormal} alt="logo" width={30} className="mx-5" />
          </Link>
        </section>

        <section>
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            stroke="black"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="mx-5 cursor-pointer"
            onClick={handleMobileNavButtonClick}
          >
            <line x1="2" y1="4.2" x2="22" y2="4.2" />
            <line x1="8" y1="9.4" x2="22" y2="9.4" />
            <line x1="2" y1="14.6" x2="22" y2="14.6" />
            <line x1="8" y1="19.8" x2="22" y2="19.8" />
          </svg>
        </section>
      </div>
    </nav>
  );
}

export default Navbar;
