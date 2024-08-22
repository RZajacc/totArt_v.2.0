import Image from 'next/image';
import React from 'react';
import infoCircle from '../../assets/info-circle-svgrepo-com.svg';

type Props = {};

function PasswordTooltip({}: Props) {
  return (
    <div className="group relative font-normal">
      <Image src={infoCircle} alt="info-button" className="mr-2 inline w-5" />
      <div className="invisible absolute right-9 z-10 inline-block w-52 -translate-y-16 rounded-lg bg-slate-800 p-4 text-white group-hover:visible md:left-9">
        <p>Password needs to contain at least one:</p>
        <ul className="list-inside list-disc">
          <li>lowercase character</li>
          <li>uppercase character</li>
          <li>special character</li>
          <li>number</li>
        </ul>
      </div>
    </div>
  );
}

export default PasswordTooltip;
