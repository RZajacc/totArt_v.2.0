// Libraries
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
// Components
import { ErrorView } from '../ui/state/ErrorView';
import FavButton from './FavButton';
// Fetching data
import { locationFavsData } from '@/fetchers/LocationFavsData';
// Context data
import { AuthContext } from '../../context/AuthContext';
// Assets
import emptyHeart from '@/assets/heart_empty.svg';
import fullHeart from '@/assets/heart_full.svg';
// Types
import { locationData } from '@/types/locationTypes';
import LinkDark from '../ui/links/LinkDark';

type Props = {
  locationData: locationData;
};

function LocationCard({ locationData }: Props) {
  const { user, mutateUser } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(false);

  // Mutation to trigger on upon button click
  const { trigger: triggerFavsHandler, error: favshandlerError } =
    useSWRMutation(
      `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/handleFavouriteLocations`,
      locationFavsData,
    );

  // Render error view if favourite was not added properly
  if (favshandlerError) {
    return <ErrorView error={favshandlerError} />;
  }

  // Add or remove favourite from the list
  const handleFavourites = async (locId: string) => {
    await triggerFavsHandler({ email: user!.email, locactionId: locId });
    setIsFav((prevState) => !prevState);
    mutateUser();
  };

  // Check if current location is saved by the user
  useEffect(() => {
    const test = user?.favs.filter((fav) => {
      return fav._id === locationData._id;
    });
    if (test?.length !== 0) {
      setIsFav(true);
    }
  }, [user]);

  return (
    <div className="grid content-between rounded-lg border-2 border-black bg-slate-100 shadow-md shadow-black">
      <section className="relative">
        {user ? (
          isFav ? (
            <FavButton
              imgSrc={fullHeart}
              onClick={() => {
                handleFavourites(locationData._id);
              }}
            />
          ) : (
            <FavButton
              imgSrc={emptyHeart}
              onClick={() => {
                handleFavourites(locationData._id);
              }}
            />
          )
        ) : (
          ''
        )}

        <Image
          src={locationData.image.secure_url}
          alt={locationData.title}
          width={locationData.image.width}
          height={locationData.image.height}
          className="rounded-md"
          priority
        />
      </section>

      <section className="mb-4 mt-1 text-center">
        <h3 className="mb-3 text-xl font-bold">{locationData.title}</h3>
        <LinkDark href={`/locations/${locationData._id}`}>See more</LinkDark>
      </section>
    </div>
  );
}

export default LocationCard;
