import Image from 'next/image';
import React, { useRef } from 'react';
import ButtonDark from '../ui/buttons/ButtonDark';
import { Rounded } from 'enums/StyleEnums';

type Props = {
  selectedImage: string | ArrayBuffer | null;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
};

function ImagePicker({ selectedImage, setSelectedImage }: Props) {
  const imageUploadButtonRef = useRef<HTMLInputElement | null>(null);

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
    <section className="flex h-32 space-x-6">
      <div>
        <input
          type="file"
          name="locationImage"
          ref={imageUploadButtonRef}
          onChange={handleImageDisplay}
          className=" hidden"
          required
        />
        <ButtonDark
          rounded={Rounded.medium}
          onClick={() => {
            imageUploadButtonRef.current?.click();
          }}
        >
          Upload image
        </ButtonDark>
      </div>
      <div className="relative  block h-full w-32 content-center rounded-md border-2 border-black bg-gradient-to-b from-zinc-200 to-zinc-400 text-center text-white">
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
    </section>
  );
}

export default ImagePicker;
