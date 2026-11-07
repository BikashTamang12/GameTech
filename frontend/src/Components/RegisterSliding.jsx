import React, { useEffect, useState } from "react";
import reg1 from "./RegisterImages/reg1.jpg";
import reg2 from "./RegisterImages/reg2.jpg";
import reg3 from "./RegisterImages/reg3.jpg";
import reg4 from "./RegisterImages/reg4.jpg";
import reg5 from "./RegisterImages/reg5.jpg";
import reg6 from "./RegisterImages/reg6.jpg";
import reg7 from "./RegisterImages/reg7.jpg";
import reg8 from "./RegisterImages/reg8.jpg";
import reg9 from "./RegisterImages/reg9.jpg";
import '../Components_CSS/RegisterSliding.css';

const RegisterSliding = () => {
  const [registerImage, setRegisterImage] = useState(0);
  const register_images = [reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8, reg9];

  useEffect(() => {
    const interval = setInterval(() => {
      setRegisterImage((prev) => (prev === register_images.length - 1 ? 0 : prev + 1));
    }, 4800); // Change image every 4.8 seconds

    return () => clearInterval(interval);
  }, [register_images.length]);

  return (
    <div className="register-sliding-images">
      <div
        className="register-sliding-wrapper"
        style={{
          transform: `translateX(-${registerImage * 100}%)`, // Move left by 100% of one image's width
        }}
      >
        {register_images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Laptop ${index + 1}`}
            className="register-sliding"
          />
        ))}
      </div>
    </div>
  );
};

export default RegisterSliding;
