'use client';
import { FormEvent, useContext } from 'react';
import { LoggingResponse } from '../../types/types';
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

function Login({}: Props) {
  // * USE CONTEXT DATA
  const { setIsLoggedIn } = useContext(AuthContext);
  const router = useRouter(); // Initialize the router hook

  // 3_Login a user
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
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    });

    if (response.ok) {
      const result: LoggingResponse = await response.json();
      setCookie('auth_token', result.token);
      setIsLoggedIn(true);
      router.push('/account');
    } else {
      const result = await response.json();
      console.log(result);
    }
  };

  return (
    <>
      <div className="welcome-div mx-auto mt-5 max-w-sm rounded-md bg-slate-200 p-4">
        <h4 className="mb-3 text-center text-xl font-bold">
          Welcome to TotArt
        </h4>
        <p className="mb-3 text-center">
          To use all of our functionalities please login to your account:
        </p>
        <form onSubmit={handleLogin} className="grid gap-3">
          <label htmlFor="email">Email address:</label>
          <input type="email" name="email" placeholder="Enter email" required />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="user-password"
            required
          />

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
