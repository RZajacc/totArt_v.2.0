import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

function Register({}: Props) {
  // *Setting up context
  const {} = useContext(AuthContext);

  // *4 Register a new user
  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      <form action="">
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
        <button type="submit">Register</button>
      </form>

      <div className="password-req">
        <p>*Password needs to have at least 8 characters</p>
        <p>*Password needs to contain at least 1 uppercase character</p>
        <p>*Password needs to contain at least 1 number</p>
        <p>*Password needs to contain at least 1 special character</p>
      </div>
    </>
  );
}

export default Register;
