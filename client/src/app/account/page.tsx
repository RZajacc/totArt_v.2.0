'use client';
// import { useState } from "react";

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// import "../styles/accountPage.css";

function Account() {
  // const [LogReg, setLogReg] = useState("register");
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <h1>Accountpage</h1>
      {/* <Container className="userAuthContainer">
        <Row className="justify-content-center">
          <Col xs={8} className="login-register">
            {LogReg === "register" ? (
              <Register setLogReg={setLogReg} />
            ) : (
              <Login setLogReg={setLogReg} />
            )}
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default Account;
