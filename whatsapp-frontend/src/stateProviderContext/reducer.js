export const initialState={
    user:null,
    islogin:false,
};
export const actionTypes={
    SET_USER:"SET_USER",
    SET_LOGIN:"SET_LOGIN"
};
const reducer =(state,action)=>{
    console.log(action);
    switch (action.type){
        case actionTypes.SET_USER:
            return{

                ...state,
                user:action.user,
            }
        case actionTypes.SET_LOGIN:
            return{
                ...state,
                islogin:action.islogin,
            }
            default:
                return state;
    }
}
export default reducer;