// Utils
import { GetLocationDetails } from 'lib/GetLocationDetails';
import LocationActions from '@/_components/locationDetails/LocationActions';
import Image from 'next/image';
import CommentsSection from '@/_components/comments/CommentsSection';

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

  // Ref to text area to add comment and clear content after
  // const commentRef = useRef<HTMLTextAreaElement>(null);

  // Setting a state for modal visibility and id of a selected comment to delete
  // const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  // const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  // const [selectedCommentId, setSelectedCommentId] = useState('');
  // const [selectedCommentContent, setSelectedCommentContent] = useState('');

  // Prepare mutation to add comment
  // const { trigger, error: addCommentError } = useSWRMutation(
  //   `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/comments/addComment`,
  //   addNewComment,
  // );

  // Handle adding a new comment
  // const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const createdAt = new Date().toISOString();
  //   const commentValue = formData.get('comment') as string;

  //   try {
  //     await trigger({
  //       comment: commentValue,
  //       createdAt: createdAt,
  //       author: user!._id,
  //       relatedPost: locationID,
  //     });
  //     mutateUser();
  //     mutateLocation();
  //     // Reset value of comment text area
  //     commentRef.current ? (commentRef.current.value = '') : null;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        <CommentsSection locationData={locationData}>
          {locationData.comments.length > 0 ? (
            <h4 className="py-2 text-center text-xl font-bold">
              ({locationData?.comments.length}) comments:
            </h4>
          ) : (
            <h4 className="py-2 text-center text-xl font-bold">
              No comments yet, be the first one!
            </h4>
          )}
        </CommentsSection>

        {/* Adding a new comment */}
        {/* <section className="mt-5 grid">
          <form onSubmit={handleCommentSubmit}>
            <section className="relative h-36 rounded-md border-2 border-gray-400 bg-white focus-within:border-2 focus-within:border-blue-500">
              <textarea
                ref={commentRef}
                name="comment"
                id="comment"
                placeholder="Leave a comment"
                rows={3}
                className="w-full rounded-md p-2 focus-visible:outline-none"
              />
              <button
                className="absolute bottom-2 right-2 rounded-md bg-purple-800 px-2 py-1 text-white"
                type="submit"
              >
                Submit
              </button>
            </section>
          </form>
        </section> */}
      </div>
      {/* 
      <DeleteCommentModal
        showDeleteCommentModal={showDeleteCommentModal}
        setShowDeleteCommentModal={setShowDeleteCommentModal}
        mutateUser={mutateUser}
        mutateLocation={mutateLocation}
        setSelectedCommentId={setSelectedCommentId}
        selectedCommentId={selectedCommentId}
      />
      <EditCommentModal
        showEditCommentModal={showEditCommentModal}
        setShowEditCommentModal={setShowEditCommentModal}
        selectedCommentContent={selectedCommentContent}
        setSelectedCommentContent={setSelectedCommentContent}
        selectedCommentId={selectedCommentId}
        setSelectedCommentId={setSelectedCommentId}
        mutateUser={mutateUser}
        mutateLocation={mutateLocation}
      /> */}
    </div>
  );
}

export default ContentDetails;
