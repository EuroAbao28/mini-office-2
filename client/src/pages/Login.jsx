import React, { useState } from "react";
import "./Login.css";
import loginPNG from "../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // const loginURL = "https://mini-office-2.onrender.com/api/users/login";
    const loginURL = "http://localhost:5000/api/users/login";

    axios
      .post(loginURL, formData)
      .then((response) => {
        localStorage.setItem("user_token", response.data.token);
        toast.success(response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="login-container">
      <div className="form">
        <div className="left">
          <img src={loginPNG} alt="" />
        </div>
        <div className="right">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              name="email"
              value={email}
              onChange={handleForm}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter 6 character or more"
              name="password"
              value={password}
              onChange={handleForm}
            />
            <button type="submit">LOG IN</button>
          </form>
          <div className="bottom-div">
            <p>
              Doesn't have an account yet? <Link to={"/signup"}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
