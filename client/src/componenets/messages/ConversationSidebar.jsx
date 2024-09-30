import * as React from "react";
import Drawer from "@mui/material/Drawer";

// import useGetMesseges from "../../hooks/useGetMesseges";
import MessageContainer from "./MessageContainer";
import { useConversationContext } from "../../context/ConversationContext";
import { useEffect } from "react";

export default function ConversationSidebar() {
  // const { messeges, loading } = useGetMesseges();

  const {  openChatSideBar, setOpenChatSideBar } =
    useConversationContext();
  // console.log(openChatSideBar);

  const [state, setState] = React.useState({
    right: false,
  });
  // Update the drawer state when openChatSideBar changes
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      right: openChatSideBar,
    }));
  }, [openChatSideBar]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenChatSideBar(open)
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
    <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "400px", // Set the width of the drawer
                height: "100vh", // Set the height of the drawer (80% of viewport height)
              },
            }}
          >
          
            <MessageContainer />
          </Drawer>
        </React.Fragment>
    </div>
  );
}
