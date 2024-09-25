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

    // Login user
    const response = await fetch(
      `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/login`,
      {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        credentials: 'include',
      },
    );

    if (response.ok) {
      await revalidateUser();
      // Go to account
      console.log('Logged in');
      revalidator('/account');
      // router.push('/account');
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
