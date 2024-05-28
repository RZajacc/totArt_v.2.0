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

      {/* TEMP */}
      <section className="mx-5 flex space-x-5">
        <Link
          href={'account'}
          className={`link ${pathname === '/account' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Account
        </Link>
      </section>
    </div>
  );
}

export default Nav_Desktop;
