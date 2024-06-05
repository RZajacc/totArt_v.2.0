import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import logoNormal from '../../../public/logo_normal.png';
import { usePathname } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

function NavDesktop({}: Props) {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <div className="hidden items-center justify-between md:flex">
      <section>
        <Link href={'/'}>
          <Image src={logoNormal} alt="logo" width={30} className="mx-5" />
        </Link>
      </section>

      <section className="space-x-5">
        <Link
          href={'/'}
          className={`link ${pathname === '/' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Home
        </Link>
        <Link
          href={'locations'}
          className={`link ${pathname === '/locations' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Locations
        </Link>
        <Link
          href={'contact'}
          className={`link ${pathname === '/contact' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Contact
        </Link>
      </section>

      {/* User section */}
      <section className="mx-5 flex items-center space-x-5">
        {isLoggedIn ? (
          <>
            <Link
              href={'account'}
              className={`link ${pathname === '/account' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse hover:text-green-500'}`}
            >
              Account
            </Link>
            <button
              onClick={logout}
              className="rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:border-2 hover:border-black hover:bg-white hover:text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href={'login'}
            className={`link ${pathname === '/login' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse hover:text-green-500'}`}
          >
            Login
          </Link>
        )}
      </section>
    </div>
  );
}

export default NavDesktop;
