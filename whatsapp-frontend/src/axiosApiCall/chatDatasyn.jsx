// import axios from 'axios'
import axios from '../axiosApiCall/axios.jsx'




export const chatDatasyn = async (user, setMessages) => {
    // const user = useContext(userContext)
    console.log("user.chat:" + user.chat)
    if (user.chat) {
        console.log("chat id :" + user.chat.chatId)

        axios.defaults.withCredentials = true;
        const res_chat = await axios.post('/api/v1/chat/messages/sync', {
            "chatId": user.chat.chatId,
            headers: {
                withCredentials: true,

            },
        });
       

        if (res_chat) {
            console.log(res_chat.data)
            console.log(res_chat.data.messages)
            setMessages(res_chat.data.messages)
            
        }
        
    }
    
}