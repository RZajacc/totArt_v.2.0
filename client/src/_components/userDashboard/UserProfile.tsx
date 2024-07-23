import { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import noUser from '../../assets/noUser.png';
import Image from 'next/image';
import UserData from './UserData';
import useSWRMutation from 'swr/mutation';
import { ImageUpload } from '../../fetchers/ImageUpload';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { trigger: triggerImageUpload, isMutating: isMutatingImage } =
    useSWRMutation('http://localhost:5000/api/images/ImageUpload', ImageUpload);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Access files from input
    const files = e.target.files;

    // If they are not empty upload an image and reset inputs value
    if (files) {
      const data = await triggerImageUpload({
        file: files[0],
        folder: 'userImages',
      });

      // Reset inputs value
      imageInputRef.current ? (imageInputRef.current.value = '') : '';
      console.log(data);
    }
  };
  return (
    <>
      <section className="text-center">
        <Image
          src={user?.userImage ? user.userImage : noUser}
          alt="userImage"
          className="mx-auto w-36 rounded-full"
        />

        <input
          ref={imageInputRef}
          type="file"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* If image is loading to the server */}
        {isMutatingImage && (
          <div className="mb-2 mt-4 flex items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
            <p className="mx-2  font-bold">Loading...</p>
          </div>
        )}

        {/* Button managing input via ref */}
        <button
          className="mt-4 rounded-md border-2 border-stone-500 bg-purple-500 px-2 py-1 hover:bg-stone-300 hover:font-bold"
          onClick={() => {
            imageInputRef.current?.click();
          }}
        >
          Select image
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
