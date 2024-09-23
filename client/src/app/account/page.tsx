'use client';
// Libraries
import { useState } from 'react';
// Components
import UserProfile from '@/_components/userDashboard/UserProfile';
import UserFavs from '@/_components/userDashboard/UserFavs';
import UserPosts from '@/_components/userDashboard/UserLocations';
import DashboardTab from '@/_components/userDashboard/DashboardTab';
// Utils
import isAuth from '@/utils/IsAuth';

function Account() {
  const [activeComponent, setActiveComponent] = useState('Profile');

  // Active component to render
  let renderedComponent = <UserProfile />;

  // Change the rendered component based on user choice
  if (activeComponent === 'Profile') {
    renderedComponent = <UserProfile />;
  } else if (activeComponent === 'Favourites') {
    renderedComponent = <UserFavs />;
  } else {
    renderedComponent = <UserPosts />;
  }

  return (
    <>
      <div className="mx-auto mt-2 max-w-lg rounded-md bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-gray-800">
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
      </div>
    </>
  );
}

export default Account;
