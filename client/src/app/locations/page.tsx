'use client';
// Libraries
import useSWR from 'swr';
import { useContext } from 'react';
// Components
import { ErrorView } from '@/_components/ui/state/ErrorView';
import LoadingView from '@/_components/ui/state/LoadingView';
import LocationCard from '@/_components/locations/LocationCard';
// Fetching data
import { getAllLocations } from '@/fetchers/GetAllLocations';
// Context data
import { AuthContext } from '@/context/AuthContext';
import LinkGreen from '@/_components/ui/links/LinkGreen';

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
      <div className="mb-6 mt-3 text-center">
        <h1 className="mb-4 text-center text-xl font-bold md:mt-4">
          Number of locations found:{' '}
          <span className="text-emerald-500">{locations?.number}</span>
        </h1>
        {user && (
          <LinkGreen href="locations/addNew">Add new location</LinkGreen>
        )}
      </div>

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
