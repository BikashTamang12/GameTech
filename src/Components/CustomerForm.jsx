import React, { useState } from "react";
import "./CustomerForm.css";
import { Link } from "react-router-dom";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [errors, setErrors] = useState({});
  const [cvisible, setCvisible] = useState(false);
  const [ccvisible, setCcvisible] = useState(false);
  const [done, setDone] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegestration({
      ...regestration,
      [name]: value,
    });
    setErrors({});
  };

  const cTogglepassword = () => setCvisible(!cvisible);
  const ccTogglepassword = () => setCcvisible(!ccvisible);

  const customerRegestrationvalidation = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const a = /\d/;
    const b = /^(?:\+?1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const c = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const d = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regestration.username.length === 0) {
      newErrors.username = "*User name can't be empty";
    } else if (regestration.username.length < 3) {
      newErrors.username = "*User name must be at least 3 characters long";
    } else if (a.test(regestration.username)) {
      newErrors.username = "*Numbers are not allowed in the username!";
    }

    if (regestration.address.length === 0) {
      newErrors.address = "*Address field is required!";
    }

    if (regestration.phone.length === 0) {
      newErrors.phone = "*Phone number is required!";
    } else if (!b.test(regestration.phone)) {
      newErrors.phone = "*Wrong phone number !!";
    }

    if (regestration.email.length === 0) {
      newErrors.email = "*Email is required!!";
    } else if (!c.test(regestration.email)) {
      newErrors.email = "*Wrong email!!";
    }

    if (regestration.password.length === 0) {
      newErrors.password = "*Password is required!";
    } else if (regestration.password.length < 8) {
      newErrors.password = "*Password must be at least 8 characters long!";
    } else if (!d.test(regestration.password)) {
      newErrors.password = "*Password must contain 1 uppercase, 1 special character, and lowercase letters";
    }

    if (regestration.confirmpassword.length === 0) {
      newErrors.confirmpassword = "*This field can't be empty!";
    } else if (regestration.confirmpassword !== regestration.password) {
      newErrors.confirmpassword = "*Passwords didn't match!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formdata = {
        username: regestration.username,
        address: regestration.address,
        phone: regestration.phone,
        email: regestration.email,
        password: regestration.password,
      };

      try {
        const res = await axios.post("http://localhost/backend/api/user.php", formdata);
        if (res.data.success) {
          setDone("Registration successful! Redirecting...");
          setTimeout(() => navigate('/home'), 2000);
        } else {
          setDone(res.data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <div className="customerregestration">
      <fieldset id="outline">
        <div className="overlay"></div>
        <div className="modifyregestration">
          {done && <p id="regsuccess">{done}</p>}
          <h2 id="heading">Customer Regestration</h2>
          <form onSubmit={customerRegestrationvalidation}>
            <div id="musername">
              <label htmlFor="username" id="lusername">Name :</label>
              <input
                type="text"
                id="username"
                name="username"
                value={regestration.username}
                onChange={handleChange}
                className="input1"
              />
              {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
            </div>

            <div id="maddress">
              <label htmlFor="address" id="laddress">Address :</label>
              <input
                type="text"
                name="address"
                id="address"
                value={regestration.address}
                onChange={handleChange}
                className="input1"
              />
              {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
            </div>

            <div id="mphone">
              <label htmlFor="phone" id="lphone">Phone Number :</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                value={regestration.phone}
                onChange={handleChange}
                className="input1"
              />
              {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
            </div>

            <div id="memail">
              <label htmlFor="email" id="lemail">E-mail :</label>
              <input
                type="text"
                name="email"
                id="email"
                value={regestration.email}
                onChange={handleChange}
                className="input1"
              />
              {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            </div>

            <div id="mpassword">
              <label htmlFor="password" id="lpassword">Password :</label>
              <input
                type={cvisible ? "text" : "password"}
                name="password"
                id="password"
                value={regestration.password}
                onChange={handleChange}
                className="input1"
              />
              <div id="regeye">
                <img
                  id="regeyemodify"
                  src={cvisible ? open_eye : close_eye}
                  alt="Toggle password"
                  onClick={cTogglepassword}
                />
              </div>
              {errors.password && <div id="reger"><span style={{ color: "red" }}>{errors.password}</span></div>}
            </div>

            <div id="mcpassword">
              <label htmlFor="confirmpassword" id="lcpassword">Confirm Password :</label>
              <input
                type={ccvisible ? "text" : "password"}
                name="confirmpassword"
                id="confirmpassword"
                value={regestration.confirmpassword}
                onChange={handleChange}
                className="input1"
              />
              <div id="cregeye">
                <img
                  id="cregeyemodify"
                  src={ccvisible ? open_eye : close_eye}
                  alt="Toggle password"
                  onClick={ccTogglepassword}
                />
              </div>
              {errors.confirmpassword && <div id="cregerr"><span style={{ color: "red" }}>{errors.confirmpassword}</span></div>}
            </div>

            <input type="submit" id="submit" value="Submit" />
            <div id="div1">
              <p id="suggest">
                Already have an account?
                <Link to="/login" id="loginm"> Login </Link>
              </p>
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default CustomerForm;
