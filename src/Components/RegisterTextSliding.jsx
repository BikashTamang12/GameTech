import React, { useEffect, useState } from "react";
import "../Components_CSS/RegisterTextSliding.css";

const RegisterTextSliding = () => {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  const slogans = [
    "Best Laptops at Unbeatable Prices",
    "Innovative Designs for Every User",
    "Powerful Performance, Sleek Look",
    "Experience the Future of Tech",
    "Your Trusted Partner in Technology",
    "High-Speed Performance, High-Quality Results",
    "Unleash Your Creativity with Us",
    "Next-Generation Laptops for Modern Work",
    "Elevate Your Work, Play, and Creativity",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex((prevIndex) =>
        prevIndex === slogans.length - 1 ? 0 : prevIndex + 1
      );
    }, 4700); // Slides every 4.8 seconds
    return () => clearInterval(interval);
  }, [slogans.length]);

  return (
    <div className="register-sliding-text">
      <div className="register-sliding-text-wrapper">
        {slogans.map((text, index) => (
          <div
            key={index}
            className="register-sliding-texts"
            style={{
              opacity: currentSloganIndex === index ? 1 : 0, // Fade effect
              transition: "opacity 1s ease-in-out", // Smooth fade transition
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterTextSliding;
