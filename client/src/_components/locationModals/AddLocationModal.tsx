import { useContext, useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { ImageUpload } from '../../fetchers/ImageUpload';
import Image from 'next/image';
import { addNewLocation } from '../../fetchers/AddNewLocation';
import { AuthContext } from '../../context/AuthContext';
import { getAllLocations } from '../../fetchers/GetAllLocations';
import { deleteImage } from '../../fetchers/DeleteImage';
import LabeledInput from '../formElements/LabeledInput';
import LabeledTextArea from '../formElements/LabeledTextArea';

type Props = {
  showAddLocation: boolean;
  setShowAddLocation: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLocationModal = ({ showAddLocation, setShowAddLocation }: Props) => {
  const { user, mutateUser } = useContext(AuthContext);
  const [missingImageError, setMissingImageError] = useState(false);

  // Input refs
  const imageUploadButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const {
    data: imageData,
    trigger: triggerImageUpload,
    isMutating: imageIsMutating,
    error: imageUploadError,
    reset: resetImageData,
  } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/images/ImageUpload`,
    ImageUpload,
  );

  const { trigger: triggerDeletingImage } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/images/imageDelete`,
    deleteImage,
  );

  const { trigger: triggerAddLocation } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/locations/addNewLocation`,
    addNewLocation,
  );

  const { trigger: triggerGetLocations } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/locations/all`,
    getAllLocations,
  );

  //  --------- UPLOAD IMAGE -------------------------------
  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Define a form
    const form = e.currentTarget;

    // Get the file from submitted in the form
    const formData = new FormData(form);
    const imageFile = formData.get('locationImage') as File;

    // If there was an image already uploded delete it to allow uploading a new one
    if (imageData) {
      triggerDeletingImage({ publicId: imageData._id, imageId: imageData._id });
    }

    // Trigger the mutation
    const data = await triggerImageUpload({
      file: imageFile,
      folder: 'postImages',
    });

    // Remove error if image was added
    if (data) {
      setMissingImageError(false);
    }

    // reset file input
    form.reset();
  };

  // ------------- SUBMIT A NEW POST -----------------
  const submitNewLocation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Gather inputs data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    // If no image is uploaded stop execution here and display error
    if (!imageData) {
      setMissingImageError(true);
      return;
    }

    await triggerAddLocation({
      title,
      description,
      location,
      imageId: imageData ? imageData._id : '',
      author: user ? user._id : '',
    });

    // Refresh data in connected models
    mutateUser();
    triggerGetLocations();
    // Close the modal
    setShowAddLocation(false);
  };

  const handleClosingModal = async () => {
    // Remove missing image error
    setMissingImageError(false);

    // If there is an image then delete it
    if (imageData) {
      triggerDeletingImage({
        publicId: imageData.public_id,
        imageId: imageData._id,
      });
    }

    // Reset image data
    resetImageData();

    // Close the modal
    setShowAddLocation(false);
  };

  // Lock the submit button if image is still loading
  if (imageIsMutating) {
    submitButtonRef.current?.setAttribute('disabled', 'true');
  } else {
    submitButtonRef.current?.removeAttribute('disabled');
  }

  return (
    <>
      <div
        className={`${!showAddLocation ? 'hidden' : ''} fixed left-0 top-0 z-30 h-screen w-screen  bg-slate-600/70`}
      >
        <div
          className={`relative top-[5%] mx-auto grid w-11/12 max-w-md gap-y-2 rounded-sm border-2 border-black bg-yellow-200 p-2`}
        >
          {/* HEADER SECTION */}
          <section>
            <h1 className="m-1 text-center font-bold">
              Share some unique content:
            </h1>
          </section>

          {/* IMAGE UPLOAD SECTION */}
          <section>
            <form onSubmit={handleFileSubmit} className="grid gap-y-1">
              <input
                type="file"
                name="locationImage"
                onChange={() => {
                  imageUploadButtonRef.current?.click();
                }}
                required
                className=" file:rounded-md file:bg-purple-400 file:shadow-md file:shadow-black"
              />
              <p className="text-center font-bold">
                {imageIsMutating ? 'Uploading...' : ''}
              </p>
              {imageData && (
                <Image
                  src={imageData.secure_url}
                  width={imageData.width}
                  height={imageData.height}
                  alt="Uploaded image"
                  className={`mx-auto w-1/4 rounded-md`}
                />
              )}

              <small className="text-gray-500 ">
                *Supported formats : .jpg, .jpeg, .png
              </small>
              <button
                ref={imageUploadButtonRef}
                type="submit"
                className="hidden rounded-sm bg-black text-white"
              >
                Upload image
              </button>

              {/* Invalid feedback */}
              <p
                className={`${!imageUploadError ? 'hidden' : ''} rounded-lg bg-red-500 px-2 py-1 text-center text-white`}
              >
                {imageUploadError ? imageUploadError.info : ''}
              </p>
            </form>
          </section>

          {/* LOCATION DESCRIPTION SECTION */}
          <section>
            <form className="grid gap-y-1" onSubmit={submitNewLocation}>
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

              {/* Error if image is missing */}
              {missingImageError && (
                <p className="my-1 text-center text-red-400">
                  Image is still missing!
                </p>
              )}
              <button
                ref={submitButtonRef}
                type="submit"
                className={`my-1 rounded-sm bg-black py-1 text-white disabled:animate-pulse disabled:border disabled:border-slate-500 disabled:bg-slate-300 disabled:text-slate-400`}
              >
                Submit
              </button>
              <button
                onClick={handleClosingModal}
                type="reset"
                className="my-2 ml-auto block rounded-md border-2 border-black bg-red-500 px-2 py-1 font-bold text-white shadow-md shadow-black"
              >
                Close
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddLocationModal;
