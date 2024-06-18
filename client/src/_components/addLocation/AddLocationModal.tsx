import { useContext, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { uploadImage } from '../../fetchers/UploadImage';
import { Image as ImageType } from '../../types/types';
import Image from 'next/image';
import { addNewLocation } from '../../fetchers/AddNewLocation';
import { AuthContext } from '../../context/AuthContext';
import { getAllLocations } from '../../fetchers/GetAllLocations';

type Props = {
  showAddLocation: boolean;
  setShowAddLocation: (show: boolean) => void;
};

const AddLocationModal = ({ showAddLocation, setShowAddLocation }: Props) => {
  const { user, mutateUser } = useContext(AuthContext);
  const [uploadedImage, setUploadedImage] = useState<ImageType>();

  const { trigger: triggerImageUpload, isMutating: imageIsMutating } =
    useSWRMutation('http://localhost:5000/api/images/imageUpload', uploadImage);

  const { trigger: triggerAddLocation } = useSWRMutation(
    'http://localhost:5000/api/posts/addNewLocation',
    addNewLocation,
  );

  const { trigger: triggerGetLocations } = useSWRMutation(
    'http://localhost:5000/api/posts/all',
    getAllLocations,
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
    setUploadedImage(result.Image);
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

    mutateUser();
    triggerGetLocations();
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
              {/* Valid and invalid feedback */}
              <p></p>
              <p></p>
            </form>
          </section>
          <section>
            <form className="grid gap-y-1" onSubmit={submitNewPost}>
              <label htmlFor="title">Start with giving it a title</label>
              <input
                type="text"
                placeholder="example title"
                name="title"
                required
              />
              <label htmlFor="description">Add some description</label>
              <textarea rows={3} name="description" required />
              <label htmlFor="location">Where was it?</label>
              <textarea rows={3} name="location" required />
              <button type="submit" className="rounded-sm bg-black text-white">
                Submit
              </button>
            </form>
          </section>

          <section className="py-2">
            <button
              onClick={() => {
                setShowAddLocation(false);
              }}
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
