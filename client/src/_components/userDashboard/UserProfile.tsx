// Libraries
import { useContext, useRef } from 'react';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
// Components
import UserData from './UserData';
import ProfileActions from './ProfileActions';
// Fetching data
import { ImageUpload } from '@/fetchers/ImageUpload';
import { updateUserData } from '@/fetchers/UpdateUserData';
import { deleteImage } from '@/fetchers/DeleteImage';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Assets
import noUser from '@/assets/noUser.png';
import ButtonDark from '../ui/buttons/ButtonDark';

function UserProfile() {
  const { user, mutateUser } = useContext(AuthContext);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { trigger: triggerImageUpload, isMutating: isMutatingImage } =
    useSWRMutation(
      `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/images/ImageUpload`,
      ImageUpload,
    );

  const { trigger: triggerUserUpdate } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/updateUser`,
    updateUserData,
  );

  const { trigger: triggerImageDelete } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/images/imageDelete`,
    deleteImage,
  );

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

      // Delete previously added userImage if it exists
      if (user?.userImage) {
        await triggerImageDelete({
          imageId: user.userImage._id,
          publicId: user.userImage.public_id,
        });
      }

      // Update userImage field
      await triggerUserUpdate({
        email: user!.email,
        elementName: 'userImage',
        elementValue: data._id,
      });

      // Refresh user data with newly updated image
      mutateUser();
      console.log(data);
    }
  };
  return (
    <>
      <section className="space-y-3 text-center">
        {/* Conditional render of an image depending on data stored by the user */}
        {user?.userImage ? (
          <Image
            src={user.userImage.secure_url}
            width={user.userImage.width}
            height={user.userImage.height}
            alt="userImage"
            className="mx-auto w-36 rounded-2xl"
          />
        ) : (
          <Image
            src={noUser}
            alt="userImage"
            className="mx-auto w-36 rounded-2xl"
          />
        )}

        <input
          ref={imageInputRef}
          type="file"
          accept=".jpg, .png"
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
        <ButtonDark
          onClick={() => {
            imageInputRef.current?.click();
          }}
        >
          Select image
        </ButtonDark>
      </section>

      <section className="mt-10 space-y-4 p-2">
        <UserData propName="userName" />
        <UserData propName="userEmail" />
        <UserData propName="userBio" textarea />
        <UserData propName="userWebsite" />
      </section>
      <ProfileActions />
    </>
  );
}

export default UserProfile;
