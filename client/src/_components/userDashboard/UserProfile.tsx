import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import noUser from '../../assets/noUser.png';
import Image from 'next/image';
import UserData from './UserData';

// TODO - IMG upload
// TODO - Editing entries

function UserProfile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <section>
        <Image
          src={user?.userImage ? user.userImage : noUser}
          alt="userImage"
          className="mx-auto w-36 rounded-full"
        />
      </section>

      <section className="mt-10 space-y-4 p-2">
        <UserData propName="userName" />
        <UserData propName="userEmail" />
        <UserData propName="userWebsite" />
        <UserData propName="userBio" textarea />
      </section>
    </>
  );
}

export default UserProfile;
