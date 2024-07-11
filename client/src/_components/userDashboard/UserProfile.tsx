import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import noUser from '../../../public/noUser.png';
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

      <section className="mt-10 p-2">
        <UserData propName="Username:" propValue={user!.userName} />
        <UserData propName="Email adress:" propValue={user!.email} />
        <UserData
          propName="Website:"
          propValue={user!.userWebsite ? user!.userWebsite : '-'}
        />
        <UserData
          propName="Bio:"
          propValue={user!.userBio ? user!.userBio : '-'}
        />
      </section>
    </>
  );
}

export default UserProfile;
