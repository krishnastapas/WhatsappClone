import "./Home.css";
import Sidebar from "./Sidebar.jsx"
import Chat from "./Chat.jsx"
import { useEffect, useContext, useState } from 'react';
import Pusher from 'pusher-js'
import React from "react";
import userContext from '../stateProviderContext/userContext.jsx';
import Login from "./Login";
import UserDatasyn from "../axiosApiCall/UserDatasyn.jsx";
import { chatDatasyn } from "../axiosApiCall/chatDatasyn";


function Home() {
  
  const user = useContext(userContext)
  const [messages, setMessages] = useState()

  useEffect(() => {
    UserDatasyn(user);

  }, [])

  useEffect(() => {
     chatDatasyn(user,setMessages)
    
  }, [user.chat])

  useEffect(() => {

    const pusher = new Pusher('0403674da6773397d012', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('users');
    channel.bind('updated', (data) => {
      if (data.updated) {
        // alert(data.updated)
        UserDatasyn(user);
      }


    });


    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [])


  useEffect(() => {

    const pusher = new Pusher('0403674da6773397d012', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chats');
    channel.bind('updated', (data) => {
      if (data.updated) {
        // alert(data.updated)
      chatDatasyn(user,setMessages)
    
      }


    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])

  console.log("displaying message")
  console.log(messages);

  return (
    <div className="app">
      {user.state ? (
        <div className="app_body">
          <Sidebar />
          {user.chat ? <Chat messages={messages} /> : " "}

        </div>
      ) : (

        <Login />

      )
      }
    </div>


  )
}

export default Home;
