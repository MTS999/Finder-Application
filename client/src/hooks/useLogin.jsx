import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ email, password }) => {
    const success = handleInputErrors({ email, password });
    if (!success) return;

    setLoading(true);
    try {
      // Make API call using Axios
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password }
      );

      localStorage.setItem("findAndLost-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login Successful");
    } catch (error) {
      toast.error("Login Failed");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}

export default useLogin;
