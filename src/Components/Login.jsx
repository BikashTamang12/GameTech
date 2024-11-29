import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Components_CSS/Login.css";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";
import { useAuth } from "./AuthContext";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import RegisterSliding from "./RegisterSliding";
import RegisterTextSliding from "./RegisterTextSliding";

const Login = () => {
  const { login } = useAuth();
  const [addlogin, setAddlogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [loginResult, setLoginResult] = useState("");
  const navigate = useNavigate();
  //this is used to navigate hte path this is used in line 77.
  const location = useLocation();
//updates the state of the form fields when the user types.
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
    e.preventDefault();

    const newErrors = {};
    if (addlogin.email.trim() === "") {
      newErrors.email = "*email is required";
    }
    if (addlogin.password.trim() === "") {
      newErrors.password = "*password is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        //sends the post request to backend in json format.
        const response = await fetch(
          "http://localhost/backend/api/login_backend.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addlogin),
          }
        );
        //extract the raw respone from the body HTTP and convert the json formatted string into js object for easier hendling.
        const textResponse = await response.text();
        const data = JSON.parse(textResponse);
       // console.log("Raw response:", textResponse);

        if (data[0].result === "Admin Login successful") {
          setLoginResult("Admin login successful");
          navigate("/adminPage");
        } else if (data[0].result === "Login successful") {
          setLoginResult("Login successful");
          localStorage.setItem("customerId", data[0].id); // Save customer ID
          login(); // Set user as authenticated in the context

          // Redirect to the intended page or default to home
          const redirectPath = location.state?.from || "/";
          navigate(redirectPath);
        } else if (data[0].result === "wrong password") {
          setLoginResult("Wrong password!");
        } else if (data[0].result === "wrong email") {
          setLoginResult("Email is wrong!");
        } else {
          setLoginResult("No id found");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoginResult("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="loginform">
      <RegisterSliding />
      <RegisterTextSliding />
      <fieldset id="loutline">
        <div className="loverlay"></div>
        <div className="lmodifyregestration">
          <h2 id="lheading">Login</h2>

          {loginResult && (
            <div
              id="successmeassage"
              style={{ textAlign: "center", marginBottom: "10px" }}
            >
              {loginResult}
            </div>
          )}

          <form onSubmit={loginValidation}>
            <div className="box">
              <EmailIcon id="email-icon" />
              <input
                type="text"
                name="email"
                id="email-input"
                value={addlogin.email}
                onChange={handleChange}
                placeholder="enter email"
              />
            </div>
            {errors.email && (
              <div id="email-error">
                <span style={{ color: "red" }}>{errors.email}</span>
              </div>
            )}

            <div className="box-password">
              <PasswordIcon id="password-icon" />
              <input
                type={visible ? "text" : "password"}
                name="password"
                id="password-box"
                value={addlogin.password}
                onChange={handleChange}
                placeholder="enter password"
              />
              <img
                id="eye-password"
                src={visible ? open_eye : close_eye}
                alt="Toggle password"
                onClick={toggleVisibility}
              />
            </div>
            {errors.password && (
              <div id="error-password">
                <span style={{ color: "red" }}>{errors.password}</span>
              </div>
            )}

            <input type="submit" id="login-submit" value="Submit" />
            <div id="forget-password">
              <Link to="/forgetpassword" id="forget-login-password">
                Forget Password?
              </Link>
            </div>

            <p id="dont-account">Don't have an account?</p>
            <Link to="/signin" className="create-account">
              <button id="button-create-account">Create Account</button>
            </Link>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
