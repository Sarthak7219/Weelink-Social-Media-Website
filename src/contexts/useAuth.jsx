import { createContext, useContext, useState, useEffect } from "react";
import { get_auth, login } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userData, setUserData] = useState(() => {
    const storedData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const check_auth = async () => {
    try {
      const data = await get_auth();
      if (data.success) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch {
      setAuth(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const auth_login = async (username, password, rememberMe) => {
    const data = await login(username, password);
    if (data.success) {
      setAuth(true);
      const newUserData = {
        username: data.user.username,
        bio: data.user.bio,
        email: data.user.email,
        profile_image: `${SERVER_URL}${data.user.profile_image}`,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
      };
      setUserData(newUserData);
      if (rememberMe) {
        localStorage.setItem("userData", JSON.stringify(newUserData));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(newUserData));
      }
      return { success: true };
    } else if (data.error) {
      return { error: "Something went wrong" };
    } else {
      return { error: "Something went wrong" };
    }
  };

  const google_login = (data, navigate) => {
    if (data.success) {
      setAuth(true);
      const newUserData = {
        username: data.user.username,
        bio: data.user.bio,
        email: data.user.email,
        profile_image: `${SERVER_URL}${data.user.profile_image}`,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
      };
      setUserData(newUserData);
      localStorage.setItem("userData", JSON.stringify(newUserData));
      navigate(`/${data.user.username}`);
    } else if (data.error) {
      alert(data.error);
      return;
    } else {
      return alert("Something went wrong");
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with pathname:", location.pathname);
    check_auth();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        authLoading,
        userData,
        setUserData,
        auth_login,
        google_login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
