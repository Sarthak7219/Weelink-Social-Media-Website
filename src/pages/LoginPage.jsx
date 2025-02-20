import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { auth_login } = useAuth();

  const handleLogin = () => {
    if (!username.trim()) {
      alert("Please enter your username");
      return;
    }
    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }
    auth_login(username, password);
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
            Sign in
          </button>
        </div>
        <div className="sign-info">
          <span className="dark-color d-inline-block line-height-2">
            Don't have an account? <Link to="/register/">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
