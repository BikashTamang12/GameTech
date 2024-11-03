// Home.jsx
/*in this home page product card and prodctDetails
 is connenet to show the output*/

import React from "react";
import "./CustomerHomePage.css";
import ProductCard from "./ProductCard";

function Home({ products }) {
  return (
    <div className="Home">
      <h2>Product List</h2>
      <div className="grid-container">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
