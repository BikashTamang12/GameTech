import React, { useState } from "react";
import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import open_eye from "./Images/open_eye.png";
import close_eye from "./Images/close_eye.png";
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
    <div className="forgetPassword">
      <fieldset id="forgetpasswordfieldset">
        <div className="foverlay"></div>
        <form onSubmit={forgetpaswordValidation}>
          <div id="fmodify">
            <div className="pphead">
              <h id="phonehead">Enter Your Phone Number</h>
            </div>
            {fshow && (
              <div
                id="fpasswordsuccessmsg"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                {fshow}
              </div>
            )}

            {nextstep && (
              <div
                id="fpasswordsuccessmsg1"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                {nextstep}
              </div>
            )}
            <div id="emailforget">
              <label htmlFor="emailforgetpassword" id="emailforgetpassword">
                Email
              </label>
              <input
                type="text"
                id="emailffp"
                name="email"
                value={fphone.email}
                onChange={handleChange}
              ></input>
              {errors.email && (
                <span id="errorEmail" style={{ color: "red" }}>
                  {errors.email}
                </span>
              )}
            </div>
            <div id="inputphone">
              <label htmlFor="forgetpassword" id="forgetpassword">
                Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={fphone.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span id="errorPhone" style={{ color: "red" }}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div id="newpassword1">
              <label htmlFor="newpassword2" id="newpassword2">
                New Password
              </label>
              <input
                type={nopeneye ? "text" : "password"}
                id="newpassowrd3"
                name="newpassword"
                value={fphone.newpassword}
                onChange={handleChange}
              />
              <div id="open12">
                <img
                  id="open13"
                  src={nopeneye ? open_eye : close_eye}
                  alt="New password Open Eye"
                  onClick={newopenEye}
                ></img>
              </div>
              {errors.newpassword && (
                <span style={{ color: "red" }}>{errors.newpassword}</span>
              )}
            </div>

            <input type="submit" id="forgetsubmit" value="Submit"></input>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default ForgetPassword;
