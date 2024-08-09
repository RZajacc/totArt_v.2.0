'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { validatePassword } from '../../utils/ValidatePassword';
import LabeledInput from '../../_components/formElements/LabeledInput';
import PasswordField from '../../_components/ui/PasswordField';

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
  const [registerErrMsg, setRegisterErrMsg] = useState('');
  const [registerErr, setRegisterErr] = useState(false);

  // Password field state variables
  const [invalidatePswInput, setInvalidatePswInput] = useState(false);

  // User registration
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
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
      setInvalidatePswInput(true);
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
          form.reset();
        } else {
          const result: { msg: string } = await response.json();
          setRegisterErrMsg(result.msg);
          setRegisterErr(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="mx-auto mt-5 max-w-sm rounded-md bg-gradient-to-br from-green-300 to-green-500 p-4 shadow-md shadow-black">
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
          <LabeledInput
            inputType="text"
            labelFor="username"
            labelText="Username:"
            onChange={() => {
              setRegisterErr(false);
            }}
            placeholder="i.e John"
            required
          />
          <LabeledInput
            inputType="email"
            labelFor="email"
            labelText="Email:"
            placeholder="i.e. JohnDoe@mail.com"
            onChange={() => {
              setRegisterErr(false);
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
          <PasswordField
            labelName="confirm-password"
            labelValue="Confirm password:"
            placeholder="confirm password"
            invalidateInput={invalidatePswInput}
            setInvalidateInput={setInvalidatePswInput}
            required
          />

          {/* Password validation feedback */}
          {invalidatePswInput && (
            <div className="rounded-xl bg-red-500 px-4 py-2 text-white">
              {pswFeedback &&
                pswFeedback.map((error, idx) => {
                  return <p key={idx}>{error}</p>;
                })}
            </div>
          )}

          {/* Registration error feedback */}
          {registerErr && (
            <p className="rounded-xl bg-red-500 px-4 py-2 text-white">
              {registerErrMsg}
            </p>
          )}

          {/* Registration success feedback */}
          {registerSucc.msg !== '' && (
            <div className="rounded-xl bg-yellow-50 p-2">
              <p className="text-center text-lg font-bold">
                {registerSucc.msg}
              </p>
              <p className="text-center">
                You will receive a confirmation email on{' '}
                <span className="font-bold">{registerSucc.user.email}</span>{' '}
                adress.
              </p>
              <p className="text-center">
                <small className="font-bold italic text-red-500">
                  *Functionality to be applied soon! For now just go to login
                  page to continue
                </small>
              </p>
            </div>
          )}

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
