'use client';
import { FormEvent, useContext, useState } from 'react';
// Components
import LabeledInput from '@/_components/ui/inputs/LabeledInput';
import PasswordField from '@/_components/ui/inputs/PasswordField';
import ButtonDark from '@/_components/ui/buttons/ButtonDark';
// Context data
import { AuthContext } from '@/context/AuthContext';
import { Rounded } from 'enums/StyleEnums';
import { revalidator } from '@/lib/serverMethods/Revalidator';
import { setCookie } from 'cookies-next';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';

function LoginForm() {
  // Context data
  const { revalidateUser } = useContext(AuthContext);
  // Login error message
  const [logErrMsg, setLogErrMsg] = useState('');
  // Router for redirection after login
  const [invalidatePswInput, setInvalidatePswInput] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect login data
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;

    // Prepare headers
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    // Prepare request body
    const urlencoded = new URLSearchParams();
    urlencoded.append('email', email);
    urlencoded.append('password', password);

    // Build Fetch url
    const FETCH_URL = BuildFetchUrl();

    // Login user
    const response = await fetch(`${FETCH_URL}/api/users/login`, {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    });

    if (response.ok) {
      const data: { msg: string; token: string } = await response.json();
      // Set authentication cookie
      setCookie('auth-token', data.token, { sameSite: true });
      // Revalidate user to query user data
      await revalidateUser();
      // Go to account
      revalidator('/account');
    } else {
      const result: { msg: string } = await response.json();
      setLogErrMsg(result.msg);
      if (result.msg === 'Wrong password, try again!') {
        setInvalidatePswInput(true);
      }
    }
  };
  return (
    <form onSubmit={handleLogin} className="grid gap-3">
      <LabeledInput
        inputType="email"
        labelFor="email"
        labelText="Email adress:"
        placeholder="i.e. JohnDoe@mail.com"
        onChange={() => {
          setLogErrMsg('');
        }}
        required
      />

      <PasswordField
        labelName="password"
        labelValue="Password:"
        placeholder="password"
        invalidateInput={invalidatePswInput}
        setInvalidateInput={setInvalidatePswInput}
        required
      />

      {invalidatePswInput && logErrMsg !== '' && (
        <p className="drounded-xl rounded-md bg-red-500 py-1 text-center text-white">
          {logErrMsg}
        </p>
      )}

      <ButtonDark rounded={Rounded.medium} type="submit">
        Login
      </ButtonDark>
    </form>
  );
}

export default LoginForm;
