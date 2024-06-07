'use client';
import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useSWR from 'swr';

import { post } from '../../../types/types';
import {
  deleteFromUserArray,
  updateUserData,
} from '../../../utils/UserEditTools';
import { addNewComment, deleteComment } from '../../../utils/CommentsTools';
import { updatePost } from '../../../utils/PostsTools';
import LocationDetails from '../../../_components/locationDetails/LocationDetails';

// Error interface to return more information from fetcher
interface FetchError extends Error {
  info?: any;
  status?: number;
}

function ContentDetails({ params }: { params: { id: string } }) {
  const locationID = params.id;
  const { user } = useContext(AuthContext);

  const locationFetch = async (locationID: string) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('id', locationID);

    const response = await fetch('http://localhost:5000/api/posts/details', {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    });

    if (response.ok) {
      const result: post = await response.json();
      return result;
    } else {
      // Attach extra info to the error object.
      const result = await response.json();
      // Create error
      const error = new Error(
        'An error occurred while fetching the data.',
      ) as FetchError;
      // Assign information returning from request to extended error
      error.info = result.msg;
      error.status = response.status;
      throw error;
    }
  };

  const { data: locationData, error } = useSWR(locationID, locationFetch);

  // // * ADD OR REMOVE POST FROM FAVOURITES
  // const handleAddFavs = async () => {
  //   if (user!.favs.includes(data._id)) {
  //     await deleteFromUserArray(user!.email, "favs", data._id);
  //     isUserLoggedIn();
  //   } else {
  //     await updateUserData(user!.email, "favs", data._id);
  //     isUserLoggedIn();
  //   }
  // };

  // // * GET VALUE OF A COMMENT
  // const handleCommentValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCommentVal(e.target.value);
  // };

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
        <LocationDetails user={user!} data={locationData!} />
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
