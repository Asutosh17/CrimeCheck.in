import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export const Signup = () => {
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

  const register = e => {
    e.preventDefault();
    axios
      .post("https://crimecheck-noticeboard.herokuapp.com/register", user)
      .then(res => {
        alert(res.data.message);
        let msg = res.data.message;
        if (msg == "Successfully Registered") {
          navigate("/");
        } else if (msg == "Invalid Username") {
          navigate("/register");
        } else if (msg == "Invalid Password") {
          navigate("/register");
        } else if (msg == "User already registered") {
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div>
        <h2>Register Here</h2>
        <form onSubmit={register} className="form">
          <label className="field">User Name</label>
          <br />
          <input
            type="text"
            required
            id="username"
            value={user.username}
            placeholder="Enter Your Username"
            onChange={handleChange}
          />
          <br />

          <label className="field">Password</label>
          <br />
          <input
            type="password"
            required
            id="password"
            maxLength={10}
            placeholder="Enter your password"
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

          <p className="note">
            <b>Note :</b> Username password must be Alphaneumeric and Password
            length must be 8 or more than 8{" "}
          </p>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
