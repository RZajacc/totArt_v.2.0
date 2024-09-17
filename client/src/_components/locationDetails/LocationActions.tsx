'use client';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState } from 'react';
import ButtonRed from '../ui/buttons/ButtonRed';
import { Rounded, Shadow } from 'enums/StyleEnums';
import ButtonYellow from '../ui/buttons/ButtonYellow';
import DeleteField from '../ui/inputs/DeleteField';

import { DeleteLocation } from '@/lib/DeleteLocation';
import { locationData } from '@/types/locationTypes';
import Modal from '../ui/Modal';
import LabeledInput from '../ui/inputs/LabeledInput';
import LabeledTextArea from '../ui/inputs/LabeledTextArea';

type Props = {
  locationData: locationData;
};

function LocationActions({ locationData }: Props) {
  const { user, mutateUser } = useContext(AuthContext);
  const [showDeleteField, setShowDeleteField] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [modalDisplay, setModalDisplay] = useState(false);

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
          {/* Buttons to delete or edit location */}
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
          <ButtonYellow
            rounded={Rounded.medium}
            shadowSize={Shadow.small}
            onClick={() => {
              setModalDisplay(true);
            }}
          >
            Update data
          </ButtonYellow>

          {/* Field with confirmation of deletion */}
          {showDeleteField && (
            <DeleteField
              handleRemovingData={deleteLocationHandler}
              elementDescription="this location"
              providedVal={deleteInput}
              showIncorrectInput={deleteError}
              setShowIncorrectInput={setDeleteError}
            />
          )}

          {/* Modal for editing location data */}
          <Modal
            modalDisplay={modalDisplay}
            setModalDisplay={setModalDisplay}
            submitHandler={() => {
              setModalDisplay(false);
            }}
          >
            <form className="mb-3 grid p-2">
              <LabeledInput
                inputType="text"
                labelFor="title"
                labelText="Title:"
                defaultValue={locationData.title}
              />
              <LabeledTextArea
                labelFor="description"
                labelText="Description"
                rows={3}
                defaultValue={locationData.description}
              />
              <LabeledTextArea
                labelFor="location"
                labelText="Where was it:"
                rows={3}
                defaultValue={locationData.location}
              />
            </form>
          </Modal>
        </>
      )}
    </>
  );
}

export default LocationActions;
