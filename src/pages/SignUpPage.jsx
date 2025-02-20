import React, { useState } from "react";
import { register } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        await register(username, email, firstName, lastName, password);
        alert("Registration successful! Please login");
        navigate("/login");
      } catch {
        alert("Error registering user");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="sign-in-from">
      <h1 className="mb-0">Sign Up</h1>
      <p>Enter your details to register</p>
      <form className="my-4">
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
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
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
            Confirm Password
          </label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
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
      </form>
    </div>
  );
};

export default SignUpPage;
