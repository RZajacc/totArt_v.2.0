'use client';
import Nav_Desktop from './Nav_Desktop';
import Nav_Mobile from './Nav_Mobile';

function Navbar() {
  return (
    <nav className="fixed left-0 top-0  w-full">
      {/* DESKTOP NAVBAR */}
      <Nav_Desktop />

      {/* MOBILE NAVBAR */}
      <Nav_Mobile />
    </nav>
  );
}

export default Navbar;
