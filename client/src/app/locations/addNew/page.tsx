'use client';
import isAuth from '@/utils/IsAuth';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

type Props = {};

function page({}: Props) {
  const imageUploadButtonRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleImageDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : '';

    if (!file) {
      setSelectedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setSelectedImage(fileReader.result ? fileReader.result : null);
    };

    fileReader.readAsDataURL(file);
  };
  return (
    <div className="mx-auto mt-5 max-w-lg rounded-md bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-black">
      <h1 className="text-center font-bold">Share some unique content:</h1>

      {/* IMAGE UPLOAD SECTION */}
      <section className="text-center">
        <div className="relative mx-auto mt-3 block h-32 w-32 content-center rounded-sm border-2 border-black bg-gradient-to-b from-amber-100 to-amber-300 text-center text-white">
          {selectedImage ? (
            <Image
              src={selectedImage as string}
              fill
              alt="Uploaded image "
              className="object-cover"
            />
          ) : (
            'Image preview'
          )}
        </div>
        <input
          type="file"
          name="locationImage"
          ref={imageUploadButtonRef}
          onChange={handleImageDisplay}
          className=" hidden"
          required
        />

        <button
          className=" bg-black p-1 text-white shadow-md shadow-black"
          onClick={() => {
            imageUploadButtonRef.current?.click();
          }}
        >
          Upload image
        </button>
      </section>
    </div>
  );
}

export default isAuth(page);
