'use client';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useSWR from 'swr';

// import { post } from '../../../types/types';

// import { addNewComment, deleteComment } from '../../../utils/CommentsTools';
// import { updatePost } from '../../../utils/PostsTools';
import LocationDetails from '../../../_components/locationDetails/LocationDetails';
import { locationDetailsData } from '../../../fetchers/LocationDetailsData';
import Comment from '../../../_components/locationDetails/Comment';

function ContentDetails({ params }: { params: { id: string } }) {
  const locationID = params.id;
  const { user, mutate } = useContext(AuthContext);

  const { data: locationData, error } = useSWR(locationID, locationDetailsData);

  // ADD COMMENT AND RE FETCH DATA
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createdAt = new Date();
    const commentValue = formData.get('comment');

    // TODO - Fetcher z nowym komentarzem
    // TODO - UseSWRMutation z parametrami w args
    // TODO - Funkcje wywołuje tutaj a ponieważ dodaję też do użytkownika to usera też muszę rewalidować

    // const comment = await addNewComment(user!._id, commentVal, data._id);
    // await updateUserData(user!.email, "userComment", comment._id);
    // await updatePost(data._id, "comments", comment._id);
    // await getPostDetails();
  };

  // *DELETE A COMMENT
  // ? Być może wewnątrz komentarza zamiast podawać
  const handleDeleteComment = async (id: string) => {
    console.log('Im running!');
    // await deleteComment(id);
    // await getPostDetails();
    // isUserLoggedIn();
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
        <LocationDetails user={user!} data={locationData!} mutate={mutate} />
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
                <Comment
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
