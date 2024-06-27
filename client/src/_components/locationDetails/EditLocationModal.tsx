import React from 'react';
import useSWRMutation from 'swr/mutation';
import { editLocation } from '../../fetchers/EditLocation';

type Props = {
  showEditLocationModal: boolean;
  setShowEditLocationModal: (show: boolean) => void;
  selectedProperty: string;
  editLocationData: string;
  setEditLocationData: (data: string) => void;
};

function EditLocationModal({
  showEditLocationModal,
  setShowEditLocationModal,
  selectedProperty,
  editLocationData,
  setEditLocationData,
}: Props) {
  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/locations/updateLocation',
    editLocation,
  );

  const handleEditLocation = async () => {};
  return (
    <div
      className={`fixed left-0 top-0 ${!showEditLocationModal ? 'hidden' : ''} z-30 h-screen w-screen bg-slate-600/70`}
      onClick={() => {
        setShowEditLocationModal(false);
      }}
    >
      <div
        className="relative top-1/4 mx-auto w-10/12 rounded-md border-2 border-black bg-slate-50 py-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className="border-b-2 pb-2 text-center font-bold">
          Edit {selectedProperty}
        </section>
        <section className="my-4 px-1">
          <textarea
            value={editLocationData}
            className="w-full p-1"
            rows={5}
            onChange={(e) => {
              setEditLocationData(e.target.value);
            }}
          ></textarea>
        </section>
        <section className="flex justify-end gap-x-2 px-2">
          <button
            onClick={handleEditLocation}
            className="rounded-md bg-green-400 px-2 py-1 hover:border-2 hover:border-black"
          >
            Update
          </button>
          <button
            className="rounded-md bg-red-500 px-2 py-1 hover:border-2 hover:border-black"
            onClick={() => {
              setShowEditLocationModal(false);
            }}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default EditLocationModal;
