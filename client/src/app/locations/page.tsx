'use client';
import useSWR from 'swr';
import { getAllLocations } from '../../fetchers/GetAllLocations';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ErrorView } from '../../_components/ui/ErrorView';
import LoadingView from '../../_components/ui/LoadingView';
import LocationCard from '../../_components/locations/LocationCard';
import AddLocationModalNew from '../../_components/locationModals/AddLocationModalNew';
import AddNewLocation from '../../_components/locations/AddNewLocation';

function Content() {
  const { user } = useContext(AuthContext);
  const [displayAddNewLocation, setDisplayAddNewLocation] = useState(false);

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
      {user ? (
        <button
          className="mx-auto mb-8 mt-3 block rounded-md bg-green-400 px-2 py-1 shadow-md shadow-black"
          onClick={() => {
            setDisplayAddNewLocation(true);
          }}
        >
          Add new location
        </button>
      ) : (
        ''
      )}

      {/* Display add new location component */}
      {displayAddNewLocation && (
        <AddNewLocation
          displayAddNewLocation={displayAddNewLocation}
          setDisplayAddNewLocation={setDisplayAddNewLocation}
        />
      )}

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
