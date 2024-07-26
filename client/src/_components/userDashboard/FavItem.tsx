import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';

import linkIcon from '../../assets/link-svgrepo-com.svg';
import binIcon from '../../assets/trash-can.svg';

import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '../../fetchers/LocationFavsData';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  id: string;
  title: string;
  userEmail: string;
};

function FavItem({ id, title, userEmail }: Props) {
  const { mutateUser } = useContext(AuthContext);

  // Mutation to trigger on upon button click
  const { trigger: triggerFavsHandler } = useSWRMutation(
    'http://localhost:5000/api/users/handleFavouriteLocations',
    locationFavsData,
  );

  const handleFavs = async () => {
    await triggerFavsHandler({ email: userEmail, locactionId: id });
    mutateUser();
  };

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
        <button onClick={handleFavs}>
          <Image src={binIcon} alt="link" className="w-5" />
        </button>
      </div>
    </li>
  );
}

export default FavItem;
