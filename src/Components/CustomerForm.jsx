import React, { useState } from "react";
import "../Components_CSS/CustomerForm.css";
import { Link } from "react-router-dom";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import RegisterSliding from "./RegisterSliding";
import RegisterTextSliding from "./RegisterTextSliding";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [regestration, setRegestration] = useState({
    address: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [allerror, setAllError] = useState("");
  const [cvisible, setCvisible] = useState(false);
  const [ccvisible, setCcvisible] = useState(false);
  const [done, setDone] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegestration({
      ...regestration,
      [name]: value,
    });
    setAllError(""); // Clear the error on input change
  };

  const cTogglepassword = () => setCvisible(!cvisible);
  const ccTogglepassword = () => setCcvisible(!ccvisible);

  const customerRegestrationvalidation = async (e) => {
    e.preventDefault();

    // Validation Rules
    const a = /\d/;
    const b = /^(?:\+?1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const c = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/;
    const d =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Sequential Validation
    if (!regestration.username) {
      setAllError("*Username is required!");
      return;
    } else if (regestration.username.length < 3) {
      setAllError("*Username must be at least 3 characters long!");
      return;
    } else if (a.test(regestration.username)) {
      setAllError("*Numbers are not allowed in the username!");
      return;
    }

    if (!regestration.address) {
      setAllError("*Address is required!");
      return;
    }

    if (!regestration.phone) {
      setAllError("*Phone number is required!");
      return;
    } else if (!b.test(regestration.phone)) {
      setAllError("*Invalid phone number!");
      return;
    }

    if (!regestration.email) {
      setAllError("*Email is required!");
      return;
    } else if (!c.test(regestration.email)) {
      setAllError("*Invalid email format!");
      return;
    }

    if (!regestration.password) {
      setAllError("*Password is required!");
      return;
    } else if (regestration.password.length < 8) {
      setAllError("*Password must be at least 8 characters long!");
      return;
    } else if (!d.test(regestration.password)) {
      setAllError(
        "*Password must include uppercase, lowercase, special character, and number!"
      );
      return;
    }

    if (!regestration.confirmpassword) {
      setAllError("*Confirm Password is required!");
      return;
    } else if (regestration.confirmpassword !== regestration.password) {
      setAllError("*Passwords do not match!");
      return;
    }

    // If no errors, submit form
    const formdata = {
      username: regestration.username,
      address: regestration.address,
      phone: regestration.phone,
      email: regestration.email,
      password: regestration.password,
    };

    try {
      //the form data is post in backend.
      const res = await axios.post(
        "http://localhost/backend/api/user.php",
        formdata
      );
      if (res.data.success) {
        setDone("Registration successful! Redirecting...");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        setDone(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="customerregestration">
      
       
      <RegisterSliding></RegisterSliding>
     <RegisterTextSliding></RegisterTextSliding>*
      <fieldset id="outline">
    
        <div className="overlay"></div>
        <div className="reg-form-field">
        
          <h2 id="heading">Customer Registration</h2>
          {done && <p id="reg-success">{done}</p>}
          {allerror && (
            <p className="all-error-message">{allerror}</p>
          )}

          <form onSubmit={customerRegestrationvalidation}>
            {/* Username Field */}
            <div className="reg-username">
              <PersonIcon  id="reg-all-icon"/>
              <input
                type="text"
                id="reg-user-name"
                name="username"
                value={regestration.username}
                onChange={handleChange}
                placeholder="enter name"
              />
            </div>

            {/* Address Field */}
            <div className="reg-address">
              <HomeIcon id="reg-all-icon" />
              <input
                type="text"
                name="address"
                id="reg-user-address"
                value={regestration.address}
                onChange={handleChange}
                placeholder="address"
              />
            </div>

            {/* Phone Field */}
            <div className="reg-customer-phone">
              <ContactPhoneIcon  id="reg-all-icon"/>
              <input
                type="phone"
                name="phone"
                id="reg-user-phone"
                value={regestration.phone}
                onChange={handleChange}
                placeholder="phone number"
              />
            </div>

            {/* Email Field */}
            <div className="reg-email">
              <EmailIcon id="reg-all-icon" />
              <input
                type="text"
                name="email"
                id="reg-user-email"
                value={regestration.email}
                onChange={handleChange}
                placeholder="email"
              />
            </div>

            {/* Password Field */}
            <div className="reg-password">
              <PasswordIcon  id="reg-all-icon"/>
              <input
                type={cvisible ? "text" : "password"}
                name="password"
                id="reg-user-password"
                value={regestration.password}
                onChange={handleChange}
                placeholder="password"
              />
              <img
                id="reg-eye-icon"
                src={cvisible ? open_eye : close_eye}
                alt="Toggle password"
                onClick={cTogglepassword}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="reg-confirm-password">
              <PasswordIcon  id="reg-all-icon"/>
              <input
                type={ccvisible ? "text" : "password"}
                name="confirmpassword"
                id="reg-user-confirm-password"
                value={regestration.confirmpassword}
                onChange={handleChange}
                placeholder="confirm password"
              />
              <img
                id="reg-confirm-eyeIcon"
                src={ccvisible ? open_eye : close_eye}
                alt="Toggle password"
                onClick={ccTogglepassword}
              />
            </div>

            <input type="submit" id="reg-submit" value="Submit" />
            <p id="already-account">Already have an account?</p>
            <Link to="/login" id="login-account">
              <button id="already-login-account">Login</button>
            </Link>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default CustomerForm;
