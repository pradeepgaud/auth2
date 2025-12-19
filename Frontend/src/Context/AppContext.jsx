import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = (props) => {

  // ✅ DIRECT BACKEND URL
  const backendUrl = "https://auth2-2.onrender.com";

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/auth/is-auth`,
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/data`,
        { withCredentials: true }
      );

      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
