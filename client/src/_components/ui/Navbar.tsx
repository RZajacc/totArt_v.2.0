'use client';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 w-full bg-gradient-to-t from-amber-50 to-white">
      {/* DESKTOP NAVBAR */}
      <NavDesktop />

      {/* MOBILE NAVBAR */}
      <NavMobile />
    </nav>
  );
}

export default Navbar;
