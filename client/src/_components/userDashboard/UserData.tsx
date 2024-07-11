import React from 'react';
import pencil from '../../assets/pencil.svg';
import confirm from '../../assets/confirm-svgrepo-com.svg';
import Image from 'next/image';

type Props = {
  propName: string;
  propValue: string;
};

function UserData({ propName, propValue }: Props) {
  let renderIcon = undefined;

  if (propName !== 'Email adress:') {
    renderIcon = <Image src={pencil} alt="pencil" className="mx-auto w-5" />;
  }

  return (
    <article className="grid grid-cols-6">
      <span className="col-span-2 font-bold">{propName}</span>
      <span className="col-span-3">{propValue}</span>
      <span>{renderIcon}</span>
    </article>
  );
}

export default UserData;
