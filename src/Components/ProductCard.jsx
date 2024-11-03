
import React from 'react'
import './ProductCard.css';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => (
  <div className="product-card">
    <Link to={`/product/${product.id}`} className="product-link">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>Price: Rs{product.price}</p>
    </Link>
  </div>
);

           
    
  


export default ProductCard
