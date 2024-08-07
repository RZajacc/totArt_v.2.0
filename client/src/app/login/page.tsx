'use client';
import { FormEvent, useContext, useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

function Login({}: Props) {
  // Context data
  const { mutateUser } = useContext(AuthContext);
  // Login error message
  const [logErrMsg, setLogErrMsg] = useState('');
  // Ref to paragraph displaying error message
  const errorParagraph = useRef<HTMLParagraphElement | null>(null);
  // Router for redirection after login
  const router = useRouter();

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
      },
    );

    if (response.ok) {
      const result: { msg: string; token: string } = await response.json();
      // Set cookie and change user status
      setCookie('auth_token', result.token, { secure: false });
      mutateUser();
      // Go to account
      router.push('/account');
    } else {
      const result: { msg: string } = await response.json();
      setLogErrMsg(result.msg);
      errorParagraph.current?.classList.remove('hidden');
    }
  };

  return (
    <>
      <div className="mx-auto mt-5 max-w-sm rounded-md bg-slate-200 p-4">
        <h4 className="mb-3 text-center text-xl font-bold">
          Welcome to TotArt
        </h4>
        <p className="mb-3 text-center">
          To use all of our functionalities please login to your account:
        </p>
        <form onSubmit={handleLogin} className="grid gap-3">
          <label htmlFor="email">Email address:</label>
          <input
            onChange={() => {
              setLogErrMsg('');
              errorParagraph.current?.classList.add('hidden');
            }}
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            onChange={() => {
              setLogErrMsg('');
              errorParagraph.current?.classList.add('hidden');
            }}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="user-password"
            required
          />
          <p
            ref={errorParagraph}
            className="hidden rounded-xl bg-red-500 py-1 text-center text-white"
          >
            {logErrMsg}
          </p>
          <button
            type="submit"
            className="mx-auto my-1 w-full rounded-md bg-black py-1 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
