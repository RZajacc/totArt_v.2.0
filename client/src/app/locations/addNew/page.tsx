'use client';
// Libraries
import { useState } from 'react';
// Components
import ImagePicker from '@/_components/locations/ImagePicker';
import isAuth from '@/utils/IsAuth';
import LabeledInput from '@/_components/formElements/LabeledInput';
import LabeledTextArea from '@/_components/formElements/LabeledTextArea';
import ButtonDark from '@/_components/formElements/ButtonDark';

type Props = {};

function page({}: Props) {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  return (
    <div className="mx-auto mt-5 max-w-lg rounded-md bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-black">
      <h1 className="text-center font-bold">Share some unique content:</h1>

      <form className="grid gap-y-2">
        <LabeledInput
          inputType="text"
          labelFor="title"
          labelText="Start with giving it a title:"
          required
        />
        <LabeledTextArea
          labelFor="description"
          labelText="Add some description"
          rows={2}
          required
        />
        <LabeledTextArea
          labelFor="location"
          labelText="Where was it?"
          rows={2}
          required
        />
        {/* IMAGE UPLOAD SECTION */}
        <ImagePicker
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <ButtonDark type="submit">Submit data</ButtonDark>
      </form>
    </div>
  );
}

export default isAuth(page);
