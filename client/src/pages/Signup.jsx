import React from "react";
import "./Login.css";
import loginPNG from "../assets/login.png";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="login-container">
      <div className="form">
        <div className="left">
          <img src={loginPNG} alt="" />
        </div>
        <div className="right">
          <h2>Signup</h2>
          <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="exampleUser01" />
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter 6 character or more"
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
