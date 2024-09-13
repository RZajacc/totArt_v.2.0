import React from 'react';
import ButtonYellow from '../ui/buttons/ButtonYellow';
import { Border, Rounded, Shadow } from 'enums/StyleEnums';

type Props = {
  tabName: string;
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
};

function DashboardTab({ tabName, setActiveComponent }: Props) {
  return (
    <li>
      <ButtonYellow
        rounded={Rounded.medium}
        shadowSize={Shadow.medium}
        border={Border.thick}
        onClick={() => {
          setActiveComponent(tabName);
        }}
      >
        {tabName}
      </ButtonYellow>
    </li>
  );
}

export default DashboardTab;
