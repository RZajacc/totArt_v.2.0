import React, { useEffect, useState } from 'react';
// Types
import { User } from '../../types/UserTypes';
import type { locationData } from '../../types/locationTypes';
// Images
import emptyHeart from '../../assets/heart_empty.svg';
import fullHeart from '../../assets/heart_full.svg';
import pencil from '../../assets/pencil.svg';
// Dependencies
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
// Data
import { locationFavsData } from '../../fetchers/LocationFavsData';
import EditLocationModal from '../locationModals/EditLocationModal';
import { DeleteLocation } from '../../fetchers/DeleteLocation';
import { useRouter } from 'next/navigation';
import { ErrorView } from '../ui/ErrorView';
import DeleteField from '../ui/DeleteField';

type Props = {
  user: User;
  data: locationData;
  mutateUser: (user?: User) => void;
  mutateLocation: (location?: locationData) => void;
};

function LocationDetails({ user, data, mutateUser, mutateLocation }: Props) {
  // Edit location variables
  const [showEditLocationModal, setShowEditLocationModal] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [editLocationData, setEditLocationData] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');

  const [showDeleteField, setShowDeleteField] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  // Set router
  const router = useRouter();

  // Mutation to trigger on upon button click
  const { trigger: triggerHandleFavs, error: handleFavsError } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/handleFavouriteLocations`,
    locationFavsData,
  );

  // Delete location
  const { trigger: triggerDeleteLocation, error: deleteLocationError } =
    useSWRMutation(
      `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/locations/deleteLocation`,
      DeleteLocation,
    );

  // Add or remove from favourites
  const handleFavourites = async () => {
    try {
      const result = await triggerHandleFavs({
        email: user.email,
        locactionId: data._id,
      });
      if (result) {
        mutateUser();
        setIsFav((prevState) => !prevState);
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
    setShowEditLocationModal(true);
  };

  const deleteLocationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect the form data
    const formData = new FormData(e.currentTarget);
    const deleteInput = formData.get('delete-phrase') as string;

    if (deleteInput !== 'DELETE') {
      setDeleteInput(deleteInput);
      setDeleteError(true);
    } else {
      // Trigger deleting and mutate location and user data
      await triggerDeleteLocation({
        imageId: data.image._id,
        impagePublicId: data.image.public_id,
        locationId: data._id,
      });
      mutateLocation();
      mutateUser();

      // Redirect to locations
      router.push('/locations');
    }
  };

  // Display errors if there are any
  if (handleFavsError) {
    return <ErrorView error={handleFavsError} />;
  }

  if (deleteLocationError) {
    return <ErrorView error={deleteLocationError} />;
  }

  // Check if current location is saved by the user
  useEffect(() => {
    const test = user?.favs.filter((fav) => {
      return fav._id === data._id;
    });
    if (test?.length !== 0) {
      setIsFav(true);
    }
  }, [user]);

  return (
    <>
      <div className="my-6 grid justify-center gap-y-3">
        <section>
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

        {data?.author._id === user?._id && (
          <button
            className="mx-auto w-60 rounded-lg border-2 border-black bg-red-500 p-1 px-2 text-stone-200 shadow-md shadow-black hover:font-bold  "
            onClick={() => {
              setShowDeleteField((prevState) => !prevState);
            }}
          >
            Delete location
          </button>
        )}

        <div className="mx-auto w-5/6">
          {showDeleteField && (
            <DeleteField
              handleRemovingData={deleteLocationHandler}
              elementDescription="this location"
              providedVal={deleteInput}
              showIncorrectInput={deleteError}
              setShowIncorrectInput={setDeleteError}
            />
          )}
        </div>

        <section className="relative">
          <Image
            src={data?.image.secure_url}
            alt="user-img"
            width={data.image.width}
            height={data.image.height}
            className="rounded-sm"
          />
          {isFav ? (
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
