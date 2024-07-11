'use client';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { getAllLocations } from '../../fetchers/GetAllLocations';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import emptyHeart from '../../assets/heart_empty.svg';
import fullHeart from '../../assets/heart_full.svg';
import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '../../fetchers/LocationFavsData';
import AddLocationModal from '../../_components/locationModals/AddLocationModal';
import { ErrorView } from '../../_components/ui/ErrorView';
import LoadingView from '../../_components/ui/LoadingView';

function Content() {
  const { user, mutateUser } = useContext(AuthContext);
  const [showAddLocation, setShowAddLocation] = useState(false);

  const {
    data: locations,
    error: locationError,
    isLoading: locationsLoading,
  } = useSWR('http://localhost:5000/api/locations/all', getAllLocations);

  // Mutation to trigger on upon button click
  const { trigger, error: favshandlerError } = useSWRMutation(
    'http://localhost:5000/api/users/handleFavouriteLocations',
    locationFavsData,
  );

  const handleFavourites = async (locId: string) => {
    const result = await trigger({ email: user!.email, locactionId: locId });
    mutateUser({ ...user!, favs: result.favs });
  };

  // Displaying loaders and errors
  if (locationError) {
    return <ErrorView error={locationError} />;
  }

  if (locationsLoading) {
    return <LoadingView />;
  }

  if (favshandlerError) {
    return <ErrorView error={favshandlerError} />;
  }

  return (
    <>
      <h1 className="text-center text-xl font-bold">
        Number of locations found:{' '}
        <span className="text-green-500">{locations?.number}</span>
      </h1>
      {user ? (
        <button
          className="mx-auto mb-4 mt-1 block rounded-md bg-green-400 px-2 py-1 shadow-md shadow-black"
          onClick={() => {
            setShowAddLocation(true);
          }}
        >
          Add new location
        </button>
      ) : (
        ''
      )}

      <AddLocationModal
        showAddLocation={showAddLocation}
        setShowAddLocation={setShowAddLocation}
      />

      <div className="mx-auto mt-3 grid max-w-3xl gap-3 sm:grid-cols-2 md:grid-cols-3">
        {locations &&
          locations.locations.map((loc) => {
            return (
              <div
                key={loc._id}
                className="rounded-lg border-2 border-black shadow-md shadow-black"
              >
                <section className="relative">
                  {user ? (
                    user.favs?.includes(loc._id) ? (
                      <button
                        className="absolute right-2 top-2"
                        onClick={() => {
                          handleFavourites(loc._id);
                        }}
                      >
                        <Image
                          src={fullHeart}
                          width={42}
                          height={42}
                          alt="empty-heart"
                        />
                      </button>
                    ) : (
                      <button
                        className="absolute right-2 top-2"
                        onClick={() => {
                          handleFavourites(loc._id);
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
                    src={loc.image.secure_url}
                    alt={loc.title}
                    width={600}
                    height={600}
                    layout="responsive"
                    className="rounded-lg"
                  />
                </section>
                <section className="mb-4 mt-1 text-center">
                  <h3 className="mb-3 text-xl font-bold">{loc.title}</h3>
                  {/* Temporary location until connecting view is ready*/}
                  <Link
                    href={`/locations/${loc._id}`}
                    className="rounded-md bg-black px-3 py-2 text-white"
                  >
                    See more
                  </Link>
                </section>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Content;
