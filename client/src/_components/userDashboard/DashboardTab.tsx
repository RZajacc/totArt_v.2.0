import React from 'react';

type Props = { tabName: string };

function DashboardTab({ tabName }: Props) {
  return (
    <li>
      <button className=" rounded-md border-2 border-black bg-amber-300 px-2 py-1 shadow-md shadow-black">
        {tabName}
      </button>
    </li>
  );
}

export default DashboardTab;
