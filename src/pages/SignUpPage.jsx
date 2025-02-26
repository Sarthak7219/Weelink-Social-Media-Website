import React, { useState } from "react";
import { register } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "../constants/constants";

const SignUpPage = ({ handleGoogleLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };
  const handleSuccess = async (respose) => {
    await handleGoogleLogin(respose);
  };

  const handleRegister = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    } else if (!password.trim()) {
      alert("Please enter a password");
      return;
    } else if (!confirmPassword.trim()) {
      alert("Please confirm your password");
      return;
    }
    if (password === confirmPassword) {
      if (password.length < 5) {
        alert("Password must have at least 5 characters");
        return;
      }
      try {
        const data = await register(
          username,
          email,
          firstName,
          lastName,
          password
        );
        if (data.error) {
          alert(data.error);
        } else {
          alert("Registration successful! Please login");
          navigate("/login");
        }
      } catch {
        alert("Error registering user");
        return;
      }
    } else {
      alert("Passwords do not match");
      return;
    }
  };

  return (
    <div className="sign-in-from">
      <h1 className="mb-0">Sign Up</h1>
      <p>Enter your details to register</p>
      <form className="my-4">
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username*
          </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="text"
            name="username"
            className="form-control mb-0"
            placeholder="Username"
            required
            id="id_username"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="email"
            name="email"
            className="form-control mb-0"
            placeholder="Enter your email address"
            required
            id="id_email"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="first_name">
            First Name
          </label>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="text"
            name="first_name"
            className="form-control mb-0"
            placeholder="Enter you first name"
            required
            id="id_first_name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="last_name">
            Last Name
          </label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="text"
            name="last_name"
            className="form-control mb-0"
            placeholder="Enter you last name"
            required
            id="id_last_name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password1">
            Password*
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="password"
            name="password1"
            className="form-control mb-0"
            placeholder="Enter a password"
            required
            id="id_password1"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password2">
            Confirm Password*
          </label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="password"
            name="password2"
            className="form-control mb-0"
            placeholder="Confirm your Password"
            required=""
            id="id_password2"
          />
        </div>
        <div className="d-inline-block w-100">
          <button
            type="button"
            onClick={handleRegister}
            className="btn btn-primary float-start w-25"
          >
            Sign Up
          </button>
          <div className="form-check d-inline-block mt-1 ps-0 float-end">
            <span className="dark-color d-inline-block line-height-2">
              Already Have Account ? <Link to="/login/">Log In</Link>
            </span>
          </div>
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

export default SignUpPage;
