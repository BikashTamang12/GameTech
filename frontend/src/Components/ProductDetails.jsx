// ProductDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = ({ products }) => {
  // Extract the product ID from the URL parameters
  const { id } = useParams();
  // Find the product that matches the ID from the products array
  const product = products.find((product) => product.id === parseInt(id, 10));
  // to keep track of the currently displayed sub-image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If no product is found, display a message
  if (!product) return <p>Product not found.</p>;

  // Function to go to the next sub-image
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.subImages.length // Loop back to the first image if at the end
    );
  };

  // Function to go to the previous sub-image
  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.subImages.length) % product.subImages.length // Loop back to the last image if at the beginning
    );
  };

  return (
    <div className="product-details">
      <div className="main-section">
        {/* Main product image display */}
        <div className="main-image-container">
          <img src={product.image} alt={product.title} className="main-image" />
        </div>

        {/* Sub-images slideshow, only show if there are sub-images */}
        {product.subImages && product.subImages.length > 0 && (
          <div className="sub-image-slideshow">
            <button onClick={handlePreviousImage}>&lt;</button>{" "}
            {/* Previous image button */}
            <img
              src={product.subImages[currentImageIndex]} // Display current sub-image
              alt={`${product.title} sub-image ${currentImageIndex + 1}`}
              className="sub-image"
            />
            <button onClick={handleNextImage}>&gt;</button>{" "}
            {/* Next image button */}
          </div>
        )}
      </div>

      <div className="product-info">
        {/* Display product information */}
        <h2>{product.title}</h2>
        <p className="category">Category: {product.category}</p>
        <p className="price">Price: Rs {product.price}</p>
        <p className="description">{product.description}</p>

        <div className="actions">
          {/* Buttons for adding to cart or buying now */}
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
