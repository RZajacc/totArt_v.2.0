import Image from 'next/image';
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  imgSrc: string;
}

function FavButton({ imgSrc, ...props }: Props) {
  return (
    <button className="absolute right-2 top-2" {...props}>
      <Image src={imgSrc} alt="empty-heart" className="w-12" priority />
    </button>
  );
}

export default FavButton;
