'use client';
// Libraries
import { useState } from 'react';
// Components
import ImagePicker from '@/_components/locations/ImagePicker';
import isAuth from '@/utils/IsAuth';

type Props = {};

function page({}: Props) {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  return (
    <div className="mx-auto mt-5 max-w-lg rounded-md bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-black">
      <h1 className="text-center font-bold">Share some unique content:</h1>

      {/* IMAGE UPLOAD SECTION */}
      <ImagePicker
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}

export default isAuth(page);
