import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoNormal from '../../../public/logo_normal.png';

type Props = {};

function Nav_Mobile({}: Props) {
  const handleMobileNavButtonClick = () => {
    const backdrop = document.querySelector('#backdrop') as HTMLDivElement;
    const sidenav = document.querySelector('#sidenav') as HTMLDivElement;
    backdrop.classList.toggle('hidden');
    sidenav.classList.toggle('hidden');
  };

  return (
    <div className="flex items-center justify-between md:hidden">
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
  );
}

export default Nav_Mobile;
