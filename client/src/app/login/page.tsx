'use client';

import LoginForm from '@/_components/forms/LoginForm';

type Props = {};

function Login({}: Props) {
  return (
    <>
      <div className="mx-auto mt-5 max-w-sm rounded-md bg-gradient-to-br from-green-300 to-green-500 p-4 shadow-md shadow-black">
        <h4 className="mb-3 text-center text-xl font-bold">
          Welcome to TotArt
        </h4>
        <p className="mb-3 text-center">
          To use all of our functionalities please login to your account:
        </p>
        <LoginForm />
      </div>
    </>
  );
}
export default Login;
