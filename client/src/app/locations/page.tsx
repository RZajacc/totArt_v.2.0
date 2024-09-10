'use client';
// Libraries
import useSWR from 'swr';
import { useContext, useState } from 'react';
// Components
import { ErrorView } from '@/_components/ui/ErrorView';
import LoadingView from '@/_components/ui/LoadingView';
import LocationCard from '@/_components/locations/LocationCard';
// Fetching data
import { getAllLocations } from '@/fetchers/GetAllLocations';
// Context data
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

function Content() {
  const { user } = useContext(AuthContext);
  // const [displayAddNewLocation, setDisplayAddNewLocation] = useState(false);

  const {
    data: locations,
    error: locationError,
    isLoading: locationsLoading,
  } = useSWR(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/locations/all`,
    getAllLocations,
  );

  // Displaying loaders and errors
  if (locationError) {
    return <ErrorView error={locationError} />;
  }

  if (locationsLoading) {
    return <LoadingView />;
  }

  return (
    <>
      <h1 className="text-center text-xl font-bold md:mt-4">
        Number of locations found:{' '}
        <span className="text-green-500">{locations?.number}</span>
      </h1>
      <div className="mb-6 mt-3 text-center">
        {user ? (
          <Link
            href={'locations/addNew'}
            className="mx-auto rounded-md bg-green-400 px-2 py-1 shadow-md shadow-black"
          >
            Add new location
          </Link>
        ) : (
          // <button
          //   className="mx-auto mb-8 mt-3 block rounded-md bg-green-400 px-2 py-1 shadow-md shadow-black"
          //   onClick={() => {
          //     setDisplayAddNewLocation(true);
          //   }}
          // >
          //   Add new location
          // </button>
          ''
        )}
      </div>

      {/* Display add new location component */}
      {/* {displayAddNewLocation && (
        <AddNewLocation
          displayAddNewLocation={displayAddNewLocation}
          setDisplayAddNewLocation={setDisplayAddNewLocation}
        />
      )} */}

      <div className="mx-auto mt-3 grid max-w-4xl gap-3 sm:grid-cols-2 md:grid-cols-3">
        {locations &&
          locations.locations.map((location) => {
            return <LocationCard key={location._id} locationData={location} />;
          })}
      </div>
    </>
  );
}

export default Content;
