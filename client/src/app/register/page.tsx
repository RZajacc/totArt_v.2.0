import RegisterForm from '@/_components/forms/RegisterForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register a new user',
};

function Register() {
  return (
    <>
      <div className="mx-auto mt-5 max-w-sm rounded-md bg-gradient-to-br from-green-300 to-green-500 p-4 shadow-md shadow-black">
        <h4 className="mb-3 text-center text-xl font-bold">
          Register at TotArt
        </h4>
        <p className="logreg-paragraph">
          If you already have an existing account simply go to{' '}
          <Link
            href={'/login'}
            className="font-bold text-pink-400 hover:animate-pulse hover:text-lg"
          >
            login.
          </Link>
        </p>
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;
