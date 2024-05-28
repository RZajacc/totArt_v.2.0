import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoNormal from '../../../public/logo_normal.png';
import { usePathname } from 'next/navigation';

type Props = {};

function Nav_Desktop({}: Props) {
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
          className={`link ${pathname === '/' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse'}`}
        >
          Home
        </Link>
        <Link
          href={'locations'}
          className={`link ${pathname === '/locations' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse'}`}
        >
          Locations
        </Link>
        <Link
          href={'contact'}
          className={`link ${pathname === '/contact' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse'}`}
        >
          Contact
        </Link>
        <Link
          href={'account'}
          className={`link ${pathname === '/account' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse'}`}
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
  );
}

export default Nav_Desktop;
