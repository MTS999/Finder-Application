import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout=()=>{
    localStorage.removeItem('findAndLost-user'); 
    setAuthUser(null) // Clear the token
    navigate('/login');                
  }



  return {loading,logout}
}
export default useLogout;
