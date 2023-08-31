import React from "react";
import "./Login.css";
import loginPNG from "../assets/login.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="form">
        <div className="left">
          <img src={loginPNG} alt="" />
        </div>
        <div className="right">
          <h2>Login</h2>
          <form>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter 6 character or more"
            />
            <button
              type="submit"
              onClick={() => {
                navigate("/");
              }}>
              LOG IN
            </button>
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
