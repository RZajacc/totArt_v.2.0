// Libraries
import { useContext } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Assets
import logoNormal from '@/assets/logo_normal.png';
import NavLink from '../links/NavLink';
import ButtonRed from '../buttons/ButtonRed';
import Link from 'next/link';
import { Rounded } from 'enums/StyleEnums';

type Props = {};

function NavDesktop({}: Props) {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <div className="hidden items-center justify-between md:flex">
      <section>
        <Link href={'/'}>
          <Image
            src={logoNormal}
            alt="logo"
            width={30}
            className="mx-5"
            priority
          />
        </Link>
      </section>

      <section className="space-x-5">
        <NavLink href="/" currentPath={pathname} pathPattern="/">
          Home
        </NavLink>
        <NavLink
          href="/locations"
          currentPath={pathname}
          pathPattern="/locations"
        >
          Locations
        </NavLink>
        <NavLink href="/contact" currentPath={pathname} pathPattern="/contact">
          Contact
        </NavLink>
      </section>

      {/* User section */}
      <section className="mr-8 flex items-center space-x-2">
        {user ? (
          <>
            <NavLink
              href="/account"
              currentPath={pathname}
              pathPattern="/account"
            >
              Account
            </NavLink>

            <ButtonRed rounded={Rounded.large} onClick={logout}>
              Logout
            </ButtonRed>
          </>
        ) : (
          <>
            <NavLink href="/login" currentPath={pathname} pathPattern="/login">
              Login
            </NavLink>
            <NavLink
              href="/register"
              currentPath={pathname}
              pathPattern="/register"
            >
              Register
            </NavLink>
          </>
        )}
      </section>
    </div>
  );
}

export default NavDesktop;
