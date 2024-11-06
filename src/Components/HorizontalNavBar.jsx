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
      <Link to="/products/keyboards" id="keyboard">
        Keyboard
      </Link>
      <Link to="/products/headphones" id="headphone">
        Headphones
      </Link>
      <Link to="/products/joysticks" id="joystick">
        Joystick
      </Link>
      <Link to="/products/xboxs" id="xbox">
        X-Box
      </Link>
      <Link to="/products/psps" id="psp">
        Psp
      </Link>
      <Link to="/products/cds" id="cd">
        CD
      </Link>
    </div>
  );
};

export default HorizontalNavBar;
