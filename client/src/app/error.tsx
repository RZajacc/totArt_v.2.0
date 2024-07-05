'use client';
// import MyNav from "../components/MyNav";

type ErrorResponse = {
  data: string;
  status: number;
  statusText: string;
};

function Error({ error, reset }) {
  // ? PREPARING MESSAGES TO DISPLAY IN CASE OF DIFFERENT ERROR
  let title = 'An error occured!';
  let message = 'Something went wrong';

  // ? COVERING CURRENTLY KNOWN SITUATIONS WITH ERRORS
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Page not found!';
    message = 'Could not find resource or page.';
  }

  if (error.status === 503) {
    title = 'Unexpected error has occured!';
    message = JSON.parse(error.data).message;
  }

  return (
    <>
      {/* <MyNav /> */}

      <img
        src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699618633/other/wfep02f6t2zhovchnjnu.png"
        width={'85%'}
      />
      <h4>{title}</h4>
      <p>
        <i>{message}</i>
      </p>
    </>
  );
}

export default Error;
