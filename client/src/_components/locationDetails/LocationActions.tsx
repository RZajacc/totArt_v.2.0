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
import { editLocation } from '@/lib/EditLocation';

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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get form instance
    const form = new FormData(event.currentTarget);
    // Collect form data
    const title = form.get('title') as string;
    const description = form.get('description') as string;
    const location = form.get('location') as string;
    // Trigger update request
    await editLocation(locationData._id, title, description, location);
    // Turn off the modal
    setModalDisplay(false);
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
            submitHandler={submitHandler}
          >
            {/* <form className="mb-3 grid p-2" onSubmit={submitHandler}> */}
            <LabeledInput
              inputType="text"
              labelFor="title"
              labelText="Title:"
              required
              defaultValue={locationData.title}
            />
            <LabeledTextArea
              labelFor="description"
              labelText="Description"
              rows={3}
              required
              defaultValue={locationData.description}
            />
            <LabeledTextArea
              labelFor="location"
              labelText="Where was it:"
              rows={3}
              required
              defaultValue={locationData.location}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default LocationActions;
