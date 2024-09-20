'use client';
// Libraries
import { useContext, useState } from 'react';
import useSWRMutation from 'swr/mutation';
// Components
import ImagePicker from '@/_components/locations/ImagePicker';
import isAuth from '@/utils/IsAuth';
import LabeledInput from '@/_components/ui/inputs/LabeledInput';
import LabeledTextArea from '@/_components/ui/inputs/LabeledTextArea';
import ButtonDark from '@/_components/ui/buttons/ButtonDark';
// Fetchin data
import { ImageUpload } from '@/fetchers/ImageUpload';
import { deleteImage } from '@/fetchers/DeleteImage';
import { addNewLocation } from '@/lib/serverMethods/AddNewLocation';
// Context data
import { AuthContext } from '@/context/AuthContext';
import { Rounded } from 'enums/StyleEnums';

function page() {
  // Getting user data
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  // Image picker data
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  // SWR Methods necessary for all operations
  const {
    data: imageData,
    trigger: triggerImageUpload,
    isMutating: imageIsMutating,
    error: imageUploadError,
  } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/images/ImageUpload`,
    ImageUpload,
  );

  const { trigger: triggerDeletingImage } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/images/imageDelete`,
    deleteImage,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Define a form
    const form = event.currentTarget;

    // Get the file from submitted in the form
    const formData = new FormData(form);
    const imageFile = formData.get('locationImage') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    // If previous submission failed, but image was uploaded delete it
    if (imageData) {
      await triggerDeletingImage({
        imageId: imageData._id,
        publicId: imageData.public_id,
      });
    }
    // Upload an image to cloudinary
    const imageResponse = await triggerImageUpload({
      file: imageFile,
      folder: 'postImages',
    });

    // If uploading image failed stop execution
    if (!imageResponse) {
      return;
    }

    setSubmitting(true);
    await addNewLocation(
      title,
      description,
      location,
      imageResponse._id,
      user ? user._id : '',
    );
    setSubmitting(false);
  };

  return (
    <div className="mx-auto mt-5 max-w-lg rounded-md bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-black">
      <h1 className="mb-3 text-center font-bold">Share some unique content:</h1>

      <form className="grid gap-y-2" onSubmit={handleSubmit}>
        <LabeledInput
          inputType="text"
          labelFor="title"
          labelText="Start with giving it a title:"
          required
        />
        <LabeledTextArea
          labelFor="description"
          labelText="Add some description"
          rows={2}
          required
        />
        <LabeledTextArea
          labelFor="location"
          labelText="Where was it?"
          rows={2}
          required
        />
        {/* IMAGE UPLOAD SECTION */}
        <ImagePicker
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <p className="text-center font-bold text-red-500">
          {imageUploadError && 'Submitting the data failed! Try again!'}
        </p>
        <ButtonDark
          rounded={Rounded.medium}
          type="submit"
          disabled={imageIsMutating}
        >
          {imageIsMutating || submitting
            ? 'Submitting the form...'
            : 'Submit data'}
        </ButtonDark>
      </form>
    </div>
  );
}

export default isAuth(page);
