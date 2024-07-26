import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import linkIcon from '../../assets/link-svgrepo-com.svg';
import binIcon from '../../assets/trash-can.svg';

type Props = {
  id: string;
  title: string;
};

function FavItem({ id, title }: Props) {
  return (
    <li className="my-2 flex items-center justify-between border-b-2 border-stone-400 py-2">
      <p>
        <span className="font-bold">Title : </span>
        {title}
      </p>
      <div className="mr-2 flex gap-x-3">
        <Link href={`/locations/${id}`}>
          <Image src={linkIcon} alt="link" className="w-5" />
        </Link>
        <Image src={binIcon} alt="link" className="w-5" />
      </div>
    </li>
  );
}

export default FavItem;
