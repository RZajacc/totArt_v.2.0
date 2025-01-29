// Libraries
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
// Fetching data
import { updateUserData } from '@/lib/clientMethods/userMethods/UpdateUserData';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Assets
import pencil from '@/assets/pencil.svg';
import confirm from '@/assets/confirm-svgrepo-com.svg';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';

type Props = {
  propName: string;
  textarea?: boolean | undefined;
};

function UserData({ propName, textarea }: Props) {
  // States necessary for updating fields
  const [isEdited, setIsEdited] = useState(false);
  const [fieldName, setFieldName] = useState<string | undefined>(propName);
  const [propValue, setPropValue] = useState<string | undefined>(undefined);

  const { user, revalidateUser } = useContext(AuthContext);

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  // SWR method to trigger update
  const { trigger: triggerUpdate } = useSWRMutation(
    `${FETCH_URL}/api/users/updateUser`,
    updateUserData,
  );

  useEffect(() => {
    switch (propName) {
      case 'userName':
        setFieldName('Username');
        setPropValue(user?.userName);
        break;
      case 'userEmail':
        setFieldName('Email');
        setPropValue(user?.email);
        break;
      case 'userWebsite':
        setFieldName('Website');
        setPropValue(user?.userWebsite ? user.userWebsite : '-');
        break;
      case 'userBio':
        setFieldName('Bio');
        setPropValue(user?.userBio ? user.userBio : '-');
        break;
    }
  }, [propName, user]);

  // Prepare renderable fields
  let renderIcon = undefined;
  let inputField = undefined;
  let renderField = undefined;

  // Defining Icons depending of isEdited state
  const confirmIcon = (
    <Image src={confirm} alt="confirm" className="mx-auto w-5" />
  );
  const editIcon = <Image src={pencil} alt="pencil" className="mx-auto w-5" />;

  // Defining fields displaying data depending of field name
  const dataField = <span className="col-span-3">{propValue}</span>;
  const linkField = (
    <a
      href={propValue}
      className="col-span-3 break-all text-sm font-bold italic"
    >
      {propValue}
    </a>
  );

  // Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPropValue(e.target.value);
  };

  // If textarea property is added then generate textarea, otherwise input field
  if (textarea) {
    inputField = (
      <textarea
        rows={3}
        value={propValue}
        onChange={handleInputChange}
        className="col-span-3 rounded-md border-2 border-black px-1 outline-none focus-within:border-blue-500"
      />
    );
  } else {
    inputField = (
      <input
        value={propValue}
        onChange={handleInputChange}
        className="col-span-3 rounded-md border-2 border-black px-1 outline-none focus-within:border-blue-500"
      />
    );
  }

  // Conditional rendering of icon and span displaying data | input field
  switch (propName) {
    case 'userWebsite':
      if (isEdited) {
        renderIcon = confirmIcon;
        renderField = inputField;
      } else {
        renderIcon = editIcon;
        renderField = linkField;
      }
      break;
    case 'userEmail':
      renderField = dataField;
      break;
    case 'userName':
    case 'userBio':
      if (isEdited) {
        renderIcon = confirmIcon;
        renderField = inputField;
      } else {
        renderIcon = editIcon;
        renderField = dataField;
      }
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
        elementValue: propValue ? propValue : '',
        email: user!.email,
      });
      await revalidateUser();
    }
  };

  return (
    <article className="grid grid-cols-6 items-center">
      <span className="col-span-2 font-bold">{fieldName}:</span>
      {renderField}
      <span className="text-center">
        <button onClick={handleIsEdited}>{renderIcon}</button>
      </span>
    </article>
  );
}

export default UserData;
