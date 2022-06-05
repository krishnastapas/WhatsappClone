import { Button } from '@material-ui/core';
import React from 'react';
import "./Login.css";
import axios from '../axiosApiCall/axios'
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import userContext from '../stateProviderContext/userContext.jsx';
import { useContext } from 'react';
// import { useStateValue } from '../stateProviderContext/StateProvider';
// import { actionTypes } from '../stateProviderContext/reducer';


function Login() {

  const user = useContext(userContext)
  // const [{},dispatch]=useStateValue();
 

  const firebaseConfig = {
    apiKey: "AIzaSyBXq0konJnsdLJgdjMaIWo6EIf8JXqpNoQ",
    authDomain: "whats-app-clone-65f0d.firebaseapp.com",
    projectId: "whats-app-clone-65f0d",
    storageBucket: "whats-app-clone-65f0d.appspot.com",
    messagingSenderId: "604182016124",
    appId: "1:604182016124:web:cabddf1a3aacd3828c99f9",
    measurementId: "G-P6703LXHNH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();
  const login= async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {

         const res_user = await axios.post('api/v1/users/login', {
          "idToken": result.user.accessToken,
          "name": result.user.displayName,
          "email": result.user.email,
          "photoURL": result.user.photoURL
        },{
          withCredentials:true
        }
          )
          console.log(res_user.data);
          if(res_user.data!=="user not valid"){
            user.user_update(res_user.data);

          }
          // dispatch({
          //   type:actionTypes.SET_LOGIN,
          //   islogin:true,
          // })
          // user.logedin_update(true)



      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);

        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);

        // ...
      });
  }
  return (
    <div className='login'>
      <div className="login_container">
        {/* <WhatsAppIcon/> */}
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={login}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;