import React from 'react';
import { User, post } from '../../types/types';
import emptyHeart from '../../../public/heart_empty.svg';
import fullHeart from '../../../public/heart_full.svg';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '../../fetchers/LocationFavsData';

type Props = {
  user: User;
  data: post;
  mutate: (user?: User) => void;
};

function LocationDetails({ user, data, mutate }: Props) {
  // Mutation to trigger on upon button click
  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/users/addToUserFavourites',
    locationFavsData,
  );

  // Add or remove from favourites
  const handleFavourites = async () => {
    try {
      const result = await trigger({
        email: user.email,
        locactionId: data._id,
      });
      if (result) {
        mutate({ ...user, favs: result.favs });
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid gap-y-3">
        <section className="flex items-center justify-center">
          <h1 className="mx-4 text-center text-lg font-bold">
            Title: <span className="font-normal">{data?.title}</span>
          </h1>
          {user?.favs?.includes(data?._id) ? (
            <button onClick={handleFavourites}>
              <Image src={fullHeart} alt="full-heart" width={30} height={30} />
            </button>
          ) : (
            <button onClick={handleFavourites}>
              <Image
                src={emptyHeart}
                alt="empty-heart"
                width={30}
                height={30}
              />
            </button>
          )}
        </section>

        <section>
          <h2 className="text-center font-bold">Description:</h2>
          <p className="text-center">{data?.description}</p>
        </section>
        <section>
          <h2 className="text-center font-bold">Where to find it</h2>
          <p className="text-center">{data?.location}</p>
        </section>

        <section className="flex items-center justify-center">
          <div>
            <strong>Posted by: </strong>
            <em>{data?.author.userName}</em>
          </div>
        </section>

        <Image
          src={data?.imageUrl}
          alt="user-img"
          width={500}
          height={500}
          className="rounded-sm"
        />
        <div></div>
      </div>
    </>
  );
}

export default LocationDetails;
