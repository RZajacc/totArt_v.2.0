import React from 'react';
import PreviewedElement from './PreviewedElement';

type Props = {};

function LoadingView({}: Props) {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-3xl animate-pulse gap-x-4 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="col-span-2">
        <p className="my-1 text-center">
          Backend is running on a free tier and might require some time to start
          after being inactive but it works!✌️
        </p>
        <p className="text-center font-bold text-blue-500">
          Sorry for inconvenience!
        </p>
      </div>
      <PreviewedElement />
      <PreviewedElement />
      <PreviewedElement />
      <PreviewedElement />
      <PreviewedElement />
      <PreviewedElement />
    </div>
  );
}

export default LoadingView;
