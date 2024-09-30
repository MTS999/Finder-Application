import { useConversationContext } from "../context/ConversationContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useGetMesseges = () => {
  const [loading, setLoading] = useState(false);
  const { conversation, messeges, setMesseges,setChatPersonName } =
    useConversationContext();
  const { authUser } = useAuthContext();
  useEffect(() => {
    

    const getMessages = async () => {
      const token=authUser?.token
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/message/${conversation}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMesseges(data.messages);
        setChatPersonName(data.userToChatName)
        console.log(data);
      } catch (error) {
        toast.error("lostItems Failed");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (conversation) {
      getMessages();
    }
  }, [authUser, conversation, setMesseges]);

  return { messeges, loading };
};

export default useGetMesseges;
