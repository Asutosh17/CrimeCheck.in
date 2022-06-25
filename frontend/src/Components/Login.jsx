import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import "./style.css";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const validate = (value, id) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setUser({ ...user, [id]: value });
      setErrorMessage("Strong Password");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };

  const handleChange = e => {
    const { id, value } = e.target;

    setUser({
      ...user,
      [id]: value,
    });
  };

  const login = e => {
    e.preventDefault();

    axios
      .post("https://crimecheck-noticeboard.herokuapp.com/login", {
        username: user.username,
        password: user.password,
      })
      .then(res => {
        alert(res.data.message);
        let msg = res.data.message;
        if (msg == "Login Successfull") {
          navigate("/board");
        } else if (msg == "User not registered") {
          navigate("/register");
        } else {
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div className="login">
        <h1>Welcome to Notice Board</h1>

        <h2>Login Here</h2>
        <form onSubmit={login} className="form">
          <label className="field">User Name</label>
          <input
            type="text"
            required
            id="username"
            value={user.username}
            placeholder="Enter user name"
            onChange={handleChange}
          />

          <label className="field">Password</label>
          <input
            type="password"
            required
            id="password"
            maxLength={8}
            placeholder="Enter password"
            onChange={e => validate(e.target.value, e.target.id)}
          />
          <br />

          {errorMessage === "" ? null : (
            <span
              style={{
                color: "red",
              }}
            >
              {errorMessage}
            </span>
          )}
          <br />

          <input type="submit" />

          <p className="note">
            <span>
              <b>Don't have an account?</b>{" "}
            </span>
            <Link to="/register">Register Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
