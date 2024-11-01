import React, { useState } from "react";
import "./NavBar.css";
import Icon from "./Images/search_icon.png"; // Import the search icon image
import Logo from "./Images/gt_logo.png";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <div id="div1">
      <navbar id="nav1">
        <Link to="/" id="logo">
          <img src={Logo} className="Logo"></img>
        </Link>
        <input
          id="search"
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search anything..."
        />
        <span id="search_icon">
          <img src={Icon}></img>
        </span>
        <Link to="/cart" id="cart">
          Cart
        </Link>
        <Link to="/about" id="aboutus">
          About Us
        </Link>
        <Link to="/signin" id="signin">
          Sign in{" "}
        </Link>
      </navbar>
    </div>
  );
};

export default NavBar;
