import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";

const Login = () => {
  const [addlogin, setAddlogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddlogin({
      ...addlogin,
      [name]: value,
    });
    setErrors({});
  };

  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const loginValidation = (e) => {
    const newErrors = {};
    e.preventDefault();

    if (addlogin.email.length === 0) {
      newErrors.email = "*email is required";
    } //later we need to add validation for correct matching from database.

    if (addlogin.password.length === 0) {
      newErrors.password = "*password is required";
    } //later we need to add validation for correct matching from database.

    setErrors(newErrors);
  };
  return (
    <div className="loginform">
      <fieldset id="loutline">
        <div className="loverlay"></div>

        <div className="lmodifyregestration">
          <h2 id="lheading">Login</h2>

          <form onSubmit={loginValidation}>
            <div id="loemail">
              {/*Email Creation */}
              <label htmlFor="email" id="llemail">
                E-mail :
              </label>
              <input
                type="text"
                name="email"
                id="lllemail"
                value={addlogin.email}
                onChange={handleChange}
                className="input1"
              ></input>
              {errors.email && (
                <div id="emailerror">
                  <span style={{ color: "red" }}>{errors.email}</span>
                </div>
              )}
            </div>

            <div id="lopassword">
              {/*Password Creation */}
              <div id="lheader">
                <label htmlFor="password" id="llpassword">
                  Password :
                </label>
              </div>
              <div id="inputfield">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={addlogin.password}
                  onChange={handleChange}
                  className="input1"
                ></input>
              </div>

              <div className="eye">
                <img
                  id="eyemodify"
                  src={visible ? open_eye : close_eye}
                  alt="Toggle password"
                  onClick={toggleVisibility}
                ></img>
              </div>

              {errors.password && (
                <div id="errorm">
                  <span style={{ color: "red" }}>{errors.password}</span>
                </div>
              )}
            </div>

            <input type="submit" id="lsubmit" value="Submit"></input>

            <div id="fpassword">
              <Link to="/forgetpassword" id="ffpassword">
                Forget Password ?
              </Link>
            </div>

            <div id="laccount">
              <p id="laccounts">
                Don't have an account?
                <Link to="/signin" id="saccount">
                  create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
