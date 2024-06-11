'use client';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useSWR from 'swr';

// import { post } from '../../../types/types';

// import { addNewComment, deleteComment } from '../../../utils/CommentsTools';
// import { updatePost } from '../../../utils/PostsTools';
import LocationDetails from '../../../_components/locationDetails/LocationDetails';
import { locationDetailsData } from '../../../fetchers/LocationDetailsData';

function ContentDetails({ params }: { params: { id: string } }) {
  const locationID = params.id;
  const { user, mutate } = useContext(AuthContext);

  const { data: locationData, error } = useSWR(locationID, locationDetailsData);

  // // * ADD COMMENT AND RE FETCH DATA
  // const handleAddingComment = async () => {
  //   const comment = await addNewComment(user!._id, commentVal, data._id);
  //   await updateUserData(user!.email, "userComment", comment._id);
  //   await updatePost(data._id, "comments", comment._id);
  //   await getPostDetails();
  //   isUserLoggedIn();
  // };

  // // *DELETE A COMMENT
  // const handleDeleteComment = async (id: string) => {
  //   console.log("Im running!");
  //   await deleteComment(id);
  //   await getPostDetails();
  //   isUserLoggedIn();
  // };

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

      {/* <div>
        <h4>({data?.comments.length}) Comments:</h4>
        {data?.comments &&
          data.comments.map((comment) => {
            return (
              <Comment
                comment={comment}
                handleDeleteComment={handleDeleteComment}
              />
            );
          })}
        <label>
          <input
            type="textarea"
            placeholder="Leave a comment"
            style={{ height: '125px' }}
            // onChange={handleCommentValue}
          />
        </label>
        <button
          // onClick={handleAddingComment}
        >
          Submit new Comment
        </button>
      </div> */}
    </>
  );
}

export default ContentDetails;
