import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function UserLocations() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>User locations</h1>
      {user?.posts.map((location) => {
        return <p>{location.title}</p>;
      })}
    </>
  );
}

export default UserLocations;
