import axios from "./axios";



const UserDatasyn= async (user) => {
  // const user = useContext(userContext)
  axios.defaults.withCredentials = true;
  const res_user = await axios.get('/api/v1/users/sync', {
    headers: {
      withCredentials: true,

    }
  });


  // there respond data from server
  if (res_user.data) {
    user.user_update(res_user.data);
    user.logedin_update(true);
    // dispatch({
    //   type:actionTypes.SET_USER,
    //   user:res_user.data,
    // })
    // dispatch({
    //   type:actionTypes.SET_LOGIN,
    //   login:true,
    // })

  }


}
export default UserDatasyn;