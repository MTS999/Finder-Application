import { useConversationContext } from "../context/ConversationContext";
import {  useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSendMessege = () => {
  const [loading, setLoading] = useState(false);
  const { conversation, setConversation, messeges, setMesseges } =
    useConversationContext();
  const { authUser } = useAuthContext();



    const sendMessage = async (message) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `http://localhost:3000/api/message/send/${conversation}`,{
            message

          },
          {
            headers: {
              Authorization: `Bearer ${authUser?.token}`,
            },
          }
        );
        // setMesseges(data);
        console.log(response);
        
        if(response.status==201){

            setMesseges([...messeges, response.data]);
        }

        // console.log(data);
      } catch (error) {
        toast.error("lostItems Failed");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
   

  return { sendMessage, loading };
};

export default useSendMessege;
