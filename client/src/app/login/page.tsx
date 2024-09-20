'use client';
// Libraries
import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
// Components
import LabeledInput from '@/_components/ui/inputs/LabeledInput';
import PasswordField from '@/_components/ui/inputs/PasswordField';
import ButtonDark from '@/_components/ui/buttons/ButtonDark';
// Context data
import { AuthContext } from '@/context/AuthContext';
import { Rounded } from 'enums/StyleEnums';

type Props = {};

function Login({}: Props) {
  // Context data
  const { mutateUser } = useContext(AuthContext);
  // Login error message
  const [logErrMsg, setLogErrMsg] = useState('');
  // Router for redirection after login
  const router = useRouter();
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
      const result: { msg: string; token: string } = await response.json();
      // Store auth token in a local storage
      localStorage.setItem('auth_token', result.token);
      mutateUser();
      // Go to account
      router.push('/account');
    } else {
      const result: { msg: string } = await response.json();
      setLogErrMsg(result.msg);
      if (result.msg === 'Wrong password, try again!') {
        setInvalidatePswInput(true);
      }
    }
  };

  return (
    <>
      <div className="mx-auto mt-5 max-w-sm rounded-md bg-gradient-to-br from-green-300 to-green-500 p-4 shadow-md shadow-black">
        <h4 className="mb-3 text-center text-xl font-bold">
          Welcome to TotArt
        </h4>
        <p className="mb-3 text-center">
          To use all of our functionalities please login to your account:
        </p>
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

          {invalidatePswInput && (
            <p className="drounded-xl rounded-md bg-red-500 py-1 text-center text-white">
              {logErrMsg}
            </p>
          )}

          <ButtonDark rounded={Rounded.medium} type="submit">
            Login
          </ButtonDark>
        </form>
      </div>
    </>
  );
}
export default Login;
