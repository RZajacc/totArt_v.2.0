'use client';
import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { post } from '../../../types/types';
import { AuthContext } from '../../../context/AuthContext';
import {
  deleteFromUserArray,
  updateUserData,
} from '../../../utils/UserEditTools';
import { addNewComment, deleteComment } from '../../../utils/CommentsTools';
import { updatePost } from '../../../utils/PostsTools';

function ContentDetails({ params }: { params: { id: string } }) {
  const locationID = params.id;
  const { user } = useContext(AuthContext);

  // const [data, setData] = useState<post>({
  //   _id: "",
  //   author: { _id: "", userImage: "", userName: "" },
  //   comments: [
  //     {
  //       _id: "",
  //       author: { _id: "", userImage: "", userName: "" },
  //       comment: "",
  //       relatedPost: "",
  //     },
  //   ],
  //   description: "",
  //   imageUrl: "",
  //   location: "",
  //   title: "",
  // });

  // const { user } = useContext(AuthContext);
  // const [commentVal, setCommentVal] = useState("");

  // // * FETCH POST
  // const getPostDetails = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("id", id!);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/posts/details",
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     setData(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getPostDetails();
  // }, []);

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
      {/* <h1>
        Title:{' '}
        <span className="image-title">
          {data.title}
          {'  '}
        </span>
        {user ? (
          user?.favs.includes(data._id) ? (
            <button onClick={handleAddFavs}>
              Delete from{' '}
              <img
                src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354709/other/ra5sovm9gaxynfz3ah6t.svg"
                alt="empty-heart"
                width={'25px'}
              />
            </button>
          ) : (
            <button onClick={handleAddFavs}>
              Add to{' '}
              <img
                src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354710/other/l8kxiddecnqx6talp4bz.svg"
                alt="empty-heart"
                width={'25px'}
              />
            </button>
          )
        ) : (
          ''
        )}
      </h1> */}

      {/* <p>
        <em>
          Added by: <img src={data.author.userImage} alt="user-mini" />{' '}
          {data.author.userName}
        </em>
      </p>
      <img src={data.imageUrl} />
      
      <div>
        <h2>Description</h2>
        <p>{data.description}</p>
        <h2>Where to find it</h2>
        <p>{data.location}</p>
      </div> */}

      {/* <div>
        <h4>({data.comments.length}) Comments:</h4>
        {data.comments &&
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
            onChange={handleCommentValue}
          />
        </label>
        <button
          onClick={handleAddingComment}
          className="submit-message-button"
          variant="info"
        >
          Submit new Comment
        </button>
      </div> */}
    </>
  );
}

export default ContentDetails;
