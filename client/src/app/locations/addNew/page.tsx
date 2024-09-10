'use client';
import isAuth from '@/utils/IsAuth';
import React, { useRef } from 'react';

type Props = {};

function page({}: Props) {
  const imageUploadButtonRef = useRef<HTMLInputElement | null>(null);

  const handleImageDisplay = () => {};
  return (
    <>
      <h1 className="m-1 text-center font-bold">Share some unique content:</h1>

      {/* IMAGE UPLOAD SECTION */}
      <section className="text-center">
        <input
          type="file"
          name="locationImage"
          ref={imageUploadButtonRef}
          onChange={handleImageDisplay}
          className=" hidden"
          required
        />

        <button
          className="rounded-sm bg-purple-400 p-1 shadow-md shadow-black"
          onClick={() => {
            imageUploadButtonRef.current?.click();
          }}
        >
          Upload image
        </button>

        <div className="mx-auto mt-3 block h-32 w-32 content-center rounded-sm border-2 border-stone-500 bg-stone-400 text-center text-white">
          Image preview
        </div>
        {/* {imageData && (
            <Image
              src={imageData.secure_url}
              width={imageData.width}
              height={imageData.height}
              alt="Uploaded image"
              className={`mx-auto w-1/4 rounded-md`}
            />
          )} */}
      </section>
    </>
  );
}

export default isAuth(page);
