// Utils
import { GetLocationDetails } from '@/lib/serverMethods/GetLocationDetails';
import LocationActions from '@/_components/locationDetails/LocationActions';
import Image from 'next/image';
import CommentsSection from '@/_components/comments/CommentsSection';
import AddCommentSection from '@/_components/comments/AddCommentSection';

// Generate Pages metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const locationData = await GetLocationDetails(params.id);
  return {
    title: locationData.title,
    description: locationData.description,
  };
}

async function ContentDetails({ params }: { params: { id: string } }) {
  // Query data from the database
  const locationData = await GetLocationDetails(params.id);

  return (
    <div className="mx-auto max-w-xl">
      <div className="my-6 grid justify-center gap-y-3 rounded-md border border-black bg-slate-100 shadow-sm shadow-black">
        {/* Descriptive data */}
        <section className="mt-2">
          <h1 className="text-center text-lg font-bold">Title:</h1>
          <p className="text-center">{locationData.title}</p>
          <h1 className="text-center text-lg font-bold">Description:</h1>
          <p className="text-center">{locationData.description}</p>
          <h1 className="text-center text-lg font-bold">Where to find it:</h1>
          <p className="text-center">{locationData.location}</p>
          <h1 className="text-center text-lg font-bold">Posted by:</h1>
          <p className="text-center">{locationData.author.userName}</p>
        </section>

        {/* Location actions */}
        <section className="mb-3 space-x-3 text-center">
          <LocationActions locationData={locationData} />
        </section>
        <section>
          <Image
            src={locationData.image.secure_url}
            alt={locationData.title}
            width={locationData.image.width}
            height={locationData.image.height}
            className="mx-auto mb-3 w-4/6 rounded-md border border-black shadow-sm shadow-black"
          />
        </section>
      </div>

      {/* Comments section */}
      <div className="my-6">
        <CommentsSection locationId={locationData._id} />
        <AddCommentSection locationId={locationData._id} />
      </div>
    </div>
  );
}

export default ContentDetails;
