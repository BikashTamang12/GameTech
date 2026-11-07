import React, { useEffect, useState } from "react";
import laptop1 from "./laptop/laptop1.jpg";
import laptop2 from "./laptop/laptop2.jpg";
import laptop3 from "./laptop/laptop3.jpg";
import laptop4 from "./laptop/laptop4.jpg";
import laptop5 from "./laptop/laptop5.jpg";
import laptop6 from "./laptop/laptop6.jpg";
import laptop7 from "./laptop/laptop7.jpg";
import '../Components_CSS/ImageSlidingEffect.css';

const ImageSlidingEffect = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const simages = [laptop1, laptop2, laptop3, laptop4, laptop5, laptop6,laptop7];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === simages.length - 1 ? 0 : prev + 1));
    },4800);
    return () => clearInterval(interval);
  }, [simages.length]);

  return (
    <div className="sliding-images">
      {simages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Laptop ${index + 1}`}
          className={`sliding-image ${currentImage === index ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default ImageSlidingEffect;
