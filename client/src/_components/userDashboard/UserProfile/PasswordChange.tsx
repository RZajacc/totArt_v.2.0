// Libraries
import React, { useContext, useState } from 'react';
import useSWRMutation from 'swr/mutation';
// Components
import TimerDisplay from '../../ui/state/TimerDisplay';
import PasswordField from '../../ui/inputs/PasswordField';
// Fetching data
import { VerifyUserPassword } from '@/lib/clientMethods/userMethods/VerifyUserPassword';
import { UpdateUserPassword } from '@/lib/clientMethods/userMethods/UpdateUserPassword';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Utils
import { validatePassword } from '@/utils/ValidatePassword';
import { Border, Rounded, Shadow } from 'enums/StyleEnums';
import ButtonBlack from '@/_components/ui/buttons/ButtonBlack';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';

type Props = {
  setShowPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
};

function PasswordChange({ setShowPasswordChange }: Props) {
  // Password field state variables
  const [invalidateCurrentPswInput, setInvalidateCurrentPswInput] =
    useState(false);
  const [invalidateNewPswInput, setInvalidateNewPswInput] = useState(false);

  // List of errors coming from password validator function
  const [newPswErrorList, setNewPswErrorList] = useState<string[]>([]);

  // State updating upon successfull update
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // User context
  const { user, revalidateUser } = useContext(AuthContext);

  // Renderable elements
  const currentPswInvalidParagraph = (
    <p className="text-red-400">Password is incorrect!</p>
  );
  const newPswErrorParagraph = (
    <ol className="list-inside list-disc px-1 text-red-400">
      {newPswErrorList.map((err, idx) => {
        return <li key={idx}>{err}</li>;
      })}
    </ol>
  );

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  // Methods to validate and update user password
  const { trigger: triggerPswVerification } = useSWRMutation(
    `${FETCH_URL}/api/users/verifyUserPassword`,
    VerifyUserPassword,
  );

  const { trigger: triggerPswUpdate } = useSWRMutation(
    `${FETCH_URL}/api/users/updateUserPassword`,
    UpdateUserPassword,
  );

  // Handle password update method
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form behaviour
    e.preventDefault();

    // Create form data object
    const formData = new FormData(e.currentTarget);

    // Collect inputs form the form
    const currentPassword = formData.get('current-password') as string;
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    // Set state of an old and new password
    let currentPasswordIsValid = false;
    let newPasswordIsValid = false;

    // Verify users current password with DB
    const verifyPassword = await triggerPswVerification({
      email: user ? user.email : '',
      password: currentPassword,
    });

    // Check if current password is valid
    if (verifyPassword.passwordValid) {
      currentPasswordIsValid = true;
      setInvalidateCurrentPswInput(false);
    } else {
      setInvalidateCurrentPswInput(true);
    }

    // Check if new password is valid with validator function
    const validNewPsw = validatePassword(newPassword, confirmPassword);

    // Method returns a list of elements
    if (validNewPsw.length !== 0) {
      setInvalidateNewPswInput(true);
      setNewPswErrorList(validNewPsw);
    } else {
      newPasswordIsValid = true;
      setInvalidateNewPswInput(false);
    }

    // If both conditions are met update the user
    if (currentPasswordIsValid && newPasswordIsValid) {
      await triggerPswUpdate({
        email: user ? user.email : '',
        password: newPassword,
      });
      await revalidateUser();
      setPasswordUpdated(true);
    }
  };

  return (
    <form
      className="my-6 flex flex-col gap-2 bg-slate-200 p-4"
      onSubmit={handlePasswordUpdate}
    >
      <PasswordField
        labelName="current-password"
        labelValue="Current password:"
        invalidateInput={invalidateCurrentPswInput}
        setInvalidateInput={setInvalidateCurrentPswInput}
      />
      {invalidateCurrentPswInput && currentPswInvalidParagraph}
      <PasswordField
        labelName="new-password"
        labelValue=" New password:"
        invalidateInput={invalidateNewPswInput}
        setInvalidateInput={setInvalidateNewPswInput}
        showTooltip
      />
      <PasswordField
        labelName="confirm-password"
        labelValue="Repeat password:"
        invalidateInput={invalidateNewPswInput}
        setInvalidateInput={setInvalidateNewPswInput}
        showTooltip
      />
      {invalidateNewPswInput && newPswErrorParagraph}

      <ButtonBlack
        type="submit"
        shadowSize={Shadow.small}
        border={Border.thin}
        rounded={Rounded.small}
      >
        Submit
      </ButtonBlack>

      {/* Timer to display upon successfull password change */}
      {passwordUpdated && (
        <div className="text-center">
          <p className="my-1 font-bold">
            Update successfull, window will be closed automatically!
          </p>

          <TimerDisplay
            onTimeout={() => {
              setShowPasswordChange(false);
            }}
            timeout={5000}
          />
        </div>
      )}
    </form>
  );
}

export default PasswordChange;
