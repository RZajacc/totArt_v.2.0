import Image from 'next/image';
import logo from '../../../public/logo_normal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Props = {};

function NavModal({}: Props) {
  const handleSideNavVisibility = () => {
    const backdrop = document.querySelector('#backdrop');
    const sideNav = document.querySelector('#sidenav');
    sideNav?.classList.toggle('hidden');
    backdrop?.classList.toggle('hidden');
  };
  return (
    <>
      <div
        id="sidenav"
        className="animate-slidein fixed -right-1/2 top-0 z-20 hidden h-lvh w-1/2 bg-white"
      >
        {/* Logo and contact section */}
        <section className="mt-4">
          <h1 className="text-center text-2xl font-bold italic">Totart</h1>
          <Link href={'/'} onClick={handleSideNavVisibility}>
            <Image src={logo} alt="logo" width={42} className="mx-auto" />
          </Link>
          <div className="mt-5 flex justify-center space-x-5">
            <a
              href="https://github.com/RZajacc"
              target="_blank"
              onClick={handleSideNavVisibility}
              className="hover:scale-x-50"
            >
              <FontAwesomeIcon icon={faGithub} size="2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/rafalzajac88/"
              target="_blank"
              onClick={handleSideNavVisibility}
            >
              <FontAwesomeIcon icon={faLinkedinIn} size="2xl" color="#0a66c2" />
            </a>
            <a
              href="mailto:rf.zajac@tutamail.com"
              onClick={handleSideNavVisibility}
            >
              <FontAwesomeIcon
                icon={faEnvelopeOpen}
                size="2xl"
                color="orange"
              />
            </a>
          </div>
          <hr className="mx-auto mt-5 w-32 border-slate-300" />
        </section>
        {/* Navigation section */}
        <ul className="mt-1">
          <li>
            <Link href={'/'} onClick={handleSideNavVisibility}>
              Home
            </Link>
          </li>
          <li>
            <Link href={'/locations'} onClick={handleSideNavVisibility}>
              locations
            </Link>
          </li>
          <li>
            <Link href={'/contact'} onClick={handleSideNavVisibility}>
              Contact
            </Link>
          </li>
          <li>
            <Link href={'/account'} onClick={handleSideNavVisibility}>
              Account
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavModal;
