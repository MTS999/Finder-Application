import { createContext, useContext, useState } from "react";

export const ConversationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useConversationContext = () => {
  return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
    const [conversation,setConversation] = useState(null)
    const [chatPersonName,setChatPersonName] = useState("")
    const [openChatSideBar,setOpenChatSideBar] = useState(false)

    const [messeges,setMesseges] = useState([])
  // console.log(conversation);
  
  return (
    <ConversationContext.Provider value={{ conversation,setConversation ,messeges,setMesseges,setChatPersonName,chatPersonName,openChatSideBar,setOpenChatSideBar}}>
      {children}
    </ConversationContext.Provider>
  );
};2
