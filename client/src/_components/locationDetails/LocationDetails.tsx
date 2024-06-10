import React from 'react';
import { User, post } from '../../types/types';
import emptyHeart from '../../../public/heart_empty.svg';
import fullHeart from '../../../public/heart_full.svg';
import Image from 'next/image';

type Props = {
  user: User;
  data: post;
};

function LocationDetails({ user, data }: Props) {
  // * ADD OR REMOVE POST FROM FAVOURITES
  //   const { setIsLoggedIn } = useContext(AuthContext);
  //   const handleAddFavs = async () => {
  //     if (user!.favs.includes(data._id)) {
  //       await deleteFromUserArray(user!.email, 'favs', data._id);
  //     } else {
  //       await updateUserData(user!.email, 'favs', data._id);
  //     }
  //   };

  return (
    <>
      <div className="grid gap-y-3">
        <section className="flex items-center justify-center">
          <h1 className="mx-4 text-center text-lg font-bold">
            Title: <span className="font-normal">{data?.title}</span>
          </h1>
          {user?.favs.includes(data ? data._id : '') ? (
            <button
            //   onClick={handleAddFavs}
            >
              <Image src={fullHeart} alt="full-heart" width={30} height={30} />
            </button>
          ) : (
            <button
            //   onClick={handleAddFavs}
            >
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
