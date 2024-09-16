// Libraries
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useContext, useRef, useState } from 'react';
// Components
import LocationDetails from '@/_components/locationDetails/LocationDetails';
import CommentElement from '@/_components/comments/CommentElement';
import DeleteCommentModal from '@/_components/commentModals/DeleteCommentModal';
import EditCommentModal from '@/_components/commentModals/EditCommentModal';
import { ErrorView } from '@/_components/ui/state/ErrorView';
import LoadingView from '@/_components/ui/state/LoadingView';
// Fetching data
import { addNewComment } from '@/fetchers/AddNewComment';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Utils
import isAuth from '@/utils/IsAuth';
import { GetLocationDetails } from 'lib/GetLocationDetails';
import LocationDataField from '@/_components/locationDetails/LocationDataField';
// Types

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

  // Context data
  // const { user, mutateUser } = useContext(AuthContext);

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

  // // Display loader and errors
  // if (locationDetailsError) {
  //   return <ErrorView error={locationDetailsError} />;
  // }

  // if (locationDetailsLoading) {
  //   return <LoadingView />;
  // }

  // if (addCommentError) {
  //   return <ErrorView error={addCommentError} />;
  // }

  return (
    <div className="mx-auto max-w-xl">
      <div className="my-6 grid justify-center gap-y-3">
        <LocationDataField
          locationAuthorId={locationData.author._id}
          fieldName="Title"
          fieldData={locationData.title}
        />
        <LocationDataField
          locationAuthorId={locationData.author._id}
          fieldName="Description"
          fieldData={locationData.description}
        />
        <LocationDataField
          locationAuthorId={locationData.author._id}
          fieldName="Where to find it"
          fieldData={locationData.location}
        />
        <LocationDataField
          locationAuthorId={locationData.author._id}
          fieldName="Posted by:"
          fieldData={locationData.author.userName}
        />
      </div>
      {/* <LocationDetails
        user={user!}
        data={locationData!}
        mutateUser={mutateUser}
        mutateLocation={mutateLocation}
      /> */}

      {/* Comments section */}
      {/* <div className="my-6">
        <h4 className="py-2 text-center text-xl font-bold">
          ({locationData?.comments.length}) comments:
        </h4>
        <section className="grid gap-y-2">
          {locationData?.comments &&
            locationData.comments.map((comment) => {
              return (
                <CommentElement
                  key={comment._id}
                  comment={comment}
                  setShowDeleteCommentModal={setShowDeleteCommentModal}
                  setShowEditCommentModal={setShowEditCommentModal}
                  setSelectedCommentId={setSelectedCommentId}
                  setSelectedCommentContent={setSelectedCommentContent}
                />
              );
            })}
        </section> */}

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
        </section>
      </div> */}
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
