import React, { useContext, useEffect, useState } from 'react';
import pencil from '../../assets/pencil.svg';
import confirm from '../../assets/confirm-svgrepo-com.svg';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
import { updateUserData } from '../../fetchers/UpdateUserData';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  propName: string;
  textarea?: boolean | undefined;
};

function UserData({ propName, textarea }: Props) {
  // States necessary for updating fields
  const [isEdited, setIsEdited] = useState(false);
  const [fieldName, setFieldName] = useState<string | undefined>(propName);
  const [propState, setPropState] = useState<string | undefined>(undefined);
  const { user, mutateUser } = useContext(AuthContext);
  const { trigger: triggerUpdate, error: errorUpdating } = useSWRMutation(
    'http://localhost:5000/api/users/updateUser',
    updateUserData,
  );

  useEffect(() => {
    switch (propName) {
      case 'userName':
        setFieldName('Username');
        setPropState(user?.userName);
        break;
      case 'userEmail':
        setFieldName('Email');
        setPropState(user?.email);
        break;
      case 'userWebsite':
        setFieldName('Website');
        setPropState(user?.userWebsite ? user.userWebsite : '-');
        break;
      case 'userBio':
        setFieldName('Bio');
        setPropState(user?.userBio ? user.userBio : '-');
        break;
    }
  }, [propName, user]);

  // Prepare the value to render
  let renderIcon = undefined;
  let dataField = <span className="col-span-3">{propState}</span>;
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
  if (propName !== 'userEmail' && !isEdited) {
    renderIcon = <Image src={pencil} alt="pencil" className="mx-auto w-5" />;
    dataField = <span className="col-span-3">{propState}</span>;
  } else if (propName !== 'userEmail' && isEdited) {
    renderIcon = <Image src={confirm} alt="confirm" className="mx-auto w-5" />;
    dataField = inputField;
  }

  // Handle button state
  const handleIsEdited = async () => {
    setIsEdited((prevState) => {
      const newState = !prevState;
      return newState;
    });
    if (isEdited) {
      await triggerUpdate({
        elementName: propName,
        elementValue: propState ? propState : '',
        email: user!.email,
      });
      mutateUser();
    }
  };

  return (
    <article className="grid grid-cols-6 items-center">
      <span className="col-span-2 font-bold">{fieldName}:</span>
      {dataField}
      <span className="text-center">
        <button onClick={handleIsEdited}>{renderIcon}</button>
      </span>
    </article>
  );
}

export default UserData;
