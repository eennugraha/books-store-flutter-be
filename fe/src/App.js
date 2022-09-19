import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Navbar, MainContent } from "./components";

import LoginPage from "./pages/Login";

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  const loginCbHandler = (result) => {
    setLoginStatus(result);
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [loginStatus]);

  return (
    // <div>
    //   <Navbar />
    //   <MainContent />
    // </div>

    <>
      <div className="container-fluid">
        {loginStatus ? (
          <div>
            <Navbar
              loginStatus={loginStatus}
              loginCbHandler={loginCbHandler}
            ></Navbar>
            <MainContent></MainContent>
          </div>
        ) : (
          <LoginPage loginCbHandler={loginCbHandler}></LoginPage>
        )}
      </div>
    </>
  );
};

export default App;
