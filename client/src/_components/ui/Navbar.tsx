'use client';
import { useContext } from 'react';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <nav className="fixed left-0 top-0 w-full bg-gradient-to-t from-amber-50 to-white">
      {/* DESKTOP NAVBAR */}
      <NavDesktop isLoggedIn={isLoggedIn} />

      {/* MOBILE NAVBAR */}
      <NavMobile />
    </nav>
  );
}

export default Navbar;
