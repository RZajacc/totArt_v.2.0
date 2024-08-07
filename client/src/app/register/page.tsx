'use client';
import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { validatePassword } from '../../utils/ValidatePassword';

type registerSucc = {
  msg: string;
  user: {
    userName: string;
    email: string;
  };
};

function Register() {
  // -------States-------
  const [pswFeedback, setPswFeedback] = useState<string[]>();
  const [registerSucc, setRegisterSucc] = useState<registerSucc>({
    msg: '',
    user: { email: '', userName: '' },
  });
  const [registerErr, setRegisterErr] = useState('');
  // -------Registration Refs-------
  const pswErrorDiv = useRef<HTMLDivElement>(null);
  const regErrorParagraph = useRef<HTMLDivElement>(null);
  const regSuccessDiv = useRef<HTMLParagraphElement>(null);

  // -------Input refs-------
  const usernameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  // User registration
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // User credentials
    const userName = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    // Get a table containing password errors
    const pswValidation = validatePassword(password, confirmPassword);
    setPswFeedback(pswValidation);

    // If password is not matching requirements show error div
    if (pswValidation.length !== 0) {
      pswErrorDiv.current?.classList.remove('hidden');
    }

    // If password passed validation create a new user
    if (pswValidation?.length === 0) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('userName', userName);
      urlencoded.append('email', email);
      urlencoded.append('password', password);

      try {
        const response = await fetch(
          `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/register`,
          {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow',
          },
        );

        if (response.ok) {
          const result: registerSucc = await response.json();
          setRegisterSucc(result);
          regSuccessDiv.current?.classList.remove('hidden');
          usernameInput.current!.value = '';
          emailInput.current!.value = '';
          passwordInput.current!.value = '';
          confirmPasswordInput.current!.value = '';
        } else {
          const result: { msg: string } = await response.json();
          console.log(result);
          setRegisterErr(result.msg);
          regErrorParagraph.current?.classList.remove('hidden');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const hideFeedbackInfo = () => {
    if (!regSuccessDiv.current?.classList.contains('hidden')) {
      regSuccessDiv.current?.classList.add('hidden');
    }
    if (!regErrorParagraph.current?.classList.contains('hidden')) {
      regErrorParagraph.current?.classList.add('hidden');
    }
    if (!pswErrorDiv.current?.classList.contains('hidden')) {
      pswErrorDiv.current?.classList.add('hidden');
    }
  };

  return (
    <>
      <div className="mx-auto mt-5 max-w-sm rounded-md bg-slate-200 p-4">
        <h4 className="mb-3 text-center text-xl font-bold">
          Register at TotArt
        </h4>
        <p className="logreg-paragraph">
          If you already have an existing account simply go to{' '}
          <Link href={'/login'} className="font-bold">
            login.
          </Link>
        </p>
        <form onSubmit={handleRegister} className="my-4 grid gap-2">
          <label htmlFor="username">Username:</label>
          <input
            ref={usernameInput}
            type="text"
            required
            name="username"
            placeholder="i.e. John"
            onChange={hideFeedbackInfo}
          />
          <label htmlFor="email">Email:</label>
          <input
            ref={emailInput}
            type="email"
            required
            name="email"
            placeholder="john@doe.com"
            onChange={hideFeedbackInfo}
          />
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordInput}
            type="password"
            required
            name="password"
            placeholder="password"
            minLength={8}
            onChange={hideFeedbackInfo}
          />
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            ref={confirmPasswordInput}
            type="password"
            required
            name="confirm-password"
            placeholder="password"
            minLength={8}
            onChange={hideFeedbackInfo}
          />
          <div className="text-sm italic text-slate-500">
            <p>Password needs to have at least:</p>
            <ul className="ml-5 list-disc">
              <li>8 characters.</li>
              <li>1 lowercase character.</li>
              <li>1 uppercase character.</li>
              <li>1 number.</li>
              <li>1 special character.</li>
            </ul>
          </div>
          <div
            ref={pswErrorDiv}
            className="hidden rounded-xl bg-red-500 px-4 py-2 text-white"
          >
            {pswFeedback &&
              pswFeedback.map((error, idx) => {
                return <p key={idx}>{error}</p>;
              })}
          </div>
          <p
            className="hidden rounded-xl bg-red-500 px-4 py-2 text-white"
            ref={regErrorParagraph}
          >
            {registerErr}
          </p>
          <div
            className="hidden rounded-xl bg-green-400 p-2"
            ref={regSuccessDiv}
          >
            <p className="text-center text-lg font-bold">{registerSucc.msg}</p>
            <p className="text-center">
              You will receive a confirmation email on{' '}
              <span className="font-bold">{registerSucc.user.email}</span>{' '}
              adress.
            </p>
            <small className="font-bold italic text-red-500">
              *Functionality to be applied soon! For now just go to login page
              to continue
            </small>
          </div>

          <button
            type="submit"
            className="mx-auto my-1 w-full rounded-md bg-black py-1 text-white"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
