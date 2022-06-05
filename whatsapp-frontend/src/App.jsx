
import './App.css';
import React from 'react';
// import { BrowserRouter, Router, Route } from "react-router-dom";
import Home from './component/Home';
// import Login from './component/Login';
// import userContext from './stateProviderContext/userContext.jsx';
// import {useContext } from 'react';
// import axios from './axiosApiCall/axios';
// import { actionTypes } from './stateProviderContext/reducer';
// import { useStateValue } from './stateProviderContext/StateProvider';


function App() { 
  return (
    <>
     <Home />
    {/* <BrowserRouter>
      <Router>
        <Route path="/home" element={< Home/>}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Router>
    </BrowserRouter> */}
    </>
  );
}

export default App;
