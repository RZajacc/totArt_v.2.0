import React from 'react';
import PreviewedElement from './PreviewedElement';

type Props = {};

function LoadingView({}: Props) {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-3xl animate-pulse gap-x-4 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
