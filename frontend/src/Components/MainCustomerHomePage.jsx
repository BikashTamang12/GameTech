import React from "react";
import CustomerPageProductCard from "./CustomerPageProductCard";
import "../Components_CSS/MainCustomerPageProductCard.css";
import { useState, useEffect } from "react";
import ImageSlidingEffect from "./ImageSlidingEffect";
import API_BASE_URL from "../apiConfig";

const MainCustomerHomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/customerMainPageProductlist.php`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
       <ImageSlidingEffect/>
    <div className="mainpage1">
     
      {products.length > 0 ? (
        products.map((product) => (
          <CustomerPageProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No products found in this category</p>
      )}
    </div>
    </div>
  );
};

export default MainCustomerHomePage;
