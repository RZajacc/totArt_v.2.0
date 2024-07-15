import React, { useState } from 'react';
import pencil from '../../assets/pencil.svg';
import confirm from '../../assets/confirm-svgrepo-com.svg';
import Image from 'next/image';

type Props = {
  propName: string;
  propValue: string;
  textarea?: boolean | undefined;
};

function UserData({ propName, propValue, textarea }: Props) {
  // States necessary for updating fields
  const [isEdited, setIsEdited] = useState(false);
  const [propState, setPropState] = useState(propValue);

  // Prepare the value to render
  let renderIcon = undefined;
  let dataField = undefined;
  let inputField = undefined;

  // Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPropState(e.target.value);
  };

  // If textarea property is added then generate textarea, otherwise input field
  if (textarea) {
    inputField = (
      <textarea
        rows={3}
        value={propState}
        onChange={handleInputChange}
        className="col-span-3 rounded-md border-2 border-black px-1 outline-none focus-within:border-blue-500"
      />
    );
  } else {
    inputField = (
      <input
        value={propState}
        onChange={handleInputChange}
        className="col-span-3 rounded-md border-2 border-black px-1 outline-none focus-within:border-blue-500"
      />
    );
  }

  // Conditional rendering of icon and span displaying data | input field
  if (propName !== 'Email adress:' && !isEdited) {
    renderIcon = <Image src={pencil} alt="pencil" className="mx-auto w-5" />;
    dataField = <span className="col-span-3">{propValue}</span>;
  } else if (propName !== 'Email adress:' && isEdited) {
    renderIcon = <Image src={confirm} alt="confirm" className="mx-auto w-5" />;
    dataField = inputField;
  }

  // Handle button state
  const handleIsEdited = () => {
    setIsEdited((prevState) => {
      const newState = !prevState;
      //TODO If newState is truthy update value with new prop state
      return newState;
    });
  };

  return (
    <article className="grid grid-cols-6 items-center">
      <span className="col-span-2 font-bold">{propName}</span>
      {dataField}
      <span className="text-center">
        <button onClick={handleIsEdited}>{renderIcon}</button>
      </span>
    </article>
  );
}

export default UserData;
