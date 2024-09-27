'use client';
// Libraries
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
// Components
import ButtonRed from '../ui/buttons/ButtonRed';
import ButtonYellow from '../ui/buttons/ButtonYellow';
import DeleteField from '../ui/inputs/DeleteField';
import Modal from '../ui/Modal';
import LabeledInput from '../ui/inputs/LabeledInput';
import LabeledTextArea from '../ui/inputs/LabeledTextArea';
// Fetching data
import { DeleteLocation } from '@/lib/serverMethods/locationMethods/DeleteLocation';
import { editLocation } from '@/lib/serverMethods/locationMethods/EditLocation';
// Types
import type { locationData } from '@/types/locationTypes';
import { Rounded, Shadow } from 'enums/StyleEnums';

type Props = {
  locationData: locationData;
};

function LocationActions({ locationData }: Props) {
  const { user, revalidateUser } = useContext(AuthContext);
  // States managing deleting location fields
  const [showDeleteField, setShowDeleteField] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  // State managing modal display
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
        '/locations',
      );

      // Refresh user data
      await revalidateUser();
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
    // Refresh user data
    await revalidateUser();
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
            <div className="inline-block w-2/3">
              <DeleteField
                handleRemovingData={deleteLocationHandler}
                elementDescription="this location"
                providedVal={deleteInput}
                showIncorrectInput={deleteError}
                setShowIncorrectInput={setDeleteError}
              />
            </div>
          )}

          {/* Modal for editing location data */}
          <Modal
            modalDisplay={modalDisplay}
            closeHandler={() => {
              setModalDisplay(false);
            }}
            submitButtonText="Submit"
            cancelButtonText="Cancel"
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
