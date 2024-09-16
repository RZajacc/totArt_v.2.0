'use client';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import React, { useContext } from 'react';
import pencil from '@/assets/pencil.svg';
import { locationData } from '@/types/locationTypes';

type Props = {
  locationAuthorId: string;
  fieldName: string;
  fieldData: string;
};

function LocationDataField({ locationAuthorId, fieldName, fieldData }: Props) {
  const { user } = useContext(AuthContext);

  // !Handler to fill
  const handleEditLocationModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {};

  return (
    <>
      <section>
        <div className="flex items-center justify-center space-x-3">
          <h1 className=" text-center text-lg font-bold">{fieldName}</h1>
          {locationAuthorId === user?._id ? (
            <button value={fieldName} onClick={handleEditLocationModal}>
              <Image src={pencil} alt="pencil" width={20} />
            </button>
          ) : (
            ''
          )}
        </div>
        <p className="text-center">{fieldData}</p>
      </section>
    </>
  );
}

export default LocationDataField;
