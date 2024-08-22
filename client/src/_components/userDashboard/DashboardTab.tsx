import React from 'react';

type Props = {
  tabName: string;
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
};

function DashboardTab({ tabName, setActiveComponent }: Props) {
  return (
    <li>
      <button
        className=" rounded-md border-2 border-black bg-amber-300 px-2 py-1 shadow-md shadow-black"
        onClick={() => {
          setActiveComponent(tabName);
        }}
      >
        {tabName}
      </button>
    </li>
  );
}

export default DashboardTab;
