'use client';
import { FormEvent, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

function Register({}: Props) {
  // *Setting up context
  const {} = useContext(AuthContext);

  // *4 Register a new user
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   ! Walidacja do osobnego pliku i tylko wynik tutaj, form data
    //   ! Rejstracja z contextu, na backendzie zmniejsz nowego użytkownika do trzech pól które ma

    // const formValidation: string[] = [];

    // if (newUser.password !== confirmPassword) {
    //   formValidation.push("Provided passwords don't match!");
    // } else {
    //   if (newUser.password.length < 8 || confirmPassword.length < 8) {
    //     formValidation.push('Password is too short!');
    //   }

    //   if (!/[A-Z]/.test(newUser.password) || !/[A-Z]/.test(confirmPassword)) {
    //     formValidation.push(
    //       'Password needs to have at least one uppercase letter!',
    //     );
    //   }

    //   if (
    //     !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(newUser.password) ||
    //     !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(confirmPassword)
    //   ) {
    //     formValidation.push(
    //       'Password needs to contain at least 1 special character!',
    //     );
    //   }

    //   if (!/[0-9]/.test(newUser.password) || !/[0-9]/.test(confirmPassword)) {
    //     formValidation.push('Password needs to contain at least one number!');
    //   }
    // }

    // setPasswordErr(formValidation);

    // if (passwordErr?.length === 0) {
    //   registerWithEmail(newUser);
    //   setLogReg('login');
    // }
  };

  return (
    <>
      <div className="welcome-div">
        <h4>Welcome to TotArt</h4>
        <p>To use all of our functionalities please register a new account</p>
        {/* Link to lgin */}
        <p className="logreg-paragraph">
          If you already have an one then simply{' '}
        </p>
      </div>
      <form onSubmit={handleRegister} className="my-4 grid gap-2">
        <label htmlFor="username">Username:</label>
        <input type="text" required name="username" placeholder="username" />
        <label htmlFor="email">Email:</label>
        <input type="email" required name="email" placeholder="john@doe.com" />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          required
          name="password"
          placeholder="password"
        />
        <label htmlFor="confirm-password">Confirm password:</label>
        <input
          type="password"
          required
          name="confirm-password"
          placeholder="password"
        />
        <div className="text-centers text-sm italic text-slate-500">
          <p>Password needs to have at least:</p>
          <ul className="list-disc">
            <li>8 characters</li>
            <li>1 uppercase character</li>
            <li>1 number</li>
            <li>1 special character</li>
          </ul>
        </div>
        <button
          type="submit"
          className="mx-auto my-1 w-full rounded-md bg-black py-1 text-white"
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
