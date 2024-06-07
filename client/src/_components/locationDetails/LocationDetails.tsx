import React from 'react';
import { User, post } from '../../types/types';

type Props = {
  user: User;
  data: post;
};

function LocationDetails({ user, data }: Props) {
  return (
    <>
      <h1>
        Title:{' '}
        <span className="image-title">
          {data?.title}
          {'  '}
        </span>
        {user ? (
          user?.favs.includes(data ? data._id : '') ? (
            <button
            // onClick={handleAddFavs}
            >
              Delete from{' '}
              <img
                src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354709/other/ra5sovm9gaxynfz3ah6t.svg"
                alt="empty-heart"
                width={'25px'}
              />
            </button>
          ) : (
            <button
            // onClick={handleAddFavs}
            >
              Add to{' '}
              <img
                src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354710/other/l8kxiddecnqx6talp4bz.svg"
                alt="empty-heart"
                width={'25px'}
              />
            </button>
          )
        ) : (
          ''
        )}
      </h1>

      <p>
        <em>
          Added by: <img src={data?.author.userImage} alt="user-mini" />{' '}
          {data?.author.userName}
        </em>
      </p>
      <img src={data?.imageUrl} />

      <div>
        <h2>Description</h2>
        <p>{data?.description}</p>
        <h2>Where to find it</h2>
        <p>{data?.location}</p>
      </div>
    </>
  );
}

export default LocationDetails;
