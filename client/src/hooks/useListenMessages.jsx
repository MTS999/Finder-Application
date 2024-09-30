import { useSocketContext } from "../context/SocketContext";
import { useConversationContext } from "../context/ConversationContext";
import { useEffect } from "react";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messeges, setMesseges } = useConversationContext();

  useEffect(() => {
    console.log("hi socket is listining");
    
    socket?.on("newMessage", (msg) => {
        console.log("new Messge",msg);
        
      setMesseges([...messeges, msg]);
    });

    return () => {
          socket.off("newMessage");
        };
  }, [socket,setMesseges,messeges]);

};

export default useListenMessages;
