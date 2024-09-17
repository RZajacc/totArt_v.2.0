'use client';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState } from 'react';
import ButtonRed from '../ui/buttons/ButtonRed';
import { Rounded, Shadow } from 'enums/StyleEnums';
import ButtonYellow from '../ui/buttons/ButtonYellow';
import DeleteField from '../ui/inputs/DeleteField';

import { DeleteLocation } from '@/lib/DeleteLocation';
import { locationData } from '@/types/locationTypes';

type Props = {
  locationData: locationData;
};

function LocationActions({ locationData }: Props) {
  const { user, mutateUser } = useContext(AuthContext);
  const [showDeleteField, setShowDeleteField] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const deleteLocationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect the form data
    const formData = new FormData(e.currentTarget);
    const deleteInput = formData.get('delete-phrase') as string;

    if (deleteInput !== 'DELETE') {
      setDeleteInput(deleteInput);
      setDeleteError(true);
    } else {
      // Trigger deleting and mutate location and user data
      await DeleteLocation(
        locationData.image._id,
        locationData.image.public_id,
        locationData._id,
      );

      // Refresh user data
      mutateUser();
    }
  };
  return (
    <>
      {locationData.author._id === user?._id && (
        <>
          <ButtonRed
            rounded={Rounded.medium}
            shadowSize={Shadow.small}
            onClick={() => {
              setShowDeleteField((prevState) => !prevState);
              setDeleteError(false);
            }}
          >
            Delete location
          </ButtonRed>
          <ButtonYellow rounded={Rounded.medium} shadowSize={Shadow.small}>
            Update data
          </ButtonYellow>
          {showDeleteField && (
            <DeleteField
              handleRemovingData={deleteLocationHandler}
              elementDescription="this location"
              providedVal={deleteInput}
              showIncorrectInput={deleteError}
              setShowIncorrectInput={setDeleteError}
            />
          )}
        </>
      )}
    </>
  );
}

export default LocationActions;
