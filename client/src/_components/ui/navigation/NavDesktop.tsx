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

type Props = {};

function NavDesktop({}: Props) {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <div className="hidden items-center justify-between md:flex">
      <section>
        <NavLink href="/">
          <Image src={logoNormal} alt="logo" width={30} className="mx-5" />
        </NavLink>
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

            {/* !!! To change */}
            <ButtonRed onClick={logout}>Logout</ButtonRed>
            {/* <button className="rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:border-2 hover:border-black hover:bg-white hover:text-red-600">
              Logout
            </button> */}
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
