import { useContext, useRef } from 'react';
import useSWRMutation from 'swr/mutation';
import { locationImageUpload } from '../../fetchers/LocationImageUpload';
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
  // Input refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextRef = useRef<HTMLTextAreaElement>(null);
  const locationTextRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: imageData,
    trigger: triggerImageUpload,
    isMutating: imageIsMutating,
    error: imageUploadError,
    reset: resetImageData,
  } = useSWRMutation(
    'http://localhost:5000/api/images/locationImageUpload',
    locationImageUpload,
  );

  const { trigger: triggerDeletingImage } = useSWRMutation(
    'http://localhost:5000/api/images/imageDelete',
    deleteImage,
  );

  const { trigger: triggerAddLocation } = useSWRMutation(
    'http://localhost:5000/api/locations/addNewLocation',
    addNewLocation,
  );

  const { trigger: triggerGetLocations } = useSWRMutation(
    'http://localhost:5000/api/locations/all',
    getAllLocations,
  );

  //  --------- UPLOAD IMAGE -------------------------------
  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the file from submitted in the form
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('locationImage') as File;

    // If there was an image already uploded delete it to allow uploading a new one
    if (imageData) {
      triggerDeletingImage({ publicId: imageData._id, imageId: imageData._id });
    }

    // Trigger the mutation
    await triggerImageUpload({
      file: imageFile,
      folder: 'postImages',
    });

    // Reset ref
    imageInputRef.current!.value = '';
  };

  // ------------- SUBMIT A NEW POST -----------------
  const submitNewLocation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    await triggerAddLocation({
      title,
      description,
      location,
      imageUrl: imageData ? imageData.secure_url : '',
      author: user ? user._id : '',
    });

    // Refresh data in connected models
    mutateUser();
    triggerGetLocations();
    // Close the modal
    setShowAddLocation(false);
  };

  const handleClosingModal = async () => {
    // If there is an image then delete it
    if (imageData) {
      triggerDeletingImage({
        publicId: imageData.public_id,
        imageId: imageData._id,
      });
    }

    // Reset image data
    resetImageData();

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
          className={`relative top-[1%] mx-auto grid w-11/12 gap-y-2 rounded-sm border-2 border-black bg-yellow-200 p-2`}
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
                src={imageData ? imageData.secure_url : ''}
                width={imageData ? imageData.width : undefined}
                height={imageData ? imageData.height : undefined}
                alt="Uploaded image"
                className={`${!imageData ? 'hidden' : ''} mx-auto w-1/4 rounded-md`}
              />
              <small className="text-gray-500 ">
                *Supported formats : .jpg, .jpeg, .png
              </small>
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
            <form className="grid gap-y-1" onSubmit={submitNewLocation}>
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
                rows={2}
                name="description"
                placeholder="Describe the image"
                className="rounded-sm p-1"
                required
              />
              <label htmlFor="location">Where was it?</label>
              <textarea
                ref={locationTextRef}
                rows={2}
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
