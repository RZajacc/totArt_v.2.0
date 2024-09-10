// Libraries
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWRMutation from 'swr/mutation';
// Components
import DeleteField from '../ui/DeleteField';
// Fetching data
import { DeleteLocation } from '@/fetchers/DeleteLocation';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Assets
import linkIcon from '@/assets/link-svgrepo-com.svg';
import binIcon from '@/assets/trash-can.svg';

type Props = {
  id: string;
  title: string;
  imageId: string;
  image_publicId: string;
};

function LocationItem({ title, id, imageId, image_publicId }: Props) {
  // Display deleteField
  const [showDeleteField, setShowDeleteField] = useState(false);
  const [showIncorrectInput, setShowIncorrectInput] = useState(false);
  const [providedValue, setProvidedValue] = useState('');

  const { mutateUser } = useContext(AuthContext);

  const { trigger: triggerDeletingLocation } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/locations/deleteLocation`,
    DeleteLocation,
  );

  // Remove Location
  const handleRemovingLocation = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    // Collect data from the form
    const formData = new FormData(e.currentTarget);
    const inputVal = formData.get('delete-phrase') as string;

    // Verify user input
    if (inputVal === 'DELETE') {
      // Hide paragraph
      setShowIncorrectInput(false);
      await triggerDeletingLocation({
        imageId: imageId,
        locationId: id,
        impagePublicId: image_publicId,
      });
      mutateUser();
      setShowDeleteField(false);
    } else {
      setProvidedValue(inputVal);
      setShowIncorrectInput(true);
    }
  };
  return (
    <>
      <li className="my-2 flex items-center justify-between border-b-2 border-stone-400 py-2">
        <p>
          <span className="font-bold">Title : </span>
          {title}
        </p>
        <div className="mr-2 flex gap-x-3">
          <Link href={`/locations/${id}`}>
            <Image src={linkIcon} alt="link" className="w-5" />
          </Link>
          <button
            onClick={() => {
              setShowDeleteField((prevState) => !prevState);
              setShowIncorrectInput(false);
            }}
          >
            <Image src={binIcon} alt="link" className="w-5" />
          </button>
        </div>
      </li>
      {showDeleteField && (
        <DeleteField
          handleRemovingData={handleRemovingLocation}
          elementDescription="this location"
          showIncorrectInput={showIncorrectInput}
          setShowIncorrectInput={setShowIncorrectInput}
          providedVal={providedValue}
        />
      )}
    </>
  );
}

export default LocationItem;
