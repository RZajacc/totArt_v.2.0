'use client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import LocationDetails from '../../../_components/locationDetails/LocationDetails';
import CommentElement from '../../../_components/comments/CommentElement';

import { locationDetailsData } from '../../../fetchers/LocationDetailsData';
import { addNewComment } from '../../../fetchers/AddNewComment';
import DeleteCommentModal from '../../../_components/commentModals/DeleteCommentModal';
import EditCommentModal from '../../../_components/commentModals/EditCommentModal';
import { ErrorView } from '../../../_components/ui/ErrorView';
import LoadingView from '../../../_components/ui/LoadingView';
import isAuth from '../../../utils/IsAuth';

function ContentDetails({ params }: { params: { id: string } }) {
  // Get param from the route path
  const locationID = params.id;

  // Context data
  const { user, mutateUser } = useContext(AuthContext);

  // Ref to text area to add comment and clear content after
  const commentRef = useRef<HTMLTextAreaElement>(null);

  // Setting a state for modal visibility and id of a selected comment to delete
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState('');
  const [selectedCommentContent, setSelectedCommentContent] = useState('');

  // Query location details data
  const {
    data: locationData,
    mutate: mutateLocation,
    error: locationDetailsError,
    isLoading: locationDetailsLoading,
  } = useSWR(locationID, locationDetailsData);

  // Prepare mutation to add comment
  const { trigger, error: addCommentError } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/comments/addComment`,
    addNewComment,
  );

  // Handle adding a new comment
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createdAt = new Date().toISOString();
    const commentValue = formData.get('comment') as string;

    try {
      await trigger({
        comment: commentValue,
        createdAt: createdAt,
        author: user!._id,
        relatedPost: locationID,
      });
      mutateUser();
      mutateLocation();
      // Reset value of comment text area
      commentRef.current ? (commentRef.current.value = '') : null;
    } catch (error) {
      console.log(error);
    }
  };

  // Display loader and errors
  if (locationDetailsError) {
    return <ErrorView error={locationDetailsError} />;
  }

  if (locationDetailsLoading) {
    return <LoadingView />;
  }

  if (addCommentError) {
    return <ErrorView error={addCommentError} />;
  }

  return (
    <div className="mx-auto max-w-xl">
      <LocationDetails
        user={user!}
        data={locationData!}
        mutateUser={mutateUser}
        mutateLocation={mutateLocation}
      />

      {/* Comments section */}
      <div className="my-6">
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
        </section>

        {/* Adding a new comment */}
        <section className="mt-5 grid">
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
      </div>

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
      />
    </div>
  );
}

export default isAuth(ContentDetails);
