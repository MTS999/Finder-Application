import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { ConversationContextProvider } from "./context/ConversationContext.jsx";
import { NotificationContextProvider } from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <NotificationContextProvider>

    <ConversationContextProvider>

      <AuthContextProvider>
        <SocketContextProvider>

        <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </ConversationContextProvider>
    </NotificationContextProvider>
    </BrowserRouter>
  </StrictMode>
);
