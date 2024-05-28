'use client';
import Nav_Desktop from './Nav_Desktop';
import Nav_Mobile from './Nav_Mobile';

function Navbar() {
  return (
    <nav className="fixed left-0 top-0  w-full bg-gradient-to-t from-amber-100 to-amber-50">
      {/* DESKTOP NAVBAR */}
      <Nav_Desktop />

      {/* MOBILE NAVBAR */}
      <Nav_Mobile />
    </nav>
  );
}

export default Navbar;
