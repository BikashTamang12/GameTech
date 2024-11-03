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
    // Initiliaze the value or simply state multiple inputs
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
  const [done,setDone]=useState('');

  const handleChange = (e) => {
    // capture the input value
    const { name, value } = e.target;
    console.log(`Input field name: ${name}, value: ${value}`); 
    setRegestration({
      //update the state of  regestration with new input.
      ...regestration,
      [name]: value,
    });
    setErrors({}); // clears the error when the user input the value.
  };

  const cTogglepassword = () => {
    setCvisible(!cvisible);
  };

  const ccTogglepassword = () => {
    setCcvisible(!ccvisible);
  };

  //Form validation....
  const customerRegestrationvalidation = async(e) => {
   
    e.preventDefault();
    const newErrors = {};
   
    //The regular expressin for proper validation.
    let a = /\d/; //checks the number.
    const b = /^(?:\+?1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/; //For Phone.
    const c = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //For E-mail.
    const d = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //For Password.
     

    //User name validation.
    if (regestration.username.length === 0) {
      newErrors.username = "*User name can't be empty";
    } else if (regestration.username.length < 3) {
      newErrors.username = "*User name must be at least 3 characters long";
    } else if (a.test(regestration.username)) {
      // Checks if username contains numbers
      newErrors.username = "*Numbers are not allowed in the username!";
    } 

    //Address Validation.
    if (regestration.address.length === 0) {
      newErrors.address = "*Address field is required!";
    }

    //Phone Number Validation.
    if (regestration.phone.length === 0) {
      newErrors.phone = "*phone number is required!";
    } else if (!b.test(regestration.phone)) {
      newErrors.phone = "*wrong phone number !!";
    } 

    //Email Validation.
    if (regestration.email.length === 0) {
      newErrors.email = "*email is required!!";
    } else if (!c.test(regestration.email)) {
      newErrors.email = "*wrong email!!";
    } 

    //Password Validation.
    if (regestration.password.length === 0) {
      newErrors.password = "*password is required!";
    } else if (regestration.password.length < 8) {
      newErrors.password =
        "*password must be at least 8 digit or more than that!!";
    } else if (!d.test(regestration.password)) {
      newErrors.password =
        "*password must contain 1 uppercase ,1 special character and lowercase";
    } 
    if (regestration.confirmpassword.length === 0) {
      newErrors.confirmpassword = "*this field can't be empty!";
    } else if (regestration.confirmpassword !== regestration.password) {
      newErrors.confirmpassword = "*password didn't match!";
    } 
    
    
    setErrors(newErrors);
    
  
    if(Object.keys(newErrors).length===0){
//form data is the object which contains the input value from the user which it will send backe to the  bakencdAPI.
const formdata = {
  username:regestration.username,
  address:regestration.address,
  phone:regestration.phone,
  email : regestration.email,
  password:regestration.password

};

try {
  //axios.post is an function sends http  post request.


  // Send the form data to the backend
  const res = await axios.post("http://localhost/backend/api/user.php", formdata);//the form dat will be send in backend in JSON format.and wait for the backend  reponse then move to next line.
  // if the response is successful then redirect to Home page
  if (res.data.success) {
    setDone("Registration successful! Redirecting...");
    setTimeout(() => {
      navigate('/home'); 
    }, 2000); 
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
         {/* Show success message */}
         {done && <p id="regsuccess">{done}</p>}
          <h2 id="heading">Customer Regestration</h2>
          <form onSubmit={customerRegestrationvalidation}>
            {/*Username Creation */}
            <div id="musername">
              <label htmlFor="username" id="lusername">
                Name :
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={regestration.username}
                onChange={handleChange}
                className="input1"
              ></input>
              {errors.username && (
                <span style={{ color: "red" }}>{errors.username}</span>
              )}
            </div>

            <div id="maddress">
              {/*Address Creation */}
              <label htmlFor="address" id="laddress">
                Address :
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={regestration.address}
                onChange={handleChange}
                className="input1"
              ></input>
              {errors.address && (
                <span style={{ color: "red" }}>{errors.address}</span>
              )}
            </div>

            <div id="mphone">
              {/*Phone Creation */}
              <label htmlFor="phone" id="lphone">
                Phone Number :
              </label>
              <input
                type="phone"
                name="phone"
                id="phone"
                value={regestration.phone}
                onChange={handleChange}
                className="input1"
              ></input>
              {errors.phone && (
                <span style={{ color: "red" }}>{errors.phone}</span>
              )}
            </div>

            <div id="memail">
              {/*Email Creation */}
              <label htmlFor="email" id="lemail">
                E-mail :
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={regestration.email}
                onChange={handleChange}
                className="input1"
              ></input>
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
            </div>

            <div id="mpassword">
              {/*Password Creation */}
              <label htmlFor="password" id="lpassword">
                Password :
              </label>
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
                ></img>
              </div>
              {errors.password && (
                <div id="reger">
                  <span style={{ color: "red" }}>{errors.password}</span>
                </div>
              )}
            </div>

            <div id="mcpassword">
              {/* Confirm Email Creation */}
              <label htmlFor="confirmpassword" id="lcpassword">
                Confirm Password :
              </label>
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
                ></img>
              </div>
              {errors.confirmpassword && (
                <div id="cregerr">
                  <span style={{ color: "red" }}>{errors.confirmpassword}</span>
                </div>
              )}
            </div>

            {/*Submit button*/}
            <input type="submit" id="submit" value="Submit"></input>
          
            <div id="div1">
              <p id="suggest">
                Already have an account?
                <Link to="/login" id="loginm">
                  Login
                </Link>{" "}

               
              </p>
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default CustomerForm;
