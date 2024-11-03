import React, { useState } from "react";
<<<<<<< HEAD
import { Link} from "react-router-dom";
import "./Login.css";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";
import { useAuth } from "./AuthContext";



const Login = () => {
  const {login}=useAuth();
 
=======
import { Link } from "react-router-dom";
import "./Login.css";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";

const Login = () => {
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe
  const [addlogin, setAddlogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
<<<<<<< HEAD
  
 
=======
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddlogin({
      ...addlogin,
      [name]: value,
    });
    setErrors({});
  };

  const [visible, setVisible] = useState(false);
<<<<<<< HEAD
  const [loginResult, setLoginResult] = useState("");

=======
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe
  const toggleVisibility = () => {
    setVisible(!visible);
  };

<<<<<<< HEAD
  const loginValidation =async (e) => {
=======
  const loginValidation = (e) => {
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe
    const newErrors = {};
    e.preventDefault();

    if (addlogin.email.length === 0) {
      newErrors.email = "*email is required";
    } //later we need to add validation for correct matching from database.

    if (addlogin.password.length === 0) {
      newErrors.password = "*password is required";
<<<<<<< HEAD
    } 
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed to submit the login form
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
          // Navigate to home page or admin page as needed
         // navigate("/home");
         login();
        } else if (data[0].result=== "wrong password") {
          setLoginResult("Wrong password!");
        }else if(data[0].result==="wrong email"){
          setLoginResult("Email is wrong!");
        }else{
          setLoginResult("No id found");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
    
  };

  

  
=======
    } //later we need to add validation for correct matching from database.

    setErrors(newErrors);
  };
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe
  return (
    <div className="loginform">
      <fieldset id="loutline">
        <div className="loverlay"></div>

        <div className="lmodifyregestration">
          <h2 id="lheading">Login</h2>
<<<<<<< HEAD
 {/* Display login result message */}
 {loginResult && (
            <div  id="successmeassage" style={{ textAlign: "center", marginBottom: "10px" }}>
              {loginResult}
            </div>
          )}
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

=======

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

>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe
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
<<<<<<< HEAD
         
=======
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
