import React, { useState } from 'react';
import pencil from '../../assets/pencil.svg';
import confirm from '../../assets/confirm-svgrepo-com.svg';
import Image from 'next/image';

type Props = {
  propName: string;
  propValue: string;
};

function UserData({ propName, propValue }: Props) {
  // States necessary for updating fields
  const [isEdited, setIsEdited] = useState(false);
  const [propState, setPropState] = useState(propValue);

  // Prepare the value to render
  let renderIcon = undefined;
  let valueField = <span className="col-span-3">{propValue}</span>;

  // Input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropState(e.target.value);
  };

  // Conditional rendering of icon and span displaying data | input field
  if (propName !== 'Email adress:' && !isEdited) {
    renderIcon = <Image src={pencil} alt="pencil" className="mx-auto w-5" />;
    valueField = <span className="col-span-3">{propValue}</span>;
  } else if (propName !== 'Email adress:' && isEdited) {
    renderIcon = <Image src={confirm} alt="confirm" className="w-5" />;
    valueField = (
      <input
        type="text"
        value={propState}
        onChange={handleInputChange}
        className="col-span-3 rounded-md border-2 border-black px-1 outline-none focus-within:border-blue-500"
      />
    );
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
      {valueField}
      <span className="text-center">
        <button onClick={handleIsEdited}>{renderIcon}</button>
      </span>
    </article>
  );
}

export default UserData;
