import userContext from "./userContext";
import { useState,useCallback } from "react";
import React from "react";

const userState=(props)=>{
    const [state,setState]=useState()
    const [islogedin,setIslogedin]=useState(false)
    const [chat,setChat]=useState()

    const user_update=useCallback(
        (value)=>{
            setState(value);
       },[state]
    )
    const logedin_update=(value)=>{
        setIslogedin(value);
    }

    const updateChat=(value)=>{
         setChat(value)
    }
    return(<userContext.Provider value={{state,user_update,islogedin,logedin_update,chat,updateChat}}>
        {props.children}
    </userContext.Provider>)

}
export default userState;