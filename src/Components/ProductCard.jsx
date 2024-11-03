<<<<<<< HEAD
import React from 'react'
import './ProductCard.css';
import { Link } from 'react-router-dom';
=======
// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe

const ProductCard = ({ product }) => (
  <div className="product-card">
    <Link to={`/product/${product.id}`} className="product-link">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>Price: Rs{product.price}</p>
    </Link>
  </div>
);

<<<<<<< HEAD
            </div>
           
            <div className='cart'>
           <Link to="/buynow">
                <button id='purchase'>Buy</button>
                </Link>
                <button id='cart'>Add To Cart</button>
                </div>       
      
      </div>
    
  )
}

export default ProductCard
=======
export default ProductCard;
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe
