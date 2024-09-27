// Libraries
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWRMutation from 'swr/mutation';
// Fetching data
import { locationFavsData } from '@/lib/clientMethods/locationMethods/LocationFavsData';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Assets
import linkIcon from '@/assets/link-svgrepo-com.svg';
import binIcon from '@/assets/trash-can.svg';

type Props = {
  id: string;
  title: string;
  userEmail: string;
};

function FavItem({ id, title, userEmail }: Props) {
  const { revalidateUser } = useContext(AuthContext);

  // Mutation to trigger on upon button click
  const { trigger: triggerFavsHandler } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/handleFavouriteLocations`,
    locationFavsData,
  );

  const handleFavs = async () => {
    await triggerFavsHandler({ email: userEmail, locactionId: id });
    revalidateUser();
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
