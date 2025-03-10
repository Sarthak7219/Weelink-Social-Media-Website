import { useAuth } from "../contexts/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth, authLoading } = useAuth();

  if (auth) {
    return children;
  }
  if (authLoading) {
    return (
      <p>Connecting to server...(May take time due to free tier hosting)</p>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
