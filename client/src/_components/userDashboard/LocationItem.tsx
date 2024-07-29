import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import linkIcon from '../../assets/link-svgrepo-com.svg';
import binIcon from '../../assets/trash-can.svg';

type Props = {
  id: string;
  title: string;
  imageId: string;
  image_publicId: string;
};

function LocationItem({ title, id, imageId, image_publicId }: Props) {
  const [showDeleteField, setShowDeleteField] = useState(false);
  const handleRemovingLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <li className="my-2 flex items-center justify-between border-b-2 border-stone-400 py-2">
        <p>
          <span className="font-bold">Title : </span>
          {title}
        </p>
        <div className="mr-2 flex gap-x-3">
          <Link href={`/locations/${id}`}>
            <Image src={linkIcon} alt="link" className="w-5" />
          </Link>
          <button>
            <Image src={binIcon} alt="link" className="w-5" />
          </button>
        </div>
      </li>
      <div>
        <p>
          If you're sure you want to delete this location type{' '}
          <strong>'DELETE'</strong> below:
        </p>
        <div>
          <form
            onSubmit={handleRemovingLocation}
            className="rounded-md border-2 border-black text-center focus-within:border-red-500"
          >
            <input
              type="text"
              placeholder="type: DELETE"
              className="w-9/12 rounded-l-md px-1 py-1 focus-visible:outline-none"
            />
            <button
              type="submit"
              className=" w-3/12 rounded-r-sm border-l-2 border-black bg-red-500 py-1 font-bold text-stone-200 hover:bg-stone-200 hover:text-red-500"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LocationItem;
