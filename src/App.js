import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './CustomStyle.scss'

import { BrowserRouter } from "react-router-dom";
import AuthContext from './Contexts/AuthContext';
import UserContext from './Contexts/UserContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';

import { apiRoutes } from './GlobalConstants/ApiRoutes'
import { authPost, authGet } from './GlobalConstants/ApiCalls'

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    var data = await authGet(apiRoutes.GetMyInfo);

    if (data.success) {
      setUserInfo(data.response);
    }
  }

  const TokenLogin = async () => {
    var token = await localStorage.getItem("TOKEN");

    if (token) {
      var data = await authPost(apiRoutes.TokenLogin, {});

      if (data.success) {
        setSignedIn(true);
        await localStorage.setItem("TOKEN", data.response.token);
        await localStorage.setItem("USERID", data.response.userId);
        await getUserInfo()
      }
    }


  }

  useEffect(async () => {
    await TokenLogin();
    return () => {
    }
  }, [apiRoutes.TokenLogin])


  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <BrowserRouter>
          <Header />
          <Body />
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
