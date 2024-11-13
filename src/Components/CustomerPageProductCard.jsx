import React from 'react'
import './CustomerPageProductCard.css';
import { Link } from 'react-router-dom';

const CustomerPageProductCard = ({product}) => {
    const image = `data:image/jpeg;base64,${product.main_image}`;
  return (
    <div  className="cusmain1">
        <h3 className="producttitle23">{product.title}</h3>
        <div className='imageofproduct1'>
        
      <img src={image} alt ={product.title} className="product_image45"/>
      </div>
      <p className='product_price67'>Rs.{product.price}</p>
      <Link to={`/product-details/${product.product_id}`} className="view-details-link">
            View Details
        </Link>
     
    </div>
  )
}

export default CustomerPageProductCard
