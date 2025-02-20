import { createContext, useContext, useState, useEffect } from "react";
import { get_auth, login } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });
  const navigate = useNavigate();

  const check_auth = async () => {
    try {
      await get_auth();
      setAuth(true);
    } catch {
      setAuth(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const auth_login = async (username, password) => {
    const data = await login(username, password);
    if (data.success) {
      setAuth(true);
      const newUserData = {
        username: data.user.username,
        bio: data.user.bio,
        email: data.user.email,
        profile_image: data.user.profile_image,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
      };
      setUserData(newUserData);
      localStorage.setItem("userData", JSON.stringify(newUserData));
      navigate(`/${username}`);
    } else if (data.error) {
      alert("Error reaching server!");
    } else {
      alert("Invalid username or password!");
    }
  };

  useEffect(() => {
    check_auth();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider
      value={{ auth, authLoading, userData, setUserData, auth_login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
