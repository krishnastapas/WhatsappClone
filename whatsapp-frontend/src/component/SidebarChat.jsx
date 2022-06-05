import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react'
// import axios from "../axiosApiCall/axios";
import axios from '../axiosApiCall/axios.jsx'
import UserDatasyn from '../axiosApiCall/UserDatasyn.jsx';
import userContext from '../stateProviderContext/userContext.jsx';
import { useContext } from "react";


import './SidebarChat.css';



function SidebarChat({addNewChat, chat }) {
  const user = useContext(userContext)
  // const [seed, setSeed] = useState('');
  const [popUpForm, setPopUpForm] = React.useState(false);
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');


  const createNewChat = async () => {
    setPopUpForm(!popUpForm)
    axios.defaults.withCredentials = true;
    const res_user = await axios.post('/api/v1/users/chats/new', {
      "name": inputName,
      "email": inputEmail,
      headers: {
        withCredentials: true,

      },
    });
    // console.log(res_user)
    if (res_user.status === 201 || res_user.status === 200) {
      let result = await UserDatasyn(user)
      console.log(result)
    }
    if (res_user.status === 200) {
      alert(`Chat already exit with name:" ` + res_user.data.name + ` ". Please check your chat......`)
    }
    else if (res_user.status === 400) {
      alert('user with given email is not exit or session expired.')
    }
    setInputEmail("");
    setInputName("");
  }
  const removeChat = async () => {
    setPopUpMenu(!popUpMenu)
    axios.defaults.withCredentials = true;
    const res_user = await axios.post('/api/v1/users/chats/remove', {
      "email": chat.email,
      headers: {
        withCredentials: true,

      },
    });
    if (res_user) {
      user.updateChat(null)
    }
  }
  const deleteChat = async () => {
    setPopUpMenu(!popUpMenu)
    // console.log(chat);
    // console.log(chat.chatId);
    axios.defaults.withCredentials = true;
    const res_user = await axios.post('/api/v1/users/chats/delete', {
      "email": chat.email,
      "chatId": chat.chatId,

      headers: {
        withCredentials: true,

      },
    });
    console.log(res_user)
    user.updateChat(null)
  }
  function PopUpForm() {
    return (
      // <div className='popUpForm'>
      <div className='popUpForm'>
        <form className='popUpForm_info' onSubmit={createNewChat}>
          <input type="text" value={inputName} placeholder="Name" onChange={(e) => { setInputName(e.target.value) }}></input>
          <input type="text" value={inputEmail} placeholder="Email " onChange={(e) => { setInputEmail(e.target.value) }}></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );

  }
  function PopUpMenu() {
    return (
      <ul className="drop-down">
        <li>
          <button onClick={removeChat}>Remove</button>

        </li>
        <li>
          <button onClick={deleteChat}>Delete</button>

        </li>
        {/* <li>Menu-item-2</li>
          <li>Menu-item-3</li> */}
      </ul>
    );
  }
  const onChatClick = () => {
    user.updateChat(chat)
  }

  return !addNewChat ? (
    <div onClick={onChatClick} className='sidebarChat'>
      <Avatar src={chat.chatPhoto} />
      <div className='sidebarchat_info'>
        <h2>{chat.name}</h2>
        <p>last message.....</p>
      </div>
      <div className='moreVert' onClick={() => setPopUpMenu(!popUpMenu)}>
        <IconButton>
          <MoreVert />

        </IconButton>
      </div>
      {popUpMenu && PopUpMenu()}

    </div>
  ) : (
    <>
      <div onClick={() => setPopUpForm(!popUpForm)} className="sidebarChat">
        <h2>Add new Chat</h2>
      </div>
      {popUpForm && PopUpForm()}
    </>
  )
}

export default SidebarChat