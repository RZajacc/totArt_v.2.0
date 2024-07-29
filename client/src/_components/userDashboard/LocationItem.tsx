import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import linkIcon from '../../assets/link-svgrepo-com.svg';
import binIcon from '../../assets/trash-can.svg';

type Props = {
  id: string;
  title: string;
  imageId: string;
  image_publicId: string;
};

function LocationItem({ title, id, imageId, image_publicId }: Props) {
  const handleRemovingLocation = () => {};
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
        <button onClick={handleRemovingLocation}>
          <Image src={binIcon} alt="link" className="w-5" />
        </button>
      </div>
    </li>
  );
}

export default LocationItem;
