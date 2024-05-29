'use client';
import { FormEvent, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LoggingResponse } from '../../types/types';

type Props = {};

function Login({}: Props) {
  // * USE CONTEXT DATA
  const { setUser } = useContext(AuthContext);

  // *3_Login a user
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect login data
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;

    // Prepare fetch function
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
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
      const token = result.token;
      console.log('RESULT', result);
      if (token) {
        localStorage.setItem('token', token);
        const user = result.user;
        setUser(user);
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
      <div className="welcome-div">
        <h4>Welcome to TotArt</h4>
        <p>To use all of our functionalities please login to your account</p>
      </div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email address</label>
        <input type="email" name="email" placeholder="Enter email" required />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="user-password"
          required
        />

        <div className="text-center">
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
export default Login;
