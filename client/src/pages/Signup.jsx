import React, { useState } from "react";
import "./Login.css";
import loginPNG from "../assets/login.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const hanldeForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerURL = "http://localhost:5000/api/users/register";

    axios
      .post(registerURL, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="login-container">
      <div className="form">
        <div className="left">
          <img src={loginPNG} alt="" />
        </div>
        <div className="right">
          <h2>Signup</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="exampleUser01"
              name="username"
              value={username}
              onChange={hanldeForm}
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              name="email"
              value={email}
              onChange={hanldeForm}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter 6 character or more"
              name="password"
              value={password}
              onChange={hanldeForm}
            />
            <button type="submit">SIGN UP</button>
          </form>
          <div className="bottom-div">
            <p>
              Doesn't have an account yet? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
