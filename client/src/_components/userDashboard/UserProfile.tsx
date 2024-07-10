import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function UserProfile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <img src={user?.userImage} alt="userImage" className={'user-image'} />
      <div>
        <p>Username:</p>
        <p>Email adress:</p>
        <p>Website:</p>
        <p>Bio:</p>

        <p>{user!.userName}</p>
        <p> {user!.email}</p>
        <p>{user!.userWebsite ? user!.userWebsite : '-'}</p>
        <p>{user!.userBio ? user!.userBio : '-'}</p>
      </div>
    </>
  );
}

export default UserProfile;
