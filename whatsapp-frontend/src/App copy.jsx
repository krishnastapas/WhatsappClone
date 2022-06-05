
import './App.css';
import Sidebar from "./component/Sidebar.jsx"
import Chat from "./component/Chat.jsx"
import { useState, useEffect,useContext } from 'react';
import Pusher from 'pusher-js'
// import { Router } from '@material-ui/icons';
import { actionTypes } from './stateProviderContext/userContext.jsx';
import React from "react";
import Login from "./component/Login.jsx"
import axios from './axiosApiCall/axios.jsx'
import userContext from './stateProviderContext/userContext.jsx';

function App() {


  // const user=useContext(userContext)
  // useEffect(() => {

  //   const getData = async () => {
  //     axios.defaults.withCredentials = true;
  //     const res_user= await axios.get('/api/v1/users/sync', {
  //       headers: {
  //         withCredentials: true,

  //       }
  //     });
  //     user.update(res_user.data)
  //   }
  //   getData();
  //   console.log(user.state);
  // }, [])
  // useEffect(() => {

  //   const pusher = new Pusher('0403674da6773397d012', {
  //     cluster: 'ap2'
  //   });

  //   const channel = pusher.subscribe('message');
  //   channel.bind('inserted', (newmessage) => {
  //     // alert(JSON.stringify(newmessage));
  //     setMessages([...messages, newmessage])
  //   });
  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   }

  // }, [messages])


  // console.log("displaying message")
  // console.log(messages);

  
 
  

  return (
    <div className="app">
      {!user.state ? (
        <Login />
      ) : (
        <div className="app_body">
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;
