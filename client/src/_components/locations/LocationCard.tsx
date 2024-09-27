// Libraries
import Image from 'next/image';
// Types
import { locationData } from '@/types/locationTypes';
import LinkDark from '../ui/links/LinkDark';
import FavSection from '../locationDetails/FavSection';

type Props = {
  locationData: locationData;
};

function LocationCard({ locationData }: Props) {
  return (
    <div
      data-testid="locationCard"
      className="grid content-between rounded-lg border-2 border-black bg-slate-100 shadow-md shadow-black"
    >
      <section className="relative">
        {/* Display add or remove from favourites button*/}
        <FavSection locationId={locationData._id} />
        {/* Card image */}
        <Image
          src={locationData.image.secure_url}
          alt={locationData.title}
          width={locationData.image.width}
          height={locationData.image.height}
          className="rounded-md"
          priority
        />
      </section>

      {/* Link to a relevant page */}
      <section className="mb-4 mt-1 text-center">
        <h3 className="mb-3 text-xl font-bold">{locationData.title}</h3>
        <LinkDark href={`/locations/${locationData._id}`}>See more</LinkDark>
      </section>
    </div>
  );
}

export default LocationCard;
