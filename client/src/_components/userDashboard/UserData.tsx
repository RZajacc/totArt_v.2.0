import React from 'react';

type Props = {
  propName: string;
  propValue: string;
};

function UserData({ propName, propValue }: Props) {
  return (
    <article className="grid grid-cols-5">
      <span className="col-span-2 font-bold">{propName}</span>
      <span className="col-span-3">{propValue}</span>
    </article>
  );
}

export default UserData;
