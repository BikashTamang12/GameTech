import React, { useState, useEffect } from "react";
import FilterProductCard from "./FilterProductCard";
import { useParams } from "react-router-dom";
import "./FilterProductList.css";

const FilterProductList = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  //console.log("empty");
  useEffect(() => {
    console.log("Fetching products for category:", category);

    fetch(`http://localhost/backend/api/filterProduct.php?category=${category}`)
      .then((response) => response.text()) // Use .text() to log the raw response
      .then((text) => {
        console.log("Response text:", text); // Log raw response text
        const data = JSON.parse(text); // Now parse the text to JSON
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  return (
    <div className="filterProductlist">
      {products.length > 0 ? (
        products.map((product) => (
          <FilterProductCard key={product.id} product={product} />
        ))
      ) : (
        <p id="noproduct">No products found in this category!!!</p>
      )}
    </div>
  );
};

export default FilterProductList;
