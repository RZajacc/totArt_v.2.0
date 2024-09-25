'use client';
import { useState } from 'react';
// Components
import UserProfile from '@/_components/userDashboard/UserProfile/UserProfile';
import UserFavs from '@/_components/userDashboard/UserFavs';
import UserLocations from '@/_components/userDashboard/UserLocations';
import DashboardTab from '@/_components/userDashboard/DashboardNav/DashboardTab';

type Props = {};

function TabsSection({}: Props) {
  const [activeComponent, setActiveComponent] = useState('Profile');

  // Active component to render
  let renderedComponent = <UserProfile />;

  // Change the rendered component based on user choice
  if (activeComponent === 'Profile') {
    renderedComponent = <UserProfile />;
  } else if (activeComponent === 'Favourites') {
    renderedComponent = <UserFavs />;
  } else {
    renderedComponent = <UserLocations />;
  }
  return (
    <>
      <ul className="mb-6 mt-2 flex justify-center gap-2">
        <DashboardTab
          tabName="Profile"
          setActiveComponent={setActiveComponent}
        />
        <DashboardTab
          tabName="Favourites"
          setActiveComponent={setActiveComponent}
        />
        <DashboardTab
          tabName="Your locations"
          setActiveComponent={setActiveComponent}
        />
      </ul>
      {renderedComponent}
    </>
  );
}

export default TabsSection;
