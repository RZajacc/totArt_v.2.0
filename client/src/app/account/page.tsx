'use client';
import { useState } from 'react';
import UserProfile from '../../_components/userDashboard/UserProfile';
import UserFavs from '../../_components/userDashboard/UserFavs';
import UserPosts from '../../_components/userDashboard/UserPosts';
import DashboardTab from '../../_components/userDashboard/DashboardTab';

function Account() {
  // *-----------HANDLE USER NAV-------------------------------
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
      <div className="rounded-md bg-green-400 p-2 shadow-md shadow-gray-800">
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
