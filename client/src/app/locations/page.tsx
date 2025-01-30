// Components
import AddLocationLink from '@/_components/locations/AddLocationLink';
import LocationCard from '@/_components/locations/LocationCard';
import { ErrorView } from '@/_components/ui/state/ErrorView';
// Types
import type { locationData } from '@/types/locationTypes';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Locations',
  description: 'All locations added by users',
};

async function Content() {
  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  console.log('BUILD_URL_SERVER URL---->', FETCH_URL);

  // Fetch locations data
  const response = await fetch(`${FETCH_URL}/api/locations/all`);

  // If fetching fails display error
  if (!response.ok) {
    return (
      <ErrorView
        error={{
          info: 'Fetching data failed',
          status: response.status,
          name: 'Error',
          message: 'Something went wrong!',
        }}
      />
    );
  }

  // If fetch succeeds get the data
  const locations: { number: number; locations: locationData[] } =
    await response.json();

  return (
    <>
      <div className="mb-6 mt-3 text-center">
        <h1 className="mb-4 text-center text-xl font-bold md:mt-4">
          Number of locations found:{' '}
          <span data-testid="locations-count" className="text-emerald-500">
            {locations?.number}
          </span>
        </h1>
        <AddLocationLink />
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
