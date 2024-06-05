'use client';
import { FormEvent } from 'react';
// import { AuthContext } from '../../context/AuthContext';
import { LoggingResponse } from '../../types/types';

type Props = {};

function Login({}: Props) {
  // * USE CONTEXT DATA
  // const { setUser } = useContext(AuthContext);

  // *3_Login a user
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
      console.log('RESULT', result);
      if (result.token) {
        // cookies().set('auth', result.token);
        // localStorage.setItem('token', token);
        // setIsLoggedIn(true);
      }
      return result.msg;
    } else {
      const result = await response.json();
      console.log('RESULT', result);
      return result.msg;
    }
  };

  return (
    <>
      <div className="welcome-div mx-auto mt-5 max-w-sm">
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

          {/* <div className="text-center"> */}
          <button
            type="submit"
            className="mx-auto my-1 w-28 rounded-md bg-black py-1 text-white"
          >
            Login
          </button>
          {/* </div> */}
        </form>
      </div>
    </>
  );
}
export default Login;
