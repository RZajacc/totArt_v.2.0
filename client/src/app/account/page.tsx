'use client';
import { useState } from 'react';
import UserProfile from '../../_components/userDashboard/UserProfile';
import UserFavs from '../../_components/userDashboard/UserFavs';
import UserPosts from '../../_components/userDashboard/UserPosts';
import DashboardTab from '../../_components/userDashboard/DashboardTab';

function Account() {
  // *-----------HANDLE USER NAV-------------------------------
  const [activeComponent, setActiveComponent] = useState('User profile');

  let renderedComponent = <UserProfile />;

  if (activeComponent === 'User profile') {
    renderedComponent = <UserProfile />;
  } else if (activeComponent === 'Favourites') {
    renderedComponent = <UserFavs />;
  } else {
    renderedComponent = <UserPosts />;
  }

  // ! TYPESCRIPT ON EVENT!
  // const userNavHandle = (e) => {
  //   setActiveComponent(e.target.innerText);
  // };

  return (
    <>
      <div className="rounded-md bg-green-400 p-2 shadow-md shadow-gray-800">
        <ul className="mb-6 mt-2 flex justify-center gap-2">
          <DashboardTab tabName="Profile" />
          <DashboardTab tabName="Favourites" />
          <DashboardTab tabName="Your locations" />
        </ul>
        {renderedComponent}
      </div>
      {/* <Container className="dashboard-container">
        <Row className="justify-content-center text-center">
          <Col className="dashboard-nav-column" xs={2}>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                User profile
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Update profile
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Favourites
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Your posts
              </p>
            </Row>
          </Col>
          <Col className="dashboard-data-column" xs={6}>
            {activeComponent === 'User profile' ? (
              <UserProfile />
            ) : activeComponent === 'Update profile' ? (
              <UserUpdate />
            ) : activeComponent === 'Favourites' ? (
              <UserFavs />
            ) : activeComponent === 'Your posts' ? (
              <UserPosts />
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default Account;
