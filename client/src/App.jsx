import "./App.css";

import React from "react";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Navbar from "./componenets/Navbar";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import ResponsiveDrawer from "./componenets/ResponsiveDrawer";
import useListenGetNotifications from "./hooks/useListenGetNotifications";
import FoundItemDetail from "./componenets/fondItems/FoundItemDetail";
import LostItemDetail from "./componenets/lostItems/LostItemDetail";
import FoundItems from "./componenets/fondItems/FoundItems";
import LostItems from "./componenets/lostItems/LostItems";
import AddLostItemForm from "./componenets/lostItems/AddLostItem";
import AddFindItem from "./componenets/fondItems/AddFindItem";
const App = () => {
  const { authUser } = useAuthContext();

  useListenGetNotifications();
  return (
    <div
    // style="padding: 1rem; height: 100vh; display: flex; align-items: center; justify-content: center;"
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <ResponsiveDrawer /> : <Navigate to={"/login"} />}
        >

          {/* <Route index  element={<Home/>} />  */}
          <Route path="/findItems"  element={<FoundItems/>} /> 
          <Route path="/lostItems"  element={<LostItems/>} /> 
          <Route path="/addlostItem"  element={<AddLostItemForm/>} /> 
          <Route path="/addfindItem"  element={<AddFindItem/>} /> 
          <Route path="/findItemDetail/:id"  element={<FoundItemDetail/>} /> 
          <Route path="/lostItemDetail/:id"  element={<LostItemDetail/>} /> 
        </Route>

        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
        {/* <Route path="/mts" element={ <ResponsiveDrawer/>} /> */}
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
