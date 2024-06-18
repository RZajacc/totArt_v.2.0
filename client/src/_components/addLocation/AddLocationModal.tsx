import { useContext, useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { uploadImage } from '../../fetchers/UploadImage';
import { Image as ImageType } from '../../types/types';
import Image from 'next/image';
import { addNewLocation } from '../../fetchers/AddNewLocation';
import { AuthContext } from '../../context/AuthContext';
import { getAllLocations } from '../../fetchers/GetAllLocations';
import { deleteImage } from '../../fetchers/DeleteImage';

type Props = {
  showAddLocation: boolean;
  setShowAddLocation: (show: boolean) => void;
};

const AddLocationModal = ({ showAddLocation, setShowAddLocation }: Props) => {
  const { user, mutateUser } = useContext(AuthContext);
  const [uploadedImage, setUploadedImage] = useState<ImageType>();
  // Input refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextRef = useRef<HTMLTextAreaElement>(null);
  const locationTextRef = useRef<HTMLTextAreaElement>(null);

  const {
    trigger: triggerImageUpload,
    isMutating: imageIsMutating,
    error: imageUploadError,
  } = useSWRMutation(
    'http://localhost:5000/api/images/imageUpload',
    uploadImage,
  );

  const { trigger: triggerAddLocation } = useSWRMutation(
    'http://localhost:5000/api/posts/addNewLocation',
    addNewLocation,
  );

  const { trigger: triggerGetLocations } = useSWRMutation(
    'http://localhost:5000/api/posts/all',
    getAllLocations,
  );

  const { trigger: triggerDeletingImage } = useSWRMutation(
    'http://localhost:5000/api/images/imageDelete',
    deleteImage,
  );

  //  --------- UPLOAD IMAGE -------------------------------
  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the file from submitted in the form
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('locationImage') as File;

    // Trigger the mutation
    const result = await triggerImageUpload({
      file: imageFile,
      folder: 'postImages',
    });
    // If there was an image already uploded delete it to allow uploading a new one
    if (uploadedImage) {
      triggerDeletingImage({ publicId: uploadedImage.public_id });
    }
    // If there were no image before or was just deleted set a new one
    setUploadedImage(result.Image);
    // Reset ref
    imageInputRef.current!.value = '';
  };

  // ------------- SUBMIT A NEW POST -----------------
  const submitNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    await triggerAddLocation({
      title,
      description,
      location,
      imageUrl: uploadedImage ? uploadedImage.secure_url : '',
      author: user ? user._id : '',
    });

    // Refresh data in connected models
    mutateUser();
    triggerGetLocations();
    // Reset uploaded image
    setUploadedImage(undefined);
    // Close the modal
    setShowAddLocation(false);
  };

  const handleClosingModal = async () => {
    // If there is an image then delete it
    if (uploadedImage) {
      triggerDeletingImage({ publicId: uploadedImage.public_id });
    }
    // Reset the image
    setUploadedImage(undefined);
    // Reset input refs
    titleInputRef.current!.value = '';
    descriptionTextRef.current!.value = '';
    locationTextRef.current!.value = '';
    // Close the modal
    setShowAddLocation(false);
  };

  return (
    <>
      <div
        className={`${!showAddLocation ? 'hidden' : ''} fixed left-0 top-0 z-30 h-screen w-screen bg-slate-600/70`}
      >
        <div
          className={`relative top-[5%] mx-auto grid w-11/12 gap-y-2 rounded-sm border-2 border-black bg-yellow-200 p-2`}
        >
          <section>
            <h1 className="m-1 text-center font-bold">
              Share some unique content:
            </h1>
          </section>
          <section>
            <form onSubmit={handleFileSubmit} className="grid gap-y-1">
              <input
                ref={imageInputRef}
                type="file"
                name="locationImage"
                required
                className=" file:rounded-md file:bg-purple-400 file:shadow-md file:shadow-black"
              />
              <p className="text-center font-bold">
                {imageIsMutating ? 'Uploading...' : ''}
              </p>
              <Image
                src={uploadedImage ? uploadedImage.secure_url : ''}
                width={uploadedImage ? uploadedImage.width : undefined}
                height={uploadedImage ? uploadedImage.height : undefined}
                alt="Uploaded image"
                className={`${!uploadedImage ? 'hidden' : ''} mx-auto w-1/4 rounded-md`}
              />
              <button type="submit" className="rounded-sm bg-black text-white">
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
          <section>
            <form className="grid gap-y-1" onSubmit={submitNewPost}>
              <label htmlFor="title">Start with giving it a title</label>
              <input
                ref={titleInputRef}
                type="text"
                placeholder="example title"
                name="title"
                className="rounded-sm p-1"
                required
              />
              <label htmlFor="description">Add some description</label>
              <textarea
                ref={descriptionTextRef}
                rows={3}
                name="description"
                placeholder="Describe the image"
                className="rounded-sm p-1"
                required
              />
              <label htmlFor="location">Where was it?</label>
              <textarea
                ref={locationTextRef}
                rows={3}
                name="location"
                className="rounded-sm p-1"
                placeholder="Doesnt have to be precise but provide some information"
                required
              />
              <button type="submit" className="rounded-sm bg-black text-white">
                Submit
              </button>
            </form>
          </section>

          <section className="py-2">
            <button
              onClick={handleClosingModal}
              className="ml-auto block rounded-md border-2 border-black bg-red-500 px-2 py-1 font-bold text-white shadow-md shadow-black"
            >
              Close
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddLocationModal;
