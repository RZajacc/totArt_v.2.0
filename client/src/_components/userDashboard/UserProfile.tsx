import { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import noUser from '../../assets/noUser.png';
import Image from 'next/image';
import UserData from './UserData';

// TODO - IMG upload
// TODO - Editing entries

function UserProfile() {
  const { user } = useContext(AuthContext);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <section className="text-center">
        <Image
          src={user?.userImage ? user.userImage : noUser}
          alt="userImage"
          className="mx-auto w-36 rounded-full"
        />
        <input ref={imageInputRef} type="file" className="hidden" />
        <button
          className="mt-4 rounded-md border-2 border-stone-500 bg-purple-500 px-2 py-1 hover:bg-stone-300 hover:font-bold"
          onClick={() => {
            imageInputRef.current?.click();
          }}
        >
          Upload image
        </button>
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
