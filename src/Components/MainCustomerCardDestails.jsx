import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook for checking authentication status
import "./MainCustomerCardDetails.css";

const MainCustomerCardDetails = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const { isAuthenticated } = useAuth(); // Get the authentication status from context
  const navigate = useNavigate(); // Use navigate to redirect to login page if not authenticated

  useEffect(() => {
    fetch(
      `http://localhost/backend/api/mainCardDetails.php?product_id=${product_id}`
    )
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [product_id]);

  const addToCart = () => {
    if (!isAuthenticated) {
      // If not authenticated, show an alert and navigate to login page
      alert("You need to log in to add items to the cart");
      navigate("/login"); // Adjust the path as per your routes
      return;
    }

    const cartData = new FormData();
    cartData.append("product_id", product.product_id);
    cartData.append("title", product.title);
    cartData.append("price", product.price);
    cartData.append("main_image", product.main_image);

    fetch("http://localhost/backend/api/addToCartBack.php", {
      method: "POST",
      body: cartData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Product added to cart");
        } else {
          alert("Failed to add product to cart");
        }
      })
      .catch((error) => console.error("Error adding product to cart:", error));
  };
  const buyNow = () => {
    if (!isAuthenticated) {
      // If not authenticated, store the current page (where the user is) in localStorage
      localStorage.setItem("redirectTo", `/product/${product_id}`);
      alert("You need to log in to make a purchase");
      navigate("/login"); // Redirect to login
      return;
    }

    // If authenticated, proceed to the Buy From page (or checkout page)
    navigate("/buyform", { state: { product } });
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const { title, main_image, price, description } = product;
  const mainImage = `data:image/jpeg;base64,${main_image}`;

  return (
    <div className="backgroundimage12">
      <fieldset className="productDetails12">
        <div className="custcardoverlay1"></div>
        <div className="outsidecustcard">
          <div className="prodhead">
            <p id="producthead">{title}</p>
          </div>
          <div className="productImages12">
            <img src={mainImage} alt={title} className="mainImage12" />
          </div>

          <div className="prodprice">
            <p className="productPrice">Rs. {price}</p>
          </div>
          <div className="proddesc12">
            <p className="productDescription">{description}</p>
          </div>

          <div className="buybutton">
            <button id="buynow1" onClick={buyNow}>
              Buy Now
            </button>
          </div>

          <div className="cartbutton">
            <button id="cartnow1" onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default MainCustomerCardDetails;
