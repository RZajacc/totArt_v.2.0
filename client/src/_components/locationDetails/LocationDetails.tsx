import React, { useState } from 'react';
// Types
import { User } from '../../types/UserTypes';
import { locationType } from '../../types/LocationTypes';
// Images
import emptyHeart from '../../../public/heart_empty.svg';
import fullHeart from '../../../public/heart_full.svg';
import pencil from '../../../public/pencil.svg';
// Dependencies
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
// Data
import { locationFavsData } from '../../fetchers/LocationFavsData';
import EditLocationModal from './EditLocationModal';

type Props = {
  user: User;
  data: locationType;
  mutateUser: (user?: User) => void;
  mutateLocation: (location?: locationType) => void;
};

function LocationDetails({ user, data, mutateUser, mutateLocation }: Props) {
  // Edit location variables
  const [showEditLocationModal, setShowEditLocationModal] = useState(false);
  const [editLocationData, setEditLocationData] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  // Mutation to trigger on upon button click
  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/users/handleFavouriteLocations',
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
        mutateUser({ ...user, favs: result.favs });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditLocationModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // Get the value stored in the button
    const selectedValue = e.currentTarget.value;
    // Depending on this value feed state var with a proper value
    switch (selectedValue) {
      case 'title':
        setEditLocationData(data.title);
        break;
      case 'description':
        setEditLocationData(data.description);
        break;
      case 'location':
        setEditLocationData(data.location);
        break;
    }
    setSelectedProperty(selectedValue);
    // setEditLocationData(data[buttonValue]);
    setShowEditLocationModal(true);
  };

  return (
    <>
      <div className="grid gap-y-3">
        <section className="">
          <div className="flex items-center justify-center space-x-3">
            <h1 className=" text-center text-lg font-bold">Title</h1>
            {data?.author._id === user?._id ? (
              <button value="title" onClick={handleEditLocationModal}>
                <Image src={pencil} alt="pencil" width={20} />
              </button>
            ) : (
              ''
            )}
          </div>
          <p className="text-center">{data?.title}</p>
        </section>

        <section>
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-center text-lg font-bold">Description</h1>
            {data?.author._id === user?._id ? (
              <button value="description" onClick={handleEditLocationModal}>
                <Image src={pencil} alt="pencil" width={20} />
              </button>
            ) : (
              ''
            )}
          </div>
          <p className="text-center">{data?.description}</p>
        </section>
        <section>
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-center text-lg font-bold">Where to find it</h1>
            {data?.author._id === user?._id ? (
              <button value="location" onClick={handleEditLocationModal}>
                <Image src={pencil} alt="pencil" width={20} />
              </button>
            ) : (
              ''
            )}
          </div>
          <p className="text-center">{data?.location}</p>
        </section>

        <section className="flex items-center justify-center">
          <div>
            <h1 className="text-lg font-bold">
              Posted by:{' '}
              <em className="font-normal">{data?.author.userName}</em>
            </h1>
          </div>
        </section>

        <section className="relative">
          <Image
            src={data?.image.secure_url}
            alt="user-img"
            width={500}
            height={500}
            className="rounded-sm"
          />
          {user?.favs?.includes(data?._id) ? (
            <button
              onClick={handleFavourites}
              className="absolute right-2 top-2"
            >
              <Image src={fullHeart} alt="full-heart" width={42} height={42} />
            </button>
          ) : (
            <button
              onClick={handleFavourites}
              className="absolute right-2 top-2"
            >
              <Image
                src={emptyHeart}
                alt="empty-heart"
                width={42}
                height={42}
              />
            </button>
          )}
        </section>
      </div>
      <EditLocationModal
        locationId={data?._id}
        showEditLocationModal={showEditLocationModal}
        setShowEditLocationModal={setShowEditLocationModal}
        selectedProperty={selectedProperty}
        editLocationData={editLocationData}
        setEditLocationData={setEditLocationData}
        mutateLocation={mutateLocation}
      />
    </>
  );
}

export default LocationDetails;
