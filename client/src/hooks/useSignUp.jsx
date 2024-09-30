import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const signUp = async ({ name, email, password, confirmPassword }) => {
    const success = handleInputErrors({ name, email, password, confirmPassword });
    if (!success) return;
    setLoading(true);
    try {

      const {data}=await axios.post("http://localhost:3000/api/users/signup",
        { name, email, password, confirmPassword },
        // {
        //   withCredentials: true, // This allows cookies to be included in the request
        // }
      )
    // console.log(data);
    

      localStorage.setItem("findAndLost-user", JSON.stringify(data));
      setAuthUser(data)
      toast.success("Signup Successful");
    } catch (error) {
      toast.error("Signup Failed");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};
function handleInputErrors({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
export default useSignUp;
