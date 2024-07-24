import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function UserFavs() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>User favs</h1>
      {/* {favs ? (
        <h4>List of your favourite posts:</h4>
      ) : (
        <h4>You didn't add any posts to favourites yet!</h4>
      )}
      <ListGroup as="ol" numbered>
        {favs &&
          favs.map((fav) => {
            return (
              <ListGroup.Item>
                <strong>Post title: </strong>
                <Link className="link-to-own-post" to={`/content/${fav._id}`}>
                  {fav.title}
                </Link>
              </ListGroup.Item>
            );
          })}
      </ListGroup> */}
    </>
  );
}

export default UserFavs;
