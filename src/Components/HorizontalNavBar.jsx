import React, { useEffect, useState } from "react";
import "../Components_CSS/HorizontialNavBar.css";
import { Link } from "react-router-dom";

const HorizontalNavBar = () => {
  const [showNav, setShowNav] = useState(true); // To control navbar visibility
  let lastScrollY = window.scrollY; // Track the last scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // If scrolling down, hide navbar
        setShowNav(false);
      } else {
        // If scrolling up, show navbar
        setShowNav(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, []);

  return (
    <div
      className="horizontal"
      style={{
        transform: showNav ? "translateY(0)" : "translateY(-100%)", // Slide up or down
      }}
    >
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
