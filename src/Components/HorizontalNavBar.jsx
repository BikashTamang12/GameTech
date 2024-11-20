import React from "react";
import "./HorizontialNavBar.css";
import { Link } from "react-router-dom";

const HorizontalNavBar = () => {
  return (
    <div className="horizontal">
      <Link to="/products/laptop" id="laptop">
        Laptop
      </Link>
      <Link to="/products/mouse" id="mouse">
        Mouse
      </Link>
      <Link to="/products/keyboard" id="keyboard">
        Keyboard
      </Link>
      <Link to="/products/headphone" id="headphone">
        Headphones
      </Link>
      <Link to="/products/joystick" id="joystick">
        Joystick
      </Link>
      <Link to="/products/xbox" id="xbox">
        X-Box
      </Link>
      <Link to="/products/psp" id="psp">
        Psp
      </Link>
      <Link to="/products/cd" id="cd">
        CD
      </Link>
    </div>
  );
};

export default HorizontalNavBar;
