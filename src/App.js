import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './CustomStyle.scss'

import { BrowserRouter } from "react-router-dom";
import AuthContext from './Contexts/AuthContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';

import { apiRoutes } from './GlobalConstants/ApiRoutes'
import { authPost } from './GlobalConstants/ApiCalls'

function App() {
  const [signedIn, setSignedIn] = useState(false);

  const TokenLogin = async () => {
    var token = await localStorage.getItem("TOKEN");

    if (token) {
      var data = await authPost(apiRoutes.TokenLogin, {});

      if (data.success) {
        setSignedIn(true);
        localStorage.setItem("TOKEN", data.response.token);
        localStorage.setItem("USERID", data.response.userId);
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
      <BrowserRouter>
        <Header />
        <Body />
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
