'use client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { useContext, useRef } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import LocationDetails from '../../../_components/locationDetails/LocationDetails';
import CommentElement from '../../../_components/locationDetails/CommentElement';

import { locationDetailsData } from '../../../fetchers/LocationDetailsData';
import { addNewComment } from '../../../fetchers/AddNewComment';

function ContentDetails({ params }: { params: { id: string } }) {
  const locationID = params.id;

  const { user, mutateUser } = useContext(AuthContext);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: locationData,
    mutate: mutateLocation,
    error,
  } = useSWR(locationID, locationDetailsData);

  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/comments/addComment',
    addNewComment,
  );

  // ADD COMMENT AND RE FETCH DATA
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

  // *DELETE A COMMENT
  // ? Być może wewnątrz komentarza zamiast podawać
  const handleDeleteComment = async (id: string) => {
    console.log('Im running!');
  };

  return (
    <>
      {error ? (
        <>
          <div className="mt-10">
            <h1 className="text-center text-lg font-bold">{error.message}</h1>
            <p className="text-center text-red-500">{error.info}</p>
          </div>
        </>
      ) : (
        <LocationDetails
          user={user!}
          data={locationData!}
          mutateUser={mutateUser}
        />
      )}

      {/* Comments section */}
      <div>
        <h4 className="py-2 text-center text-xl font-bold">
          ({locationData?.comments.length}) Comments:
        </h4>
        <section className="grid gap-y-2">
          {locationData?.comments &&
            locationData.comments.map((comment) => {
              return (
                <CommentElement
                  key={comment._id}
                  comment={comment}
                  handleDeleteComment={handleDeleteComment}
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
                rows={4}
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
    </>
  );
}

export default ContentDetails;
