import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import emptyHeart from '../../assets/heart_empty.svg';
import fullHeart from '../../assets/heart_full.svg';
import { AuthContext } from '../../context/AuthContext';
import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '../../fetchers/LocationFavsData';
import { ErrorView } from '../ui/ErrorView';
import { locationData } from '../../types/LocationTypes';
import FavButton from './FavButton';

type Props = {
  locationData: locationData;
};

function LocationCard({ locationData }: Props) {
  const { user, mutateUser } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(false);

  // Mutation to trigger on upon button click
  const { trigger: triggerFavsHandler, error: favshandlerError } =
    useSWRMutation(
      'http://localhost:5000/api/users/handleFavouriteLocations',
      locationFavsData,
    );

  if (favshandlerError) {
    return <ErrorView error={favshandlerError} />;
  }

  const handleFavourites = async (locId: string) => {
    await triggerFavsHandler({ email: user!.email, locactionId: locId });
    setIsFav((prevState) => !prevState);
    mutateUser();
  };

  useEffect(() => {
    const test = user?.favs.filter((fav) => {
      return fav._id === locationData._id;
    });
    if (test?.length !== 0) {
      setIsFav(true);
    }
  }, [user]);

  return (
    <div
      key={locationData._id}
      className="rounded-lg border-2 border-black shadow-md shadow-black"
    >
      <section className="relative">
        {isFav ? (
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
        )}

        <Image
          src={locationData.image.secure_url}
          alt={locationData.title}
          width={locationData.image.width}
          height={locationData.image.height}
          layout="responsive"
          className="rounded-lg"
        />
      </section>

      <section className="mb-4 mt-1 text-center">
        <h3 className="mb-3 text-xl font-bold">{locationData.title}</h3>
        <Link
          href={`/locations/${locationData._id}`}
          className="rounded-md bg-black px-3 py-2 text-white"
        >
          See more
        </Link>
      </section>
    </div>
  );
}

export default LocationCard;
