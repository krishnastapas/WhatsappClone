// rfce shortcut to create component
import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect ,useContext} from "react";
import "./Sidebar.css";
import SidebarChat from './SidebarChat.jsx'
import userContext from '../stateProviderContext/userContext';
import axios from '../axiosApiCall/axios.jsx'
// import { signOut } from 'firebase/auth'
// import { useStateValue } from '../stateProviderContext/StateProvider';
// import { actionTypes } from '../stateProviderContext/reducer';


function Sidebar() {

    
    const [chats, setChats] = useState([]);
    const [popUpMenu, setPopUpMenu] = React.useState(false);
    // const [{user},dispatch]=useStateValue()
    const user = useContext(userContext)
    // console.log(user)
    useEffect(() => {
        // console.log(photoURL)
        if(user.state)
           setChats(user.state.chats);
    }, [user.state])
    const logout=async()=>{
        const res_user= await axios.post('/api/v1/users/logout', {
            headers: {
              withCredentials: true,
    
            },
            
          }
          );
        //   console.log(res_user)
        if(res_user.data==='user got sign out'){
            // cookies deleted user got logout
            // dispatch({
            //     type:actionTypes.SET_USER,
            //     user:null,
            //   })
            //   dispatch({
            //     type:actionTypes.SET_LOGIN,
            //     login:false,
            //   })
            user.user_update(null);
            user.updateChat(null)
            user.logedin_update(false);
        }
    }
    function PopUpMenu() {
        return (
          <ul className="drop-down">
            <li>
                <button onClick={logout}>Logout</button>
            
            </li>
            {/* <li>Menu-item-2</li>
            <li>Menu-item-3</li> */}
          </ul>
        );
      }
    // console.log(chats);
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user.state?user.state.photoURL:""} />

                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                        <div onClick={() => setPopUpMenu(!popUpMenu)}>
                    <IconButton>
                        <MoreVert />
                        
                    </IconButton>
                        </div>

                </div>
                {popUpMenu && PopUpMenu()}
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>

                    <SearchOutlined />
                    <input placeholder='Search or Satart a new chat' type="text" />

                </div>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addNewChat />
                {/* <SidebarChat chat_name="ravi"/>
               <SidebarChat chat_name="ram"/> */}

                {chats?chats.map((chat) => (
                    chat.show?
                <SidebarChat  chat={chat}/>:""
                )):""}

            </div>
        </div>
    )
}

export default Sidebar;