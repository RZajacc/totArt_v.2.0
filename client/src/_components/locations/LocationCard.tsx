import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';

import emptyHeart from '../../assets/heart_empty.svg';
import fullHeart from '../../assets/heart_full.svg';
import { AuthContext } from '../../context/AuthContext';
import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '../../fetchers/LocationFavsData';
import { ErrorView } from '../ui/ErrorView';
import { locationData } from '../../types/LocationTypes';

type Props = {
  locationData: locationData;
};

function LocationCard({ locationData }: Props) {
  const { user, mutateUser } = useContext(AuthContext);
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
    mutateUser();
  };
  return (
    <div
      key={locationData._id}
      className="rounded-lg border-2 border-black shadow-md shadow-black"
    >
      <section className="relative">
        {user ? (
          user.favs?.includes(locationData._id) ? (
            <button
              className="absolute right-2 top-2"
              onClick={() => {
                handleFavourites(locationData._id);
              }}
            >
              <Image src={fullHeart} width={42} height={42} alt="empty-heart" />
            </button>
          ) : (
            <button
              className="absolute right-2 top-2"
              onClick={() => {
                handleFavourites(locationData._id);
              }}
            >
              <Image
                src={emptyHeart}
                width={42}
                height={42}
                alt="empty-heart"
              />
            </button>
          )
        ) : (
          ''
        )}

        {/* For now Im using some arbitrary values untill I update image info in DB */}
        <Image
          src={locationData.image.secure_url}
          alt={locationData.title}
          width={600}
          height={600}
          layout="responsive"
          className="rounded-lg"
        />
      </section>
      <section className="mb-4 mt-1 text-center">
        <h3 className="mb-3 text-xl font-bold">{locationData.title}</h3>
        {/* Temporary location until connecting view is ready*/}
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
