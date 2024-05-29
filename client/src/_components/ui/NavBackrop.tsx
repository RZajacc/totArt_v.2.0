'use client';
import React from 'react';

type Props = {};

function NavBackrop({}: Props) {
  const handleBackroInteraction = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.currentTarget.classList.toggle('hidden');
    const sidenav = document.querySelector('#sidenav') as HTMLDivElement;
    sidenav.classList.toggle('hidden');
  };
  return (
    <div
      id="backdrop"
      className="fixed left-0 top-0 z-10 hidden h-lvh w-lvw animate-fadein bg-slate-800"
      onClick={handleBackroInteraction}
      onScroll={handleBackroInteraction}
    ></div>
  );
}

export default NavBackrop;
