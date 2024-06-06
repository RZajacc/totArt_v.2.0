'use client';
import { FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import { validatePassword } from '../../utils/ValidatePassword';

type Props = {};

function Register({}: Props) {
  const {} = useContext(AuthContext);
  const [pswFeedback, setPswFeedback] = useState<string[]>();
  const pswErrorDiv = useRef<HTMLDivElement>(null);

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // User credentials
    const userName = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    //   ! Rejstracja z contextu, na backendzie zmniejsz nowego użytkownika do trzech pól które ma

    const pswValidation = validatePassword(password, confirmPassword);
    setPswFeedback(pswValidation);

    // If password is not matching requirements show error div
    if (pswValidation.length !== 0) {
      pswErrorDiv.current?.classList.remove('hidden');
    }

    // if (passwordErr?.length === 0) {
    //   registerWithEmail(newUser);
    //   setLogReg('login');
    // }
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
          <input type="text" required name="username" placeholder="i.e. John" />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            name="email"
            placeholder="john@doe.com"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            name="password"
            placeholder="password"
            minLength={8}
            onChange={() => {
              pswErrorDiv.current?.classList.add('hidden');
            }}
          />
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            type="password"
            required
            name="confirm-password"
            placeholder="password"
            minLength={8}
            onChange={() => {
              pswErrorDiv.current?.classList.add('hidden');
            }}
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
                return (
                  <>
                    <p key={idx}>{error}</p>
                  </>
                );
              })}
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
