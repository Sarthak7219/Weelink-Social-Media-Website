import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "../constants/constants";

const LoginPage = ({ handleGoogleLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { auth_login } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleSuccess = async (respose) => {
    await handleGoogleLogin(respose);
  };

  const handleLogin = async () => {
    if (!username.trim()) {
      alert("Please enter your username");
      return;
    }
    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }
    try {
      setLoading(true);
      const data = await auth_login(username, password, rememberMe);
      if (data.success) {
        navigate(`/${username}`);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      return;
    }
  };

  return (
    <div className="sign-in-from">
      <h1 className="mb-0">Sign in</h1>
      <p>Enter your username and password to access admin panel.</p>

      <form className="mt-4">
        <div className="form-group">
          <label className="form-label" htmlFor="id_username">
            Username*
          </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="text"
            className="form-control mb-0"
            name="username"
            id="id_username"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="id_password">
            Password*
          </label>
          <a href="#" className="float-end">
            Forgot password?
          </a>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="password"
            className="form-control mb-0"
            name="password"
            id="id_password"
            placeholder="Password"
            required
          />
        </div>
        <div className="d-inline-block w-100">
          <div className="form-check d-inline-block mt-2 pt-1">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheck11"
              name="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="customCheck11">
              Remember Me
            </label>
          </div>
          <button
            className="btn btn-primary float-end"
            type="button"
            onClick={handleLogin}
          >
            {loading == true ? "Signing in..." : "Sign in"}
          </button>
        </div>
        <div className="sign-info">
          <span className="dark-color d-inline-block line-height-2">
            Don't have an account? <Link to="/register/">Sign up</Link>
          </span>
        </div>
        <p className="my-3" style={{ textAlign: "center" }}>
          OR
        </p>
        <div className="sign-info mt-0 pt-0">
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </GoogleOAuthProvider>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
