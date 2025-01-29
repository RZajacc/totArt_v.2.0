'use client';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import FavButton from '../locations/FavButton';
import emptyHeart from '@/assets/heart_empty.svg';
import fullHeart from '@/assets/heart_full.svg';
import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '@/lib/clientMethods/locationMethods/LocationFavsData';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';

type Props = {
  locationId: string;
};

function FavSection({ locationId }: Props) {
  const { user, revalidateUser } = useContext(AuthContext);

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  // Mutation to trigger on upon button click
  const { trigger: triggerFavsHandler } = useSWRMutation(
    `${FETCH_URL}/api/users/handleFavouriteLocations`,
    locationFavsData,
  );

  // Add or remove favourite from the list
  const handleFavourites = async (locId: string) => {
    await triggerFavsHandler({ email: user!.email, locactionId: locId });
    // setIsFav((prevState) => !prevState);
    revalidateUser();
  };
  return (
    <>
      {user ? (
        user?.favs.find(({ _id }) => {
          return _id === locationId;
        }) ? (
          <FavButton
            imgSrc={fullHeart}
            onClick={() => {
              handleFavourites(locationId);
            }}
          />
        ) : (
          <FavButton
            imgSrc={emptyHeart}
            onClick={() => {
              handleFavourites(locationId);
            }}
          />
        )
      ) : (
        ''
      )}
    </>
  );
}

export default FavSection;
