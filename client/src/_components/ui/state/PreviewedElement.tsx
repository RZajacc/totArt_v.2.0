import React from 'react';

type Props = {};

function PreviewedElement({}: Props) {
  return (
    <article className="w-full space-y-2">
      <p className=" h-8 rounded-md bg-slate-300"></p>
      <p className="  h-8  rounded-md bg-slate-300"></p>
      <div className="h-64  rounded-md bg-slate-300"></div>
    </article>
  );
}

export default PreviewedElement;
