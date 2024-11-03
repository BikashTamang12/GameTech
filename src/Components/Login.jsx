import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [addlogin, setAddlogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [loginResult, setLoginResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddlogin({
      ...addlogin,
      [name]: value,
    });
    setErrors({});
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const loginValidation = async (e) => {
    const newErrors = {};
    e.preventDefault();

    if (addlogin.email.length === 0) {
      newErrors.email = "*email is required";
    }

    if (addlogin.password.length === 0) {
      newErrors.password = "*password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost/backend/api/login_backend.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addlogin),
        });

        const textResponse = await response.text();
        console.log("Raw response:", textResponse);
        const data = JSON.parse(textResponse);

        if (data[0].result === "Login successful") {
          setLoginResult("Login successful");
          login();
        } else if (data[0].result === "wrong password") {
          setLoginResult("Wrong password!");
        } else if (data[0].result === "wrong email") {
          setLoginResult("Email is wrong!");
        } else {
          setLoginResult("No id found");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="loginform">
      <fieldset id="loutline">
        <div className="loverlay"></div>

        <div className="lmodifyregestration">
          <h2 id="lheading">Login</h2>

          {loginResult && (
            <div id="successmeassage" style={{ textAlign: "center", marginBottom: "10px" }}>
              {loginResult}
            </div>
          )}
          
          <form onSubmit={loginValidation}>
            <div id="loemail">
              <label htmlFor="email" id="llemail">E-mail :</label>
              <input
                type="text"
                name="email"
                id="lllemail"
                value={addlogin.email}
                onChange={handleChange}
                className="input1"
              />
              {errors.email && (
                <div id="emailerror">
                  <span style={{ color: "red" }}>{errors.email}</span>
                </div>
              )}
            </div>

            <div id="lopassword">
              <div id="lheader">
                <label htmlFor="password" id="llpassword">Password :</label>
              </div>
              <div id="inputfield">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={addlogin.password}
                  onChange={handleChange}
                  className="input1"
                />
              </div>
              <div className="eye">
                <img
                  id="eyemodify"
                  src={visible ? open_eye : close_eye}
                  alt="Toggle password"
                  onClick={toggleVisibility}
                />
              </div>
              {errors.password && (
                <div id="errorm">
                  <span style={{ color: "red" }}>{errors.password}</span>
                </div>
              )}
            </div>

            <input type="submit" id="lsubmit" value="Submit" />

            <div id="fpassword">
              <Link to="/forgetpassword" id="ffpassword">Forget Password ?</Link>
            </div>

            <div id="laccount">
              <p id="laccounts">
                Don't have an account?
                <Link to="/signin" id="saccount">create account</Link>
              </p>
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
