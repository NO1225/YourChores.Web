import React from 'react';
import logo from './logo.svg';
import './App.css';
import './CustomStyle.scss'

import { BrowserRouter} from "react-router-dom";

import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Body />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
