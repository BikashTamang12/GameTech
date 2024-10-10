import React, { useState } from "react";
import "./UserLogin.css";

const UserLogin = () => {
  // keep track of email and password inputs
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // manage form validation error messages
  const [errors, setErrors] = useState({});

  // Handle form input changes and clear any previous errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    // Clear any existing errors when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Handle form submission and validation
  const handleLogin = (e) => {
    e.preventDefault();

    // Collect potential error messages
    const newErrors = {};
    const { email, password } = loginData;

    // Check if email is provided and valid
    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!validateEmail(email)) {
      newErrors.email = " Incorrect Email.";
    }

    // Ensure password is entered
    if (!password) {
      newErrors.password = "Password is empty!";
    }

    // If there are validation errors, stop here and show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If everything is good, show a success message (you'd likely want to replace this with a real login flow)
    alert("You’ve logged in!");
  };

  return (
    <div className="container">
      {/* Left form section */}
      <div className="form-section">
        <div className="logo">
          <img
            src="https://www.freepnglogos.com/uploads/games-png/games-controller-game-icon-17.png"
            alt="Logo"
          />
          <div className="logo-text">Game Tech</div>
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={loginData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
          <br />
          <br />

          <input type="submit" value="Login" />
        </form>

        {/* Additional links for convenience */}
        <div className="links">
          <div className="left">
            <a href="/Sign up">Sign Up</a>
          </div>
          <div className="right">
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
