import React, { useState } from "react";
import "../Components_CSS/ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PasswordIcon from '@mui/icons-material/Password';
const ForgetPassword = () => {
  const [fphone, setFphone] = useState({
    phone: "",
    email: "",
    newpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [fshow, setFShow] = useState("");
  const [nextstep, setNextStep] = useState("");
  const navigate = useNavigate();

  const [nopeneye, setOpenEye] = useState(false);

  const newopenEye = () => {
    setOpenEye(!nopeneye);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFphone({
      ...fphone,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setNextStep("");
  };

  const forgetpaswordValidation = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (fphone.email.length === 0) {
      newErrors.email = "*Email is required";
    }
    if (fphone.phone.length === 0) {
      newErrors.phone = "*Phone is required";
    }

    if (fphone.newpassword.length === 0) {
      newErrors.newpassword = "*password required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost/backend/api/forgetPassword.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: fphone.email,
              phone: fphone.phone,
              newPassword: fphone.newpassword,
            }),
          }
        );

        const data = await response.json();

        // Handle response from the backend
        if (data.result === "Password updated successfully!") {
          setFShow("Password updated successfully!");
          setNextStep("");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setNextStep(data.result); // Show error message from backend
        }
      } catch (error) {
        console.error("Error updating password:", error);
        setNextStep("An error occurred while updating the password.");
      }
    }
  };

  return (
    <div className="forget-Password-main">
      <fieldset id="forget-password-fieldset">
        <div className="forget-overlay"></div>
        <form onSubmit={forgetpaswordValidation}>
          <div id="forget-modify">
            <div className="forget-heading">
              <p id="phone-head">Forget Password</p>
            </div>
            {fshow && (
              <div
                id="fpasswordsuccessmsg"
                style={{ textAlign: "center", marginBottom: "10px",color:"green" }}
              >
                {fshow}
              </div>
            )}

            {nextstep && (
              <div
                id="fpasswordsuccessmsg1"
                style={{ textAlign: "center", marginBottom: "10px" ,color:"red",fontSize:"12px"}}
              >
                {nextstep}
              </div>
            )}




            {/*Email Creation*/}
            <div className="email-forget">
            <EmailIcon id="forget-icon"></EmailIcon>
              <input
                type="text"
                id="forget-email"
                name="email"
                value={fphone.email}
                onChange={handleChange}
                placeholder="enter email"
              ></input>
           
            </div>
            {errors.email && (
                <p id="forget-email-error" >
                  {errors.email}
                </p>
              )}


            {/*Phone Creation*/}
            <div className="forget-phone">
            <ContactPhoneIcon id="forget-icon"></ContactPhoneIcon>
              <input
                type="phone"
                id="forget-phone-input"
                name="phone"
                value={fphone.phone}
                onChange={handleChange}
                placeholder="enter phone number"
              />
             
            </div>
            {errors.phone && (
                <p id="forget-phone-error">
                  {errors.phone}
                </p>
              )}



{/*Password Part*/}
            <div className="forget-password-all">
              <PasswordIcon id="forget-icon"></PasswordIcon>
              <input
                type={nopeneye ? "text" : "password"}
                id="forget-password-input"
                name="newpassword"
                value={fphone.newpassword}
                onChange={handleChange}
                placeholder="new password"
              />
              
                <img
                  id="forget-eye"
                  src={nopeneye ? open_eye : close_eye}
                  alt="New password Open Eye"
                  onClick={newopenEye}
                ></img>
              
            
            </div>
            {errors.newpassword && (
                <p  id="forget-password-error" >{errors.newpassword}</p>
              )}






            <input type="submit" id="forget-submit" value="Submit"></input>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default ForgetPassword;
