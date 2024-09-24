'use client';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import FavButton from '../locations/FavButton';
import emptyHeart from '@/assets/heart_empty.svg';
import fullHeart from '@/assets/heart_full.svg';
import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '@/fetchers/LocationFavsData';

type Props = {
  locationId: string;
};

function FavSection({ locationId }: Props) {
  const { user, refetchUser } = useContext(AuthContext);

  // Mutation to trigger on upon button click
  const { trigger: triggerFavsHandler } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/handleFavouriteLocations`,
    locationFavsData,
  );

  // Add or remove favourite from the list
  const handleFavourites = async (locId: string) => {
    await triggerFavsHandler({ email: user!.email, locactionId: locId });
    // setIsFav((prevState) => !prevState);
    refetchUser();
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
